'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  User, Shield, Bell, SlidersHorizontal, Lock, 
  Monitor, Languages, PlugZap, Smartphone, LogOut,
  Camera, CheckCircle2, AlertTriangle, ArrowRight
} from 'lucide-react';

// --- DATA MENU SETTINGS ---
const settingsTabs = [
  { id: 'profile', label: 'Profil', icon: User },
  { id: 'security', label: 'Keamanan', icon: Shield },
  { id: 'notifications', label: 'Notifikasi', icon: Bell },
  { id: 'appearance', label: 'Tampilan', icon: Monitor },
  { id: 'preferences', label: 'Preferensi', icon: SlidersHorizontal },
  { id: 'privacy', label: 'Privasi', icon: Lock },
  { id: 'api', label: 'Integrasi API', icon: PlugZap },
  { id: 'sessions', label: 'Sesi & Perangkat', icon: Smartphone },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const router = useRouter();

  // --- FUNGSI LOGOUT ---
  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', { method: 'POST' });
      if (response.ok) {
        router.push('/login');
        router.refresh(); // Memaksa pembersihan cache halaman
      }
    } catch (error) {
      console.error("Gagal melakukan logout:", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* --- INNER SIDEBAR (NAVIGASI SETTINGS) --- */}
        <motion.nav 
          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
          className="w-full lg:w-72 shrink-0 flex flex-col gap-1.5"
        >
          {settingsTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all duration-300 overflow-hidden group w-full text-left ${
                  isActive ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-900 hover:bg-white/50'
                }`}
              >
                {isActive && (
                  <motion.div 
                    layoutId="settingsTab" 
                    className="absolute inset-0 bg-white/80 backdrop-blur-md border border-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] rounded-2xl z-0" 
                  />
                )}
                <tab.icon className={`w-5 h-5 z-10 transition-colors ${isActive ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-500'}`} />
                <span className="z-10">{tab.label}</span>
              </button>
            );
          })}
          
          <div className="h-px bg-gray-200/60 my-4 w-full" />
          
          {/* --- TOMBOL LOGOUT TERINTEGRASI --- */}
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-semibold text-rose-500 hover:bg-rose-50/50 hover:text-rose-600 transition-all w-full text-left"
          >
            <LogOut className="w-5 h-5" />
            <span>Keluar Sistem</span>
          </button>
        </motion.nav>

        {/* --- KONTEN SETTINGS (DENGAN ANIMASI TRANSISI) --- */}
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {activeTab === 'profile' && <ProfileSettings />}
              {activeTab === 'security' && <SecuritySettings />}
              {activeTab === 'notifications' && <NotificationSettings />}
              {activeTab === 'appearance' && <AppearanceSettings />}
              {/* Fallback untuk tab lain agar desain tetap tidak rusak */}
              {!['profile', 'security', 'notifications', 'appearance'].includes(activeTab) && (
                <div className="bg-white/60 backdrop-blur-xl border border-white/80 p-12 rounded-[32px] flex flex-col items-center justify-center text-center shadow-sm">
                  <PlugZap className="w-12 h-12 text-gray-300 mb-4" />
                  <h3 className="text-xl font-bold text-gray-900">Modul Segera Hadir</h3>
                  <p className="text-gray-500 mt-2 max-w-sm">Pengaturan untuk modul ini sedang dalam tahap pengembangan iterasi berikutnya.</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}

// ============================================================================
// KOMPONEN-KOMPONEN TAB
// ============================================================================

function ProfileSettings() {
  return (
    <div className="space-y-6">
      {/* KARTU PROFIL HEADER */}
      <div className="bg-white/60 backdrop-blur-xl border border-white/80 p-8 rounded-[32px] shadow-[0_8px_32px_rgba(0,0,0,0.03)] flex flex-col sm:flex-row items-center gap-8 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-cyan-400/20 blur-3xl rounded-full pointer-events-none" />
        
        <div className="relative group cursor-pointer">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-cyan-100 to-indigo-100 border-4 border-white shadow-xl flex items-center justify-center overflow-hidden">
            <User className="w-10 h-10 text-indigo-400" />
          </div>
          <div className="absolute inset-0 bg-gray-900/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
            <Camera className="w-6 h-6 text-white" />
          </div>
        </div>
        
        <div className="flex-1 text-center sm:text-left z-10">
          <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
            <h2 className="text-2xl font-bold text-gray-900">Kamal Ilham</h2>
            <CheckCircle2 className="w-5 h-5 text-cyan-500" />
          </div>
          <p className="text-indigo-600 font-semibold text-sm mb-3">Verified Pharmacist • EIOHealth Pro</p>
          <p className="text-gray-500 text-sm max-w-md">Format gambar yang didukung: JPG, PNG, atau GIF. Ukuran maksimal 2MB.</p>
        </div>
      </div>

      {/* FORM INFORMASI PERSONAL */}
      <div className="bg-white/60 backdrop-blur-xl border border-white/80 p-8 rounded-[32px] shadow-[0_8px_32px_rgba(0,0,0,0.03)]">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Informasi Personal</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputGroup label="Nama Lengkap" placeholder="Kamal Ilham" />
          <InputGroup label="Email Publik" placeholder="pharmacist@eiohealth.com" />
          <InputGroup label="Nomor Telepon" placeholder="+62 812 3456 7890" />
          <InputGroup label="Lokasi Praktik/Instansi" placeholder="Universitas Muhammadiyah Kalimantan Timur" />
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2 ml-1">Bio Singkat</label>
            <textarea 
              rows={3} placeholder="Tuliskan spesialisasi atau deskripsi singkat Anda..."
              className="w-full px-4 py-3 bg-white/40 border border-white/60 rounded-xl text-sm focus:outline-none focus:bg-white/80 focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500 transition-all placeholder:text-gray-400 text-gray-900 font-medium shadow-sm resize-none"
            />
          </div>
        </div>
        <div className="mt-8 flex justify-end">
          <ButtonPrimary>Simpan Perubahan</ButtonPrimary>
        </div>
      </div>
    </div>
  );
}

function SecuritySettings() {
  return (
    <div className="space-y-6">
      <div className="bg-white/60 backdrop-blur-xl border border-white/80 p-8 rounded-[32px] shadow-[0_8px_32px_rgba(0,0,0,0.03)]">
        <div className="flex items-start gap-4 mb-8">
          <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-600">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Keamanan Akun Sangat Baik</h3>
            <p className="text-gray-500 text-sm mt-1">Akun Anda dilindungi dengan enkripsi level medis. Disarankan untuk mengaktifkan 2FA.</p>
          </div>
        </div>

        <h4 className="text-sm font-bold text-gray-900 mb-4">Ubah Kata Sandi</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <InputGroup type="password" label="Kata Sandi Saat Ini" placeholder="••••••••" />
          <InputGroup type="password" label="Kata Sandi Baru" placeholder="Min. 8 karakter" />
        </div>

        <div className="h-px bg-gray-200/60 w-full mb-8" />

        <div className="flex items-center justify-between mb-2">
          <div>
            <h4 className="text-sm font-bold text-gray-900">Autentikasi Dua Faktor (2FA)</h4>
            <p className="text-gray-500 text-xs mt-1">Gunakan aplikasi authenticator untuk keamanan ekstra.</p>
          </div>
          <ToggleSwitch isActive={false} />
        </div>
      </div>

      {/* DANGER ZONE */}
      <div className="bg-rose-50/50 backdrop-blur-xl border border-rose-100/50 p-8 rounded-[32px]">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-rose-100/50 rounded-2xl text-rose-600">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-rose-900">Hapus Akun Permanen</h3>
            <p className="text-rose-700/70 text-sm mt-1 mb-4">Semua data medis, riwayat konsultasi AI, dan profil Anda akan dihapus secara permanen dari server kami.</p>
            <button className="px-5 py-2.5 bg-rose-500/10 hover:bg-rose-500 text-rose-600 hover:text-white border border-rose-200 hover:border-rose-500 rounded-xl text-sm font-bold transition-all shadow-sm">
              Hapus Akun Saya
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function NotificationSettings() {
  return (
    <div className="bg-white/60 backdrop-blur-xl border border-white/80 p-8 rounded-[32px] shadow-[0_8px_32px_rgba(0,0,0,0.03)] space-y-8">
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-1">Notifikasi Sistem</h3>
        <p className="text-sm text-gray-500 mb-6">Atur bagaimana EIOHealth berkomunikasi dengan Anda.</p>
        
        <div className="space-y-6">
          <ToggleRow title="Pengingat Konsultasi AI" desc="Dapatkan notifikasi untuk jadwal konsultasi dan hasil analisis." active={true} />
          <ToggleRow title="Rekomendasi Artikel Edukasi" desc="Artikel kesehatan terbaru berdasarkan minat Anda." active={false} />
          <ToggleRow title="Notifikasi Keamanan" desc="Peringatan saat login dari perangkat baru." active={true} />
        </div>
      </div>
      <div className="flex justify-end">
        <ButtonPrimary>Simpan Preferensi</ButtonPrimary>
      </div>
    </div>
  );
}

function AppearanceSettings() {
  return (
    <div className="bg-white/60 backdrop-blur-xl border border-white/80 p-8 rounded-[32px] shadow-[0_8px_32px_rgba(0,0,0,0.03)]">
      <h3 className="text-lg font-bold text-gray-900 mb-1">Tema Aplikasi</h3>
      <p className="text-sm text-gray-500 mb-6">Pilih mode tampilan yang paling nyaman untuk mata Anda.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Mockup Light Mode */}
        <div className="border-2 border-indigo-500 rounded-2xl p-4 cursor-pointer bg-gray-50 relative overflow-hidden group">
          <div className="absolute top-2 right-2 w-5 h-5 bg-indigo-500 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-3 h-3 text-white" />
          </div>
          <div className="w-full h-24 bg-white rounded-xl shadow-sm border border-gray-200 mb-3 flex flex-col p-2 gap-2">
            <div className="w-full h-4 bg-gray-100 rounded-md" />
            <div className="w-2/3 h-4 bg-gray-100 rounded-md" />
          </div>
          <p className="text-center font-bold text-sm text-gray-900">Light Mode</p>
        </div>

        {/* Mockup Dark Mode */}
        <div className="border border-gray-200 hover:border-gray-300 rounded-2xl p-4 cursor-pointer bg-gray-900 relative overflow-hidden transition-colors">
          <div className="w-full h-24 bg-gray-800 rounded-xl shadow-sm border border-gray-700 mb-3 flex flex-col p-2 gap-2">
            <div className="w-full h-4 bg-gray-700 rounded-md" />
            <div className="w-2/3 h-4 bg-gray-700 rounded-md" />
          </div>
          <p className="text-center font-bold text-sm text-white">Dark Mode</p>
        </div>

        {/* Mockup System Mode */}
        <div className="border border-gray-200 hover:border-gray-300 rounded-2xl p-4 cursor-pointer bg-gradient-to-br from-gray-50 to-gray-900 relative overflow-hidden transition-colors">
          <div className="w-full h-24 bg-white/50 backdrop-blur-md rounded-xl shadow-sm border border-gray-300/50 mb-3 flex items-center justify-center">
            <Monitor className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-center font-bold text-sm text-gray-900 bg-white/80 rounded-full py-0.5 mt-1 backdrop-blur-sm">System Sync</p>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// MICRO-COMPONENTS (Alat bantu UI kecil)
// ============================================================================

function InputGroup({ label, placeholder, type = "text" }: { label: string, placeholder: string, type?: string }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2 ml-1">{label}</label>
      <input
        type={type} placeholder={placeholder}
        className="w-full px-4 py-3.5 bg-white/40 border border-white/60 rounded-xl text-sm focus:outline-none focus:bg-white/80 focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500 transition-all placeholder:text-gray-400 text-gray-900 font-medium shadow-sm"
      />
    </div>
  );
}

function ToggleRow({ title, desc, active }: { title: string, desc: string, active: boolean }) {
  const [isOn, setIsOn] = useState(active);
  return (
    <div className="flex items-center justify-between">
      <div className="pr-8">
        <h4 className="text-sm font-bold text-gray-900">{title}</h4>
        <p className="text-gray-500 text-xs mt-1 leading-relaxed">{desc}</p>
      </div>
      <ToggleSwitch isActive={isOn} onClick={() => setIsOn(!isOn)} />
    </div>
  );
}

function ToggleSwitch({ isActive, onClick }: { isActive: boolean, onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`w-11 h-6 flex items-center rounded-full px-1 transition-colors duration-300 focus:outline-none shrink-0 ${isActive ? 'bg-cyan-500' : 'bg-gray-300'}`}
    >
      <motion.div 
        layout
        className="w-4 h-4 bg-white rounded-full shadow-sm"
        animate={{ x: isActive ? 20 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    </button>
  );
}

function ButtonPrimary({ children }: { children: React.ReactNode }) {
  return (
    <button className="group relative px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white text-sm font-bold flex items-center gap-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_8px_24px_rgba(6,182,212,0.3)] active:scale-[0.98]">
      {children}
      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
    </button>
  );
}