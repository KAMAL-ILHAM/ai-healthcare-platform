import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';
import { signToken } from '@/lib/utils/auth'; // Memanggil fungsi pembuat token rahasia kita

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: "Email dan password wajib diisi" }, { status: 400 });
    }

    // 1. Cari user berdasarkan email (variabel dibenarkan menjadi 'user')
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return NextResponse.json({ error: "Email tidak terdaftar" }, { status: 401 });
    }

    // 2. Cocokkan password dengan passwordHash di database
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      return NextResponse.json({ error: "Password salah" }, { status: 401 });
    }

    // 3. Buatkan Token JWT menggunakan fungsi jose di lib/utils/auth.ts
    // Payload harus sesuai dengan ekspektasi Middleware (userId, role, email)
    const token = await signToken({ 
      userId: user.id, 
      role: user.role || 'patient',
      email: user.email 
    });

    // 4. Siapkan balasan sukses
    const response = NextResponse.json({ 
      message: "Login berhasil",
      user: { name: user.name, email: user.email, role: user.role }
    }, { status: 200 });

    // 5. Simpan token ke dalam Cookies browser pengguna (Nama disamakan: auth_token)
    response.cookies.set({
      name: 'auth_token',
      value: token,
      httpOnly: true, // Mencegah pencurian token (XSS)
      secure: process.env.NODE_ENV === 'production', // Aman di HTTPS saat production
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 hari
    });

    return response;

  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json({ error: "Terjadi kesalahan pada server" }, { status: 500 });
  }
}