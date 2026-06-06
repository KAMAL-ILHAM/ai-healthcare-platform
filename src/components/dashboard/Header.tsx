'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Bell, User, Phone } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Header({ userName = "Pengguna" }: { userName?: string }) {
  const pathname = usePathname();

  const isDashboardHome = pathname === '/dashboard'; 
  const isSettings = pathname.includes('/settings'); 
  const isEducation = pathname.includes('/education'); 
  const isReadingArticle = pathname.startsWith('/dashboard/education/') && pathname !== '/dashboard/education';
  const isChat = pathname.includes('/chat');
  const isFacilities = pathname.includes('/facilities');

  if (isReadingArticle) return null;

  // Mengambil kata pertama dari nama untuk sapaan
  const firstName = userName.split(' ')[0];

  return (
    <header className="h-20 md:h-24 px-4 md:px-8 flex items-center justify-between shrink-0 relative z-10 mt-2 md:mt-0">
      
      {/* 🌟 min-w-0 penting agar teks panjang bisa terpotong elipsis di HP */}
      <div className="flex-1 min-w-0 pr-4">
        <AnimatePresence mode="wait">
          
          {isDashboardHome && (
            <motion.div key="dashboard" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.3 }} className="flex flex-col">
              <h1 className="text-lg md:text-2xl font-bold text-gray-900 tracking-tight truncate">Selamat datang, {firstName} 👋</h1>
              <p className="text-xs md:text-sm text-gray-500 font-medium mt-0.5 md:mt-1 truncate">Pusat kontrol kesehatan digital Anda.</p>
            </motion.div>
          )}

          {isSettings && (
            <motion.div key="settings" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.3 }} className="flex flex-col">
              <h1 className="text-lg md:text-2xl font-extrabold text-gray-900 tracking-tight uppercase truncate">PENGATURAN AKUN</h1>
              <p className="text-xs md:text-sm text-gray-500 mt-1 italic truncate hidden sm:block">Kelola preferensi, keamanan, dan integrasi ekosistem EIOHealth Anda.</p>
            </motion.div>
          )}

          {isEducation && (
            <motion.div key="education" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.3 }} className="flex flex-col">
              <h1 className="text-lg md:text-2xl font-extrabold text-gray-900 tracking-tight uppercase truncate">EDUKASI KESEHATAN</h1>
              <p className="text-xs md:text-sm text-gray-500 mt-1 italic truncate hidden sm:block">Pusat literasi medis cerdas dan rekomendasi terpersonalisasi.</p>
            </motion.div>
          )}

          {isChat && (
            <motion.div key="chat" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.3 }} className="flex flex-col">
              <div className="flex items-center gap-2">
                <h1 className="text-lg md:text-2xl font-extrabold text-gray-900 tracking-tight uppercase truncate">AI HEALTH ASSISTANT</h1>
                <span className="relative flex h-2.5 w-2.5 mt-0.5 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
              </div>
              <p className="text-xs md:text-sm text-gray-500 mt-1 italic truncate hidden sm:block">Konsultasi cerdas, analisis gejala, dan rekomendasi fasilitas secara real-time.</p>
            </motion.div>
          )}

          {isFacilities && (
            <motion.div key="facilities" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.3 }} className="flex flex-col">
              <h1 className="text-lg md:text-2xl font-extrabold text-gray-900 tracking-tight uppercase truncate">FASILITAS MEDIS</h1>
              <p className="text-xs md:text-sm text-gray-500 mt-1 italic truncate hidden sm:block">Pencarian berbasis AI dan navigasi fasilitas kesehatan terdekat.</p>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      <div className="flex items-center gap-3 md:gap-5 justify-end shrink-0">
        
        {!isChat && (
          <button className="relative p-2 md:p-2.5 bg-white/60 backdrop-blur-md border border-gray-200/60 rounded-full text-gray-500 hover:text-gray-900 transition-all hover:shadow-sm">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 md:top-2 right-1.5 md:right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
          </button>
        )}

        <div className="flex items-center gap-3 pl-1 md:pl-2 cursor-pointer group">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-gray-900 leading-none">{userName}</p>
          </div>
          <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-gradient-to-tr from-cyan-100 to-indigo-100 border border-white shadow-sm flex items-center justify-center overflow-hidden group-hover:ring-2 ring-indigo-500/30 transition-all">
            <User className="w-4 h-4 md:w-5 md:h-5 text-indigo-600" />
          </div>
        </div>
      </div>
      
    </header>
  );
}