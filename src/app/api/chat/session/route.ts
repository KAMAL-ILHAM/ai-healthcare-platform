import { NextResponse } from 'next/server';
import { ChatService } from '@/app/services/chat.service'; 

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