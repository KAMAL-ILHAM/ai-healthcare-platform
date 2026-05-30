'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Bell, User, Phone } from 'lucide-react'; // Hapus import Search, tambahkan Phone
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  // Logika presisi untuk mendeteksi URL saat ini
  const isDashboardHome = pathname === '/dashboard'; 
  const isSettings = pathname.includes('/settings'); 
  const isEducation = pathname.includes('/education'); 
  const isChat = pathname.includes('/chat');
  const isFacilities = pathname.includes('/facilities');

  return (
    <header className="h-24 px-8 flex items-center justify-between shrink-0 relative z-10">
      
      {/* ==========================================
          AREA KIRI: JUDUL HALAMAN DINAMIS
          ========================================== */}
      <div className="flex-1">
        <AnimatePresence mode="wait">
          
          {isDashboardHome && (
            <motion.div key="dashboard" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.3 }} className="flex flex-col">
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Selamat datang kembali, Kamal 👋</h1>
              <p className="text-sm text-gray-500 font-medium mt-1">Pusat kontrol kesehatan digital Anda siap digunakan.</p>
            </motion.div>
          )}

          {isSettings && (
            <motion.div key="settings" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.3 }} className="flex flex-col">
              <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight uppercase">PENGATURAN AKUN</h1>
              <p className="text-sm text-gray-500 mt-1 italic">Kelola preferensi, keamanan, dan integrasi ekosistem EIOHealth Anda.</p>
            </motion.div>
          )}

          {isEducation && (
            <motion.div key="education" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.3 }} className="flex flex-col">
              <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight uppercase">EDUKASI KESEHATAN</h1>
              <p className="text-sm text-gray-500 mt-1 italic">Pusat literasi medis cerdas dan rekomendasi terpersonalisasi.</p>
            </motion.div>
          )}

          {isChat && (
            <motion.div key="chat" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.3 }} className="flex flex-col">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight uppercase">AI HEALTH ASSISTANT</h1>
                <span className="relative flex h-2.5 w-2.5 mt-0.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full ml-1">Online</span>
              </div>
              <p className="text-sm text-gray-500 mt-1 italic">Konsultasi cerdas, analisis gejala, dan rekomendasi fasilitas secara real-time.</p>
            </motion.div>
          )}

          {isFacilities && (
            <motion.div key="facilities" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.3 }} className="flex flex-col">
              <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight uppercase">FASILITAS MEDIS</h1>
              <p className="text-sm text-gray-500 mt-1 italic">Pencarian berbasis AI dan navigasi fasilitas kesehatan terdekat.</p>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* ==========================================
          AREA KANAN: AKSI MINIMAL & PROFIL
          ========================================== */}
      <div className="flex items-center gap-5 justify-end">
        
        {/* Tombol Darurat Khusus Halaman Fasilitas */}

        {/* Lonceng Notifikasi (Disembunyikan saat mode Chat) */}
        {!isChat && (
          <button className="relative p-2.5 bg-white/60 backdrop-blur-md border border-gray-200/60 rounded-full text-gray-500 hover:text-gray-900 transition-all hover:shadow-sm">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
          </button>
        )}

        {/* Profile Menu Tetap Muncul */}
        <div className="flex items-center gap-3 pl-2 cursor-pointer group">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-gray-900 leading-none">Kamal Ilham</p>
            <p className="text-xs text-indigo-600 font-semibold mt-1">Pharmacist</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-100 to-indigo-100 border border-white shadow-sm flex items-center justify-center overflow-hidden group-hover:ring-2 ring-indigo-500/30 transition-all">
            <User className="w-5 h-5 text-indigo-600" />
          </div>
        </div>
      </div>
      
    </header>
  );
}