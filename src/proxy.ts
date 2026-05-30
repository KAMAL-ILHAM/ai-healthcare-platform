import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/utils/auth';

// PERUBAHAN KRUSIAL: Mengubah nama fungsi dari 'middleware' menjadi 'proxy' 
// dan menggunakan EXPORT DEFAULT agar dikenali oleh Next.js v16+
export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Ambil token dari cookie dengan nama 'auth_token'
  let token = request.cookies.get('auth_token')?.value;

  // Fallback: Jika tidak ada di cookie, cari di Header Authorization
  if (!token) {
    const authHeader = request.headers.get('authorization');
    if (authHeader?.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    }
  }

  // ==========================================
  // 1. PROTEKSI FRONTEND (UI ROUTES)
  // ==========================================
  
  // Jika user mencoba masuk ke /dashboard tapi tidak punya token -> Lempar ke /login
  if (pathname.startsWith('/dashboard')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Jika user SUDAH login tapi mencoba akses /login atau /register -> Lempar ke /dashboard
  if (pathname.startsWith('/login') || pathname.startsWith('/register')) {
    if (token) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  // ==========================================
  // 2. PROTEKSI BACKEND (API ROUTES)
  // ==========================================
  
  // Hanya jalankan proteksi ketat (Verifikasi JWT) untuk rute API tertentu
  if (pathname.startsWith('/api/chat') || pathname.startsWith('/api/upload') || pathname.startsWith('/api/files')) {
    
    // Jika tidak ada token, langsung tolak dengan format JSON
    if (!token) {
      return NextResponse.json({ error: 'Akses Ditolak: Anda belum login.' }, { status: 401 });
    }

    // Verifikasi keaslian dan masa berlaku token menggunakan Jose
    const decoded = await verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: 'Akses Ditolak: Token tidak valid atau kadaluarsa.' }, { status: 401 });
    }

    // Injeksi userId ke Headers agar API routes (seperti /api/chat/session) bisa membacanya dengan mudah
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-user-id', decoded.userId as string);
    requestHeaders.set('x-user-role', decoded.role as string);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  // Jika aman dan lolos semua pengecekan, izinkan request dilanjutkan
  return NextResponse.next();
}

// Menentukan rute mana saja yang akan dipantau oleh proxy
export const config = {
  matcher: [
    /*
     * Tangkap semua rute KECUALI:
     * - _next/static (file statis CSS/JS)
     * - _next/image (optimasi gambar Next.js)
     * - favicon.ico (ikon web)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};