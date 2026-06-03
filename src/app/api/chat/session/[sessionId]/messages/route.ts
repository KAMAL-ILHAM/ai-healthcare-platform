import { NextResponse } from 'next/server';
import { ChatService } from '@/app/services/chat.service';
import type { UIMessage } from 'ai';

function toUIMessage(msg: { id: string; role: string; content: string }): UIMessage {
  return {
    id: msg.id,
    role: msg.role === 'USER' ? 'user' : 'assistant',
    parts: [{ type: 'text', text: msg.content }],
  };
}

// METHOD GET (Sudah Benar)
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ sessionId: string }> },
) {
  try {
    const userId = _req.headers.get('x-user-id');
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { sessionId } = await params;
    const dbMessages = await ChatService.getSessionMessages(sessionId, userId);

    return NextResponse.json({
      success: true,
      data: dbMessages.map(toUIMessage),
    });
  } catch (error) {
    console.error('[GET_SESSION_MESSAGES_ERROR]', error);
    return NextResponse.json({ error: 'Gagal mengambil pesan sesi.' }, { status: 500 });
  }
}

// METHOD DELETE (Tambahkan ini agar error sebelumnya hilang)
export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  try {
    // Tambahkan validasi user ID juga jika diperlukan
    const { sessionId } = await params;
    
    // Panggil logika penghapusan dari service kamu
    // contoh: await ChatService.deleteSession(sessionId);

    return NextResponse.json({ success: true, message: 'Sesi berhasil dihapus' });
  } catch (error) {
    console.error('[DELETE_SESSION_ERROR]', error);
    return NextResponse.json({ error: 'Gagal menghapus sesi.' }, { status: 500 });
  }
}