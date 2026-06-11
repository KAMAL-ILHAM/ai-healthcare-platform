'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, Sparkles, MapPin, BookOpen, 
  Settings, Activity 
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation'; 

const sidebarMenus = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: Sparkles, label: 'AI Chat', href: '/dashboard/chat' },
  { icon: MapPin, label: 'Fasilitas Medis', href: '/dashboard/facilities' },
  { icon: BookOpen, label: 'Edukasi', href: '/dashboard/education' },
];

export default function Sidebar() {
  const [isSidebarHovered, setIsSidebarHovered] = useState(false);
  const pathname = usePathname();
  const router = useRouter(); 

  //   KUNCI RAHASIA: Jika sedang di halaman detail artikel, jangan tampilkan Sidebar/Navigasi
  const isReadingArticle = pathname.startsWith('/dashboard/education/') && pathname !== '/dashboard/education';
  if (isReadingArticle) return null;

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        router.push('/login');
        router.refresh();
      }
    } catch (error) {
      console.error("Gagal koneksi ke API logout:", error);
    }
  };

  return (
    <>
      {/* =========================================================
          SIDEBAR DESKTOP (Sembunyi di HP, Tampil di Tablet/Laptop) 
          ========================================================= */}
      <motion.aside 
        className="relative z-20 hidden md:flex flex-col m-6 mr-3 w-20 hover:w-64 transition-all duration-500 ease-[0.23,1,0.32,1] bg-white/70 backdrop-blur-xl border border-white/60 rounded-[32px] shadow-[0_8px_32px_rgba(0,0,0,0.03)] overflow-hidden group shrink-0"
        onMouseEnter={() => setIsSidebarHovered(true)}
        onMouseLeave={() => setIsSidebarHovered(false)}
      >
        <div className="p-6 flex items-center gap-4 border-b border-gray-100/50">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-600 to-cyan-500 flex items-center justify-center shrink-0 shadow-lg shadow-indigo-500/20">
            <Activity className="text-white w-4 h-4" strokeWidth={3} />
          </div>
          <span className="font-bold text-lg text-gray-900 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            EIOHealth
          </span>
        </div>

        <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto no-scrollbar">
          {sidebarMenus.map((menu, idx) => {
            const isActive = pathname === menu.href;
            return (
              <Link href={menu.href} key={idx} className={`flex items-center gap-4 px-3 py-3 rounded-2xl transition-all duration-300 group/item relative ${isActive ? 'bg-indigo-50/50 text-indigo-600' : 'text-gray-500 hover:bg-gray-50/80 hover:text-gray-900'}`}>
                {isActive && (
                  <motion.div layoutId="activeMenuDesktop" className="absolute inset-0 bg-white border border-indigo-100 rounded-2xl shadow-sm z-0" />
                )}
                <menu.icon className={`w-5 h-5 z-10 shrink-0 ${isActive ? 'text-indigo-600' : 'text-gray-400 group-hover/item:text-indigo-500 transition-colors'}`} />
                <span className="text-sm font-semibold z-10 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {menu.label}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-100/50 space-y-1">
          <Link href="/dashboard/settings" className={`flex items-center gap-4 px-3 py-3 rounded-2xl transition-all group/item ${pathname === '/dashboard/settings' ? 'bg-indigo-50/50 text-indigo-600' : 'text-gray-500 hover:bg-gray-50/80 hover:text-gray-900'}`}>
            <Settings className={`w-5 h-5 shrink-0 ${pathname === '/dashboard/settings' ? 'text-indigo-600' : 'text-gray-400 group-hover/item:text-gray-600'}`} />
            <span className="text-sm font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">Pengaturan</span>
          </Link>
        </div>
      </motion.aside>


      {/* =========================================================
          BOTTOM NAVIGATION MOBILE (Tampil di HP, Sembunyi di Laptop)
          ========================================================= */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-gray-200 flex justify-around items-center p-2 z-[60] pb-safe rounded-t-[24px] shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
        
        {sidebarMenus.map((menu, idx) => {
          const isActive = pathname === menu.href;
          return (
            <Link href={menu.href} key={idx} className={`flex flex-col items-center justify-center p-2 rounded-xl relative w-16 ${isActive ? 'text-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}>
              {isActive && (
                <motion.div layoutId="activeMenuMobile" className="absolute inset-0 bg-indigo-50 rounded-xl z-0" />
              )}
              <menu.icon className="w-5 h-5 z-10 mb-1" />
              
              {/* Teks diperpendek di HP agar tidak berdesakan */}
              <span className="text-[10px] font-bold z-10 whitespace-nowrap truncate w-full text-center">
                {menu.label === 'Fasilitas Medis' ? 'Fasilitas' : menu.label}
              </span>
            </Link>
          );
        })}
        
        {/* Tambahan Menu Pengaturan di Bottom Nav (karena di HP tidak ada tombol Pengaturan yang terpisah) */}
        <Link href="/dashboard/settings" className={`flex flex-col items-center justify-center p-2 rounded-xl relative w-16 ${pathname.includes('/settings') ? 'text-indigo-600 bg-indigo-50' : 'text-gray-400 hover:text-gray-600'}`}>
          <Settings className="w-5 h-5 z-10 mb-1" />
          <span className="text-[10px] font-bold z-10 whitespace-nowrap">Akun</span>
        </Link>

      </nav>
    </>
  );
}