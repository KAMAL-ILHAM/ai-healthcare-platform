'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  User, Shield, Bell, SlidersHorizontal, Lock, 
  Monitor, PlugZap, Smartphone, LogOut,
  Camera, CheckCircle2, AlertTriangle, ArrowRight, Loader2, Menu, X
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', { method: 'POST' });
      if (response.ok) {
        router.push('/login');
        router.refresh();
      }
    } catch (error) {
      console.error("Gagal melakukan logout:", error);
    }
  };

  // Mengambil data tab yang sedang aktif untuk ditampilkan di tombol menu HP
  const activeTabData = settingsTabs.find(t => t.id === activeTab) || settingsTabs[0];

  return (
    <div className="max-w-7xl mx-auto pb-24 lg:pb-0">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        
        {/* --- MOBILE MENU TOGGLE (HAMBURGER) --- */}
        <div className="lg:hidden relative z-30">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-full flex items-center justify-between bg-white/90 backdrop-blur-xl border border-gray-200 p-4 rounded-2xl shadow-sm transition-all active:scale-[0.98]"
          >
            <div className="flex items-center gap-3">
              <activeTabData.icon className="w-5 h-5 text-indigo-600" />
              <span className="font-bold text-gray-900">{activeTabData.label}</span>
            </div>
            {isMobileMenuOpen ? <X className="w-5 h-5 text-gray-500" /> : <Menu className="w-5 h-5 text-gray-500" />}
          </button>

          {/* DROPDOWN MENU MOBILE */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 w-full mt-2 bg-white/95 backdrop-blur-xl border border-gray-200 shadow-xl rounded-2xl p-2 z-40 flex flex-col gap-1"
              >
                {settingsTabs.map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id);
                        setIsMobileMenuOpen(false); // Otomatis tertutup saat menu dipilih
                      }}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all text-left w-full ${
                        isActive ? 'text-indigo-600 bg-indigo-50/80' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      <tab.icon className={`w-5 h-5 ${isActive ? 'text-indigo-600' : 'text-gray-400'}`} />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
                
                <div className="h-px bg-gray-200/60 my-1 w-full" />
                
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-rose-500 hover:bg-rose-50/50 hover:text-rose-600 transition-all text-left w-full"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Keluar Sistem</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* --- DESKTOP SIDEBAR (TETAP VERTIKAL DI KIRI KHUSUS LAPTOP) --- */}
        <motion.nav 
          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
          className="hidden lg:flex w-72 shrink-0 flex-col gap-2"
        >
          {settingsTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all duration-300 overflow-hidden group text-left ${
                  isActive ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-900 hover:bg-white/50'
                }`}
              >
                {isActive && (
                  <motion.div 
                    layoutId="settingsTabDesktop" 
                    className="absolute inset-0 bg-white/80 backdrop-blur-md border border-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] rounded-2xl z-0" 
                  />
                )}
                <tab.icon className={`w-5 h-5 z-10 transition-colors ${isActive ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-500'}`} />
                <span className="z-10">{tab.label}</span>
              </button>
            );
          })}
          
          <div className="h-px bg-gray-200/60 my-4 w-full" />
          
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-semibold text-rose-500 hover:bg-rose-50/50 hover:text-rose-600 transition-all text-left"
          >
            <LogOut className="w-5 h-5" />
            <span>Keluar Sistem</span>
          </button>
        </motion.nav>

        {/* --- KONTEN SETTINGS --- */}
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
              
              {!['profile', 'security', 'notifications', 'appearance'].includes(activeTab) && (
                <div className="bg-white/60 backdrop-blur-xl border border-white/80 p-8 lg:p-12 rounded-[24px] lg:rounded-[32px] flex flex-col items-center justify-center text-center shadow-sm max-w-2xl min-h-[300px] lg:min-h-[400px]">
                  <PlugZap className="w-10 h-10 lg:w-12 lg:h-12 text-gray-300 mb-3 lg:mb-4" />
                  <h3 className="text-lg lg:text-xl font-bold text-gray-900">Modul Segera Hadir</h3>
                  <p className="text-xs lg:text-sm text-gray-500 mt-2 max-w-sm">Pengaturan untuk modul ini sedang dalam tahap pengembangan iterasi berikutnya.</p>
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
// KOMPONEN PROFIL 
// ============================================================================

function ProfileSettings() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [originalData, setOriginalData] = useState({ name: '', email: '' });
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [userExists, setUserExists] = useState(true); 
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch('/api/settings/profile');
        if (res.status === 404 || res.status === 401) {
          setUserExists(false);
          setIsLoading(false);
          return;
        }

        if (res.ok) {
          const data = await res.json();
          const loadedData = {
            name: data.name || '',
            email: data.email || ''
          };
          setFormData(loadedData);
          setOriginalData(loadedData);
        } else {
          throw new Error('Respons tidak dikenali');
        }
      } catch (error) {
        console.error("Gagal mengambil data profil", error);
        setMessage({ type: 'error', text: 'Koneksi ke server gagal. Periksa jaringan Anda.' });
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const validateForm = () => {
    const { name, email } = formData;
    if (!name.trim()) return "Nama lengkap tidak boleh kosong.";
    if (name.length > 60) return "Nama lengkap maksimal 60 karakter.";
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) return "Email publik tidak boleh kosong.";
    if (!emailRegex.test(email)) return "Format email tidak valid.";

    return null;
  };

  const handleSave = async () => {
    setMessage({ type: '', text: '' }); 
    const validationError = validateForm();
    if (validationError) {
      setMessage({ type: 'error', text: validationError });
      return;
    }

    setIsSaving(true);
    try {
      const res = await fetch('/api/settings/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim()
        })
      });
      
      const responseData = await res.json();

      if (res.ok) {
        setOriginalData(formData);
        setMessage({ type: 'success', text: 'Profil berhasil diperbarui!' });
        router.refresh(); 
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      } else {
        setMessage({ type: 'error', text: responseData.error || 'Terjadi kesalahan sistem.' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Gagal menyimpan perubahan. Silakan coba lagi.' });
    } finally {
      setIsSaving(false);
    }
  };

  const isChanged = formData.name !== originalData.name || formData.email !== originalData.email;

  if (isLoading) {
    return (
      <div className="max-w-2xl bg-white/60 backdrop-blur-xl border border-white/80 p-8 lg:p-12 rounded-[24px] lg:rounded-[32px] flex items-center justify-center min-h-[300px] lg:min-h-[400px]">
        <Loader2 className="w-8 h-8 lg:w-10 lg:h-10 text-cyan-500 animate-spin" />
      </div>
    );
  }

  if (!userExists) {
    return (
      <div className="max-w-2xl bg-white/80 backdrop-blur-xl border border-rose-100 p-8 lg:p-12 rounded-[24px] lg:rounded-[32px] shadow-[0_8px_32px_rgba(0,0,0,0.03)] flex flex-col items-center justify-center text-center min-h-[300px] lg:min-h-[400px]">
        <div className="w-16 h-16 lg:w-20 lg:h-20 bg-rose-50 rounded-full flex items-center justify-center mb-4 lg:mb-6">
          <AlertTriangle className="w-8 h-8 lg:w-10 lg:h-10 text-rose-500" />
        </div>
        <h2 className="text-xl lg:text-2xl font-black text-slate-900 mb-2 lg:mb-3">Akun Tidak Ditemukan</h2>
        <p className="text-sm text-slate-500 mb-6 lg:mb-8 max-w-md">Data sesi Anda tidak terdaftar di dalam database EIOHealth. Akses untuk mengubah profil ditolak demi keamanan.</p>
        <button 
          onClick={() => router.push('/login')} 
          className="px-6 py-2.5 lg:px-8 lg:py-3 bg-slate-900 text-white rounded-full text-sm lg:text-base font-bold hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20"
        >
          Kembali ke Login
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4 lg:space-y-6 max-w-2xl">
      <div className="bg-white/60 backdrop-blur-xl border border-white/80 p-5 sm:p-8 rounded-[24px] lg:rounded-[32px] shadow-[0_8px_32px_rgba(0,0,0,0.03)] flex flex-col sm:flex-row items-center gap-5 sm:gap-8 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-cyan-400/20 blur-3xl rounded-full pointer-events-none" />
        
        <div className="relative group cursor-pointer shrink-0">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-cyan-100 to-indigo-100 border-4 border-white shadow-lg flex items-center justify-center overflow-hidden">
            <span className="text-xl sm:text-2xl font-black text-indigo-400">
              {formData.name ? formData.name.substring(0, 2).toUpperCase() : 'UI'}
            </span>
          </div>
          <div className="absolute inset-0 bg-gray-900/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
            <Camera className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
        </div>
        
        <div className="flex-1 text-center sm:text-left z-10">
          <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{originalData.name || 'Pengguna'}</h2>
            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-500 shrink-0" />
          </div>
          {/* Label disesuaikan menjadi Pharmacist */}
          <p className="text-indigo-600 font-semibold text-xs sm:text-sm mb-2 sm:mb-3">EIOHealth User</p>
          <p className="text-gray-500 text-xs sm:text-sm">Ketuk foto untuk memperbarui avatar Anda.</p>
        </div>
      </div>

      <div className="bg-white/60 backdrop-blur-xl border border-white/80 p-5 sm:p-8 rounded-[24px] lg:rounded-[32px] shadow-[0_8px_32px_rgba(0,0,0,0.03)]">
        <h3 className="text-base lg:text-lg font-bold text-gray-900 mb-5 lg:mb-6">Informasi Personal</h3>
        
        <div className="space-y-4 lg:space-y-5">
          <InputGroup 
            label="Nama Lengkap" 
            placeholder="Masukkan nama lengkap Anda" 
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <InputGroup 
            label="Email Publik" 
            type="email"
            placeholder="email@domain.com" 
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        <AnimatePresence>
          {message.text && (
            <motion.div 
              initial={{ opacity: 0, height: 0, marginTop: 0 }} 
              animate={{ opacity: 1, height: 'auto', marginTop: 16 }} 
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              className={`p-3 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 ${
                message.type === 'error' ? 'bg-rose-50 text-rose-600 border border-rose-100' : 'bg-emerald-50 text-emerald-600 border border-emerald-100'
              }`}
            >
              {message.type === 'error' ? <AlertTriangle className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" /> : <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />}
              {message.text}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-6 lg:mt-8 flex justify-end">
          <button 
            onClick={handleSave}
            disabled={!isChanged || isSaving}
            className={`group relative px-5 py-2.5 lg:px-6 lg:py-3 w-full sm:w-auto rounded-xl text-white text-xs lg:text-sm font-bold flex items-center justify-center gap-2 transition-all duration-300 ${
              !isChanged || isSaving 
                ? 'bg-gray-300 cursor-not-allowed opacity-70' 
                : 'bg-gradient-to-r from-indigo-600 to-cyan-500 hover:scale-[1.02] hover:shadow-[0_8px_24px_rgba(6,182,212,0.3)] active:scale-[0.98]'
            }`}
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Menyimpan...
              </>
            ) : (
              <>
                Simpan Perubahan
                <ArrowRight className={`w-3.5 h-3.5 lg:w-4 lg:h-4 transition-transform ${isChanged ? 'group-hover:translate-x-1' : ''}`} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// KOMPONEN LAINNYA 
// ============================================================================

function SecuritySettings() {
  return (
    <div className="space-y-4 lg:space-y-6 max-w-2xl">
      <div className="bg-white/60 backdrop-blur-xl border border-white/80 p-5 sm:p-8 rounded-[24px] lg:rounded-[32px] shadow-[0_8px_32px_rgba(0,0,0,0.03)]">
        <div className="flex items-start gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="p-2.5 sm:p-3 bg-emerald-50 rounded-xl sm:rounded-2xl text-emerald-600 shrink-0">
            <Shield className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <h3 className="text-base lg:text-lg font-bold text-gray-900">Keamanan Sangat Baik</h3>
            <p className="text-gray-500 text-xs sm:text-sm mt-1">Akun dilindungi enkripsi medis. Disarankan mengaktifkan 2FA.</p>
          </div>
        </div>
        <h4 className="text-sm font-bold text-gray-900 mb-3 sm:mb-4">Ubah Kata Sandi</h4>
        <div className="grid grid-cols-1 gap-4 sm:gap-5 mb-6 sm:mb-8">
          <InputGroup type="password" label="Kata Sandi Saat Ini" placeholder="••••••••" />
          <InputGroup type="password" label="Kata Sandi Baru" placeholder="Min. 8 karakter" />
        </div>
        <div className="h-px bg-gray-200/60 w-full mb-5 sm:mb-8" />
        <div className="flex items-center justify-between mb-2 gap-4">
          <div>
            <h4 className="text-sm font-bold text-gray-900">Autentikasi Dua Faktor (2FA)</h4>
            <p className="text-gray-500 text-[11px] sm:text-xs mt-1">Gunakan aplikasi authenticator untuk keamanan ekstra.</p>
          </div>
          <ToggleSwitch isActive={false} />
        </div>
      </div>
      
      <div className="bg-rose-50/50 backdrop-blur-xl border border-rose-100/50 p-5 sm:p-8 rounded-[24px] lg:rounded-[32px]">
        <div className="flex items-start gap-3 sm:gap-4 flex-col sm:flex-row">
          <div className="p-2.5 sm:p-3 bg-rose-100/50 rounded-xl sm:rounded-2xl text-rose-600 shrink-0">
            <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div className="flex-1 w-full">
            <h3 className="text-base lg:text-lg font-bold text-rose-900">Hapus Akun Permanen</h3>
            <p className="text-rose-700/70 text-xs sm:text-sm mt-1 mb-4">Semua data medis, riwayat AI, dan profil Anda akan dihapus permanen.</p>
            <button className="w-full sm:w-auto px-5 py-2.5 bg-rose-500/10 hover:bg-rose-500 text-rose-600 hover:text-white border border-rose-200 hover:border-rose-500 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-sm">
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
    <div className="bg-white/60 backdrop-blur-xl border border-white/80 p-5 sm:p-8 rounded-[24px] lg:rounded-[32px] shadow-[0_8px_32px_rgba(0,0,0,0.03)] space-y-6 sm:space-y-8 max-w-2xl">
      <div>
        <h3 className="text-base lg:text-lg font-bold text-gray-900 mb-1">Notifikasi Sistem</h3>
        <p className="text-xs sm:text-sm text-gray-500 mb-5 sm:mb-6">Atur komunikasi EIOHealth dengan Anda.</p>
        <div className="space-y-5 sm:space-y-6">
          <ToggleRow title="Pengingat Konsultasi" desc="Dapatkan notifikasi jadwal dan hasil analisis." active={true} />
          <ToggleRow title="Rekomendasi Artikel" desc="Artikel kesehatan sesuai minat Anda." active={false} />
          <ToggleRow title="Notifikasi Keamanan" desc="Peringatan saat login dari perangkat baru." active={true} />
        </div>
      </div>
      <div className="flex justify-end">
        <button className="w-full sm:w-auto px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white text-xs sm:text-sm font-bold transition-all hover:scale-[1.02]">
          Simpan Preferensi
        </button>
      </div>
    </div>
  );
}

function AppearanceSettings() {
  return (
    <div className="bg-white/60 backdrop-blur-xl border border-white/80 p-5 sm:p-8 rounded-[24px] lg:rounded-[32px] shadow-[0_8px_32px_rgba(0,0,0,0.03)] max-w-2xl">
      <h3 className="text-base lg:text-lg font-bold text-gray-900 mb-1">Tema Aplikasi</h3>
      <p className="text-xs sm:text-sm text-gray-500 mb-5 sm:mb-6">Pilih mode tampilan yang nyaman untuk mata Anda.</p>
      {/* 🌟 PERBAIKAN MOBILE: grid-cols-3 agar kartu tema jejer ke samping di HP tanpa scroll */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        <div className="border-2 border-indigo-500 rounded-xl sm:rounded-2xl p-2 sm:p-4 cursor-pointer bg-gray-50 relative overflow-hidden group">
          <div className="absolute top-1 right-1 sm:top-2 sm:right-2 w-4 h-4 sm:w-5 sm:h-5 bg-indigo-500 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
          </div>
          <div className="w-full h-16 sm:h-24 bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 mb-2 sm:mb-3 flex flex-col p-1.5 sm:p-2 gap-1.5 sm:gap-2">
            <div className="w-full h-2.5 sm:h-4 bg-gray-100 rounded md:rounded-md" />
            <div className="w-2/3 h-2.5 sm:h-4 bg-gray-100 rounded md:rounded-md" />
          </div>
          <p className="text-center font-bold text-[10px] sm:text-sm text-gray-900">Light</p>
        </div>
        <div className="border border-gray-200 hover:border-gray-300 rounded-xl sm:rounded-2xl p-2 sm:p-4 cursor-pointer bg-gray-900 relative overflow-hidden transition-colors">
          <div className="w-full h-16 sm:h-24 bg-gray-800 rounded-lg sm:rounded-xl shadow-sm border border-gray-700 mb-2 sm:mb-3 flex flex-col p-1.5 sm:p-2 gap-1.5 sm:gap-2">
            <div className="w-full h-2.5 sm:h-4 bg-gray-700 rounded md:rounded-md" />
            <div className="w-2/3 h-2.5 sm:h-4 bg-gray-700 rounded md:rounded-md" />
          </div>
          <p className="text-center font-bold text-[10px] sm:text-sm text-white">Dark</p>
        </div>
        <div className="border border-gray-200 hover:border-gray-300 rounded-xl sm:rounded-2xl p-2 sm:p-4 cursor-pointer bg-gradient-to-br from-gray-50 to-gray-900 relative overflow-hidden transition-colors">
          <div className="w-full h-16 sm:h-24 bg-white/50 backdrop-blur-md rounded-lg sm:rounded-xl shadow-sm border border-gray-300/50 mb-2 sm:mb-3 flex items-center justify-center">
            <Monitor className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
          </div>
          <p className="text-center font-bold text-[10px] sm:text-sm text-gray-900 bg-white/80 rounded-full py-0.5 sm:mt-1 backdrop-blur-sm">System</p>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// MICRO-COMPONENTS
// ============================================================================

function InputGroup({ label, placeholder, type = "text", value, onChange }: { label: string, placeholder: string, type?: string, value?: string, onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
  return (
    <div>
      <label className="block text-[11px] sm:text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5 sm:mb-2 ml-1">{label}</label>
      <input
        type={type} 
        placeholder={placeholder}
        value={value !== undefined ? value : undefined}
        onChange={onChange}
        className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3.5 bg-white/40 border border-white/60 rounded-xl text-xs sm:text-sm focus:outline-none focus:bg-white/80 focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500 transition-all placeholder:text-gray-400 text-gray-900 font-medium shadow-sm"
      />
    </div>
  );
}

function ToggleRow({ title, desc, active }: { title: string, desc: string, active: boolean }) {
  const [isOn, setIsOn] = useState(active);
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="pr-4 sm:pr-8">
        <h4 className="text-sm font-bold text-gray-900">{title}</h4>
        <p className="text-gray-500 text-[11px] sm:text-xs mt-1 leading-relaxed">{desc}</p>
      </div>
      <ToggleSwitch isActive={isOn} onClick={() => setIsOn(!isOn)} />
    </div>
  );
}

function ToggleSwitch({ isActive, onClick }: { isActive: boolean, onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`w-10 sm:w-11 h-5 sm:h-6 flex items-center rounded-full px-1 transition-colors duration-300 focus:outline-none shrink-0 ${isActive ? 'bg-cyan-500' : 'bg-gray-300'}`}
    >
      <motion.div 
        layout
        className="w-3.5 h-3.5 sm:w-4 sm:h-4 bg-white rounded-full shadow-sm"
        animate={{ x: isActive ? (window.innerWidth < 640 ? 16 : 20) : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    </button>
  );
}