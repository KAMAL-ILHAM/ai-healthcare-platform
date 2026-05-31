'use client';

import { usePathname } from 'next/navigation';
// Import langsung dari folder dashboard di bawahnya
import Sidebar from './dashboard/Sidebar'; 
import Header from './dashboard/Header';

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // 1. Deteksi Halaman Admin
  const isAdminPage = pathname.startsWith('/admin');
  
  // 2. Deteksi Halaman Auth (Login/Register)
  const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/register');

  // 3. Deteksi Landing Page
  const isLandingPage = pathname === '/';

  // ==========================================
  // JIKA DI HALAMAN ADMIN, AUTH, ATAU LANDING PAGE
  // Jangan render Sidebar & Header sama sekali!
  // ==========================================
  if (isAdminPage || isAuthPage || isLandingPage) {
    return <>{children}</>; 
  }

  // ==========================================
  // JIKA DI HALAMAN DASHBOARD UTAMA
  // Tampilkan antarmuka Pharmacist dengan rapi
  // ==========================================
  return (
    <div className="flex h-screen bg-[#FBFBFD] overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}