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

export async function GET(_req: Request) {
  try {
    const userId = _req.headers.get('x-user-id');
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Ambil daftar riwayat sesi dari database (sesuaikan dengan metode ORM kamu)
    // Asumsi menggunakan Prisma langsung atau ChatService
    const sessions = await prisma.chatSession.findMany({
      where: { userId: userId },
      orderBy: { updatedAt: 'desc' }
    });

    return NextResponse.json({
      success: true,
      data: sessions,
    });

  } catch (error) {
    console.error('[GET_SESSIONS_ERROR]', error);
    return NextResponse.json({ error: 'Gagal mengambil riwayat sesi.' }, { status: 500 });
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
    // 1. Ambil userId dari header (seperti fungsi GET dan POST)
    const userId = req.headers.get('x-user-id');
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const url = new URL(req.url);
    const sessionId = url.searchParams.get("sessionId");

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID tidak ditemukan pada URL' }, 
        { status: 400 }
      );
    }

    // 2. PROTEKSI GANDA: Pastikan chat yang akan dihapus memang milik userId ini
    // Menggunakan deleteMany lebih aman karena kita bisa menumpuk dua kondisi (id DAN userId)
    const deleteResult = await prisma.chatSession.deleteMany({
      where: { 
        id: sessionId,
        userId: userId // <--- Mencegah pengguna menghapus chat orang lain
      }
    });

    // Jika count 0, berarti ID chat tidak ada atau bukan milik user tersebut
    if (deleteResult.count === 0) {
      return NextResponse.json(
        { error: 'Chat tidak ditemukan atau Anda tidak memiliki akses untuk menghapusnya' }, 
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: 'Chat berhasil dihapus' });
  } catch (error) {
    console.error('[DELETE_SESSION_ERROR]', error);
    return NextResponse.json({ error: 'Gagal menghapus chat' }, { status: 500 });
  }
}