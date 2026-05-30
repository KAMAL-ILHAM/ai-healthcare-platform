'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, Sparkles, MapPin, BookOpen, History, 
  Bookmark, LogOut, Settings, Activity 
} from 'lucide-react';
import Link from 'next/link';
// 1. Tambahkan import useRouter di sini
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
  // 2. Inisialisasi router
  const router = useRouter(); 

  // 3. Tambahkan fungsi handleLogout di sini
  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        // Hancurkan cache rute Next.js dan lempar ke halaman login
        router.push('/login');
        router.refresh();
      }
    } catch (error) {
      console.error("Gagal koneksi ke API logout:", error);
    }
  };

  return (
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
                <motion.div layoutId="activeMenu" className="absolute inset-0 bg-white border border-indigo-100 rounded-2xl shadow-sm z-0" />
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
        <Link href="/dashboard/settings" className="flex items-center gap-4 px-3 py-3 rounded-2xl text-gray-500 hover:bg-gray-50/80 hover:text-gray-900 transition-all group/item">
          <Settings className="w-5 h-5 shrink-0 text-gray-400 group-hover/item:text-gray-600" />
          <span className="text-sm font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">Pengaturan</span>
        </Link>
      </div>
    </motion.aside>
  );
}