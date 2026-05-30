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
