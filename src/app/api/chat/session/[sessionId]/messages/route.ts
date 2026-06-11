import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Pastikan path import prisma sudah benar
import type { UIMessage } from 'ai';

function toUIMessage(msg: any): UIMessage {
  // @ts-ignore
  return {
    id: msg.id,
    role: msg.role?.toUpperCase() === 'USER' ? 'user' : 'assistant',
    content: msg.content, 
    parts: [{ type: 'text', text: msg.content }],
  }as any;
}

export async function GET(
  _req: Request,
  { params }: any
) {
  try {
    const userId = _req.headers.get('x-user-id');
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const resolvedParams = await params;
    
    const id = resolvedParams.sessionsId || resolvedParams.sessionId;

    if (!id) {
       return NextResponse.json({ error: 'Session ID tidak ditemukan' }, { status: 400 });
    }

    
    const dbMessages = await prisma.chatMessage.findMany({
      where: { 
        sessionId: id 
      },
      orderBy: { 
        createdAt: 'asc' 
      }
    });

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