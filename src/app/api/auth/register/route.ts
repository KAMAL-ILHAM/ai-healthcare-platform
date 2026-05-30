import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db'; // <-- Diperbaiki: Menggunakan db.ts yang benar
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Semua kolom harus diisi" }, { status: 400 });
    }

    // 1. Cek apakah email sudah pernah didaftarkan
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json({ error: "Email sudah terdaftar" }, { status: 400 });
    }

    // 2. Enkripsi password menggunakan bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Simpan data user ke database
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash: hashedPassword, // <-- Diperbaiki: Sesuai dengan schema.prisma
      }
    });

    return NextResponse.json({ 
      message: "Akun berhasil dibuat", 
      user: { id: newUser.id, name: newUser.name, email: newUser.email } 
    }, { status: 201 });

  } catch (error) {
    console.error("Register Error:", error);
    return NextResponse.json({ error: "Terjadi kesalahan pada server" }, { status: 500 });
  }
}