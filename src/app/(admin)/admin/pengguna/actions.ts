'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import bcrypt from 'bcryptjs';

export async function tambahPenggunaAction(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const rawPassword = formData.get('password') as string;
  const selectedRole = formData.get('role') as string;

  // 1. Logika Penentuan Peran (Sesuai Skema Prisma)
  // Jika dropdown memilih 'admin', jadikan isStaff = true dan role = 'admin'
  // Jika 'umum', jadikan isStaff = false dan role = 'patient'
  const isStaff = selectedRole === 'admin';
  const role = isStaff ? 'admin' : 'patient';

  try {
    // 2. Enkripsi (Hashing) Kata Sandi
    // Menggunakan 10 salt rounds (standar keamanan yang direkomendasikan)
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(rawPassword, saltRounds);

    // 3. Simpan ke Database
    await prisma.user.create({
      data: {
        name,
        email,
        passwordHash: hashedPassword, // Sesuai dengan kolom di skema Prisma-mu!
        isStaff,
        role,
      }
    });
    
    // Refresh halaman agar data baru langsung muncul
    revalidatePath('/admin/pengguna');
    return { success: true };
  } catch (error) {
    console.error('Error saat menambahkan pengguna:', error);
    return { success: false, error: 'Gagal menambahkan pengguna. Email mungkin sudah terdaftar.' };
  }
}