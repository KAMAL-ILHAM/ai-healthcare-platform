import { NextResponse } from 'next/server';

export async function POST() {
  try {
    // 1. Siapkan respons sukses
    const response = NextResponse.json({ 
      message: "Logout berhasil" 
    }, { status: 200 });

    // 2. Hapus token dari Cookies dengan mengatur masa berlakunya ke masa lalu (0)
    // PERBAIKAN: Gunakan nama 'auth_token' sesuai dengan yang kita buat saat Login
    response.cookies.set({
      name: 'auth_token', 
      value: '',
      httpOnly: true,
      path: '/',
      expires: new Date(0), // Langsung kedaluwarsa detik ini juga
    });

    return response;
  } catch (error) {
    console.error("Logout Error:", error);
    return NextResponse.json({ error: "Gagal memproses keluar sistem" }, { status: 500 });
  }
}