import {
  streamText,
  convertToModelMessages,
  createUIMessageStream,
  createUIMessageStreamResponse,
  type UIMessage,
} from 'ai';
import { groq } from '@ai-sdk/groq';

import {
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
import prisma from '@/lib/prisma';

export const maxDuration = 60;
// 🌟 PERBAIKAN 1: Memaksa Next.js untuk tidak mem-buffer stream agar teks muncul per huruf
export const dynamic = 'force-dynamic'; 

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
    
    // Lampiran sudah dihapus dari sini
    const { messages } = body;

    if (!sessionId) return NextResponse.json({ error: 'Session ID diperlukan.' }, { status: 400 });

    const uiMessages = messages as UIMessage[];
    const latestMessage = uiMessages[uiMessages.length - 1];
    const userText = getTextFromUIMessage(latestMessage);
    
    // 🌟 PERBAIKAN: Update Judul di Database Jika Ini Pesan Pertama dari User
    if (uiMessages.length === 1) {
      const words = userText.split(' ');
      const newTitle = words.length > 4 ? words.slice(0, 4).join(' ') + '...' : userText;
      
      // Update judul ke Database secara background (tanpa await agar tidak bikin lag API)
      prisma.chatSession.update({
        where: { id: sessionId },
        data: { title: newTitle }
      }).catch((err: any) => console.error('[DB_UPDATE_TITLE_ERROR]', err));
    }

    ChatService.saveMessage({
      sessionId,
      role: 'USER',
      content: userText,
    }).catch((err: any) => console.error('[DB_SAVE_USER_ERROR]', err));

    const baseSystemPrompt = `
      # Aturan Jawaban
      1. Jawab sesuai pertanyaan pengguna.
      2. Jangan menambahkan informasi yang tidak diminta.
      3. Jangan keluar dari konteks pertanyaan.
      4. Utamakan jawaban yang relevan dibanding jawaban yang panjang.
      5. Berikan jawaban sesingkat mungkin tanpa mengurangi kejelasan.
      6. Sesuaikan tingkat detail dengan kebutuhan pengguna.
      7. Gunakan bahasa yang natural, profesional, dan mudah dipahami.
      8. Gunakan paragraf pendek agar mudah dibaca.
      9. Gunakan poin atau daftar hanya jika membantu keterbacaan.
      10. Gunakan tabel jika diperlukan untuk perbandingan, rangkuman, atau agar informasi lebih mudah dipahami.
      11. Hindari pengulangan informasi.
      12. Jangan otomatis menambahkan tips, saran, peringatan, efek samping, dosis, kesimpulan, atau disclaimer kecuali diminta atau memang diperlukan untuk keamanan dan akurasi.

      Contoh:
      - Jika pengguna meminta definisi, berikan definisi.
      - Jika pengguna meminta contoh, berikan contoh.
      - Jika pengguna meminta langkah-langkah, berikan langkah-langkah.
      - Jika pengguna meminta perbandingan, gunakan tabel.
      - Jika pengguna meminta penjelasan lengkap, berikan penjelasan lengkap.
    `;
    
    const stream = createUIMessageStream({
      originalMessages: uiMessages,
      execute: async ({ writer }) => {
        try {
          const result = streamText({
            model: groq('llama-3.3-70b-versatile'),
            // Prompt dan Messages kini langsung dikirim tanpa fungsi lampiran
            system: baseSystemPrompt,
            messages: await convertToModelMessages(uiMessages),
            // 🌟 PERBAIKAN 3: Ubah temperature sedikit lebih rendah agar output teks lebih stabil
            temperature: 0.6, 
            abortSignal: getAIAbortSignal(),
          });
          writer.merge(result.toUIMessageStream());
        } catch (error) {
          writeFallbackText(writer, parseAIError(error).userMessage);
        }
      },
      onFinish: async ({ responseMessage, isAborted }) => {
        // AI menyimpan percakapan ke DB hanya setelah jawaban SELESAI diketik di layar
        if (!isAborted && sessionId) {
          await saveAssistantMessage(sessionId, getTextFromUIMessage(responseMessage));
        }
      },
    });

    return createUIMessageStreamResponse({ stream });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}