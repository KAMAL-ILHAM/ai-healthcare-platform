import { NextResponse } from 'next/server';
import { ChatService } from '@/app/services/chat.service';
import type { UIMessage } from 'ai';
import prisma from '@/lib/prisma';


function toUIMessage(msg: { id: string; role: string; content: string }): UIMessage {
  return {
    id: msg.id,
    role: msg.role === 'USER' ? 'user' : 'assistant',
    parts: [{ type: 'text', text: msg.content }],
  };
}

// METHOD GET (Dilengkapi Proteksi Anti-Crash)
export async function GET(
  _req: Request,
  { params }: any, // Menggunakan 'any' sementara untuk mencegah error tipe data strict di Next.js 15
) {
  try {
    const userId = _req.headers.get('x-user-id');
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 1. Resolve Promise params (Aturan baru Next.js 15)
    const resolvedParams = await params;
    
    // 2. Proteksi Nama Folder: Tangkap ID baik dari [sessionId] maupun [sessionsId]
    const id = resolvedParams.sessionId || resolvedParams.sessionsId;

    if (!id || id === 'undefined') {
      return NextResponse.json({ error: 'Session ID tidak valid.' }, { status: 400 });
    }

    // 3. Ambil data dari database
    const dbMessages = await ChatService.getSessionMessages(id, userId);
    
    // 4. PROTEKSI UTAMA: Jika dbMessages kosong/null, paksa menjadi array kosong [] 
    // agar fungsi .map() di bawah tidak memicu Error 500
    const safeMessages = dbMessages || [];

    return NextResponse.json({
      success: true,
      data: safeMessages.map(toUIMessage),
    });

  } catch (error) {
    console.error('[GET_SESSION_MESSAGES_ERROR]', error);
    return NextResponse.json({ error: 'Gagal mengambil pesan sesi.' }, { status: 500 });
  }
}

// [POST] /api/chat/session -> Untuk Konsultasi Baru
export async function POST(req: Request) {
  try {
    const userId = req.headers.get('x-user-id');
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized: User ID tidak ditemukan' }, { status: 401 });
    }

    const body = await req.json().catch(() => ({}));
    const title = body.title || 'Konsultasi Baru'; 

    const newSession = await ChatService.createSession(userId, title);
    return NextResponse.json({ success: true, data: newSession }, { status: 201 });
  } catch (error) {
    console.error('[CREATE_SESSION_ERROR]', error);
    return NextResponse.json({ error: 'Gagal membuat sesi.' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    // Ambil sessionId dari URL (contoh: /api/chat/session?sessionId=123)
    const url = new URL(req.url);
    const sessionId = url.searchParams.get("sessionId");

    // Validasi jika sessionId kosong
    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID tidak ditemukan pada URL' }, 
        { status: 400 }
      );
    }

    // Menghapus dari database berdasarkan sessionId
    await prisma.chatSession.delete({
      where: { id: sessionId }
    });

    return NextResponse.json({ success: true, message: 'Chat berhasil dihapus' });
  } catch (error) {
    console.error('[DELETE_SESSION_ERROR]', error);
    return NextResponse.json({ error: 'Gagal menghapus chat' }, { status: 500 });
  }
}