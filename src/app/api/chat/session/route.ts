import { NextResponse } from 'next/server';
import { ChatService } from '@/app/services/chat.service'; 
import prisma from '@/lib/prisma';

// [GET] /api/chat/session -> Untuk Sidebar
export async function GET(req: Request) {
  try {
    const userId = req.headers.get('x-user-id');
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized: User ID tidak ditemukan' }, { status: 401 });
    }
    
    const sessions = await ChatService.getUserSessions(userId);
    return NextResponse.json({ success: true, data: sessions });
  } catch (error) {
    console.error('[GET_SESSIONS_ERROR]', error);
    return NextResponse.json({ error: 'Gagal mengambil riwayat.' }, { status: 500 });
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