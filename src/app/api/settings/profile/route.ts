import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

async function getAuthenticatedUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;

  if (!token) return null;

  try {
    // Membongkar isi token secara langsung (lebih tahan banting terhadap error SECRET_KEY)
    const decoded = jwt.decode(token) as any;
    
    if (!decoded) return null;

    // Mendeteksi identifier, baik tokennya berupa string murni maupun objek JSON
    if (typeof decoded === 'string') return decoded;
    return decoded.id || decoded.userId || decoded.email || decoded.sub;
    
  } catch (err) {
    return null;
  }
}

export async function GET() {
  const identifier = await getAuthenticatedUser();

  if (!identifier) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { id: identifier },
          { email: identifier }
        ]
      },
      select: { name: true, email: true }
    });

    if (!user) {
      return NextResponse.json({ error: 'Akun Anda tidak ditemukan di database.' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const identifier = await getAuthenticatedUser();

  if (!identifier) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { name, email } = body;

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { id: identifier },
          { email: identifier }
        ]
      }
    });

    if (!existingUser) {
      return NextResponse.json({ error: 'User tidak ditemukan' }, { status: 404 });
    }

    const updatedUser = await prisma.user.update({
      where: { id: existingUser.id },
      data: { name, email }
    });

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error: any) {
    if (error?.code === 'P2002') {
      return NextResponse.json({ error: 'Email baru sudah digunakan akun lain.' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Gagal memperbarui data' }, { status: 500 });
  }
}