import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // <-- Kembali ke import standar (tanpa kurung kurawal)
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';

export async function POST(req: Request) {
  try {
    // Baris 'const prisma = getPrisma();' sudah Dihapus karena tidak diperlukan lagi
    
    const { email, password } = await req.json();

    // 1. Cari user di database berdasarkan email
    const user = await prisma.user.findUnique({
      where: { 
        email: email 
      }
    });

    // 2. Validasi: Apakah user ada? Dan apakah dia memiliki akses isStaff?
    if (!user || !user.isStaff) {
      return NextResponse.json(
        { error: 'Akses ditolak. Kredensial tidak valid atau Anda tidak memiliki otoritas.' },
        { status: 401 }
      );
    }

    // 3. Verifikasi kecocokan password yang diketik dengan hash di database
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Kunci sandi tidak cocok.' },
        { status: 401 }
      );
    }

    // 4. Jika sukses, buat Token Identitas (JWT) menggunakan library 'jose'
    const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);
    const token = await new SignJWT({ 
      id: user.id, 
      email: user.email, 
      role: user.role, 
      isStaff: user.isStaff 
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('8h') // Sesi admin otomatis kedaluwarsa dalam 8 jam
      .sign(secretKey);

    // 5. Buat response sukses dan tanamkan token ke Cookie Browser
    const response = NextResponse.json(
      { message: 'Autentikasi Sistem Berhasil' },
      { status: 200 }
    );

    response.cookies.set({
      name: 'admin_session', // Nama cookie
      value: token,
      httpOnly: true, // Sangat aman, tidak bisa dicuri script peretas
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 8, // 8 jam dalam detik
    });

    return response;

  } catch (error) {
    console.error("Login Admin Error:", error);
    return NextResponse.json({ error: 'Terjadi kesalahan internal server.' }, { status: 500 });
  }
}