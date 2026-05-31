import {
  streamText,
  convertToModelMessages,
  createUIMessageStream,
  createUIMessageStreamResponse,
  type UIMessage,
} from 'ai';
// 1. IMPORT GROQ
import { groq } from '@ai-sdk/groq';

import {
  applyAttachmentToMessages,
  buildPromptWithAttachment,
  createFallbackStreamResponse,
  getAIAbortSignal,
  getTextFromUIMessage,
  isAIConfigured,
  logAIError,
  parseAIError,
  type ParsedAIError,
  writeFallbackText,
} from '@/app/services/ai.service';
import { ChatService } from '@/app/services/chat.service';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // <-- Kembali ke import standar (tanpa kurung kurawal)

export const maxDuration = 60;

async function saveAssistantMessage(sessionId: string, content: string) {
  try {
    await ChatService.saveMessage({ sessionId, role: 'AI', content });
  } catch (dbError) {
    console.error('[DB_SAVE_ERROR]', dbError);
  }
}

function buildFallbackResponse(parsed: ParsedAIError, uiMessages: UIMessage[], sessionId: string) {
  return createFallbackStreamResponse({
    message: parsed.userMessage,
    originalMessages: uiMessages,
    onAssistantMessage: (text) => saveAssistantMessage(sessionId, text),
  });
}

export async function POST(req: Request) {
  let sessionId: string | undefined;

  try {
    const userId = req.headers.get('x-user-id');
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    sessionId = body.sessionId;
    const { messages, attachmentId } = body;

    if (!sessionId) return NextResponse.json({ error: 'Session ID diperlukan.' }, { status: 400 });

    const uiMessages = messages as UIMessage[];
    const latestMessage = uiMessages[uiMessages.length - 1];
    
    await ChatService.saveMessage({
      sessionId,
      role: 'USER',
      content: getTextFromUIMessage(latestMessage),
    });

    if (!isAIConfigured()) {
      const parsed = parseAIError(new Error('AI_API_KEY_MISSING'));
      return buildFallbackResponse(parsed, uiMessages, sessionId);
    }

    const attachment = attachmentId ? await prisma.attachment.findUnique({ where: { id: attachmentId } }) : null;
    const baseSystemPrompt = `Anda adalah EIOHealth AI, asisten kesehatan dan farmasi klinis tingkat lanjut. Berikan jawaban akurat dan ringkas. Jika terkait resep atau diagnosis, arahkan ke tenaga medis.`;
    
    const stream = createUIMessageStream({
      originalMessages: uiMessages,
      execute: async ({ writer }) => {
        try {
          const result = streamText({
            // 2. KITA GUNAKAN MODEL LLAMA 3 70B YANG SANGAT CERDAS DARI GROQ
            model: groq('llama-3.3-70b-versatile'),
            system: buildPromptWithAttachment(baseSystemPrompt, attachment),
            messages: await convertToModelMessages(applyAttachmentToMessages(uiMessages, attachment)),
            temperature: 0.7,
            abortSignal: getAIAbortSignal(),
          });
          writer.merge(result.toUIMessageStream());
        } catch (error) {
          writeFallbackText(writer, parseAIError(error).userMessage);
        }
      },
      onFinish: async ({ responseMessage, isAborted }) => {
        if (!isAborted) await saveAssistantMessage(sessionId!, getTextFromUIMessage(responseMessage));
      },
    });

    return createUIMessageStreamResponse({ stream });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}