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
  parseAIError,
  writeFallbackText,
} from '@/app/services/ai.service';
import { NextResponse } from 'next/server';

// 🌟 IMPORT PRISMA SECARA LANGSUNG
import prisma from '@/lib/prisma';

export const maxDuration = 60;
export const dynamic = 'force-dynamic'; 

export async function POST(req: Request) {
  let sessionId: string | undefined;

  try {
    const userId = req.headers.get('x-user-id');
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    sessionId = body.sessionId;
    const { messages } = body;

    if (!sessionId) return NextResponse.json({ error: 'Session ID diperlukan.' }, { status: 400 });

    const uiMessages = messages as UIMessage[];
    const latestMessage = uiMessages[uiMessages.length - 1];
    const userText = getTextFromUIMessage(latestMessage);
    
    // 1. UPDATE JUDUL SECARA BACKGROUND
    if (uiMessages.length === 1) {
      const words = userText.split(' ');
      const newTitle = words.length > 4 ? words.slice(0, 4).join(' ') + '...' : userText;
      
      prisma.chatSession.update({
        where: { id: sessionId },
        data: { title: newTitle }
      }).catch((err: any) => console.error('[DB_UPDATE_TITLE_ERROR]', err));
    }

    // 🌟 PERBAIKAN 1: Simpan Pesan User LANGSUNG dengan Prisma (Bypass ChatService)
    // Gunakan 'await' agar pesannya dipastikan masuk ke database sebelum AI mulai berpikir
    await prisma.chatMessage.create({
      data: {
        sessionId: sessionId,
        role: 'USER', // Pastikan huruf kapital sesuai yang kita perbaiki di GET route
        content: userText,
      }
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
    `;
    
    // 🌟 PERBAIKAN 2: Sliding Window untuk mencegah Groq Error 'Request too large'
    // Mengambil 6 pesan terakhir saja agar tidak menabrak limit TPM 12.000 Llama 70B
    const recentMessages = uiMessages.slice(-6);

    const stream = createUIMessageStream({
      originalMessages: uiMessages,
      execute: async ({ writer }) => {
        try {
          const result = streamText({
            model: groq('llama-3.3-70b-versatile'),
            system: baseSystemPrompt,
            // Masukkan pesan yang sudah dipotong (recentMessages) ke sini
            messages: await convertToModelMessages(recentMessages),
            temperature: 0.6, 
            abortSignal: getAIAbortSignal(),
          });
          writer.merge(result.toUIMessageStream());
        } catch (error) {
          writeFallbackText(writer, parseAIError(error).userMessage);
        }
      },
      onFinish: async ({ responseMessage, isAborted }) => {
        // 🌟 PERBAIKAN 3: Simpan Pesan AI LANGSUNG dengan Prisma
        if (!isAborted && sessionId) {
          await prisma.chatMessage.create({
            data: {
              sessionId: sessionId,
              role: 'AI', // Huruf kapital sesuai database Neon kamu
              content: getTextFromUIMessage(responseMessage),
            }
          }).catch((err: any) => console.error('[DB_SAVE_AI_ERROR]', err));
        }
      },
    });

    return createUIMessageStreamResponse({ stream });
  } catch (error) {
    console.error('[CHAT_API_ERROR]', error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}