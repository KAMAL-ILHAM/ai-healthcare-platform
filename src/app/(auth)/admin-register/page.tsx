'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AdminRegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    systemKey: '', 
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    console.log("Mendaftarkan Otoritas Baru:", {
      ...formData,
      isStaff: true,
      role: 'admin'
    });
    
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden bg-ambient-glow font-sans p-4">
      
      {/* Background Ornamen */}
      <div className="absolute inset-0 bg-pattern-grid pointer-events-none"></div>
      <div 
        className="absolute top-[10%] right-[15%] w-96 h-96 bg-indigo-500/20 rounded-full blur-[100px] pointer-events-none"
        style={{ animation: 'float-blob 12s ease-in-out infinite' }}
      ></div>
      <div 
        className="absolute bottom-[10%] left-[10%] w-80 h-80 bg-cyan-400/20 rounded-full blur-[100px] pointer-events-none"
        style={{ animation: 'float-blob 10s ease-in-out infinite reverse' }}
      ></div>

      {/* Glassmorphism Card */}
      <div className="relative z-10 w-full max-w-[500px] p-8 md:p-10 bg-white/70 backdrop-blur-3xl border border-white/90 rounded-[2.5rem] shadow-premium">
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-gray-800">
            Registrasi <span className="text-gradient-cyan-indigo">Otoritas</span>
          </h1>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-widest mt-2">
            EIOHealth Management System
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          {/* Input Nama Lengkap */}
          <div className="relative">
            <input
              type="text"
              required
              className="peer w-full px-5 py-4 bg-white/40 border border-gray-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all placeholder-transparent text-gray-700"
              placeholder="Nama"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
            <label className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-focus:top-3 peer-focus:text-xs peer-focus:text-indigo-600 peer-valid:top-3 peer-valid:text-xs font-medium pointer-events-none">
              Nama Lengkap Otoritas
            </label>
          </div>

          {/* Input Email Dinas */}
          <div className="relative">
            <input
              type="email"
              required
              className="peer w-full px-5 py-4 bg-white/40 border border-gray-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all placeholder-transparent text-gray-700"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
            <label className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-focus:top-3 peer-focus:text-xs peer-focus:text-indigo-600 peer-valid:top-3 peer-valid:text-xs font-medium pointer-events-none">
              Email Otoritas / Dinas
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Input Password */}
            <div className="relative">
              <input
                type="password"
                required
                className="peer w-full px-5 py-4 bg-white/40 border border-gray-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all placeholder-transparent text-gray-700"
                placeholder="Sandi"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
              <label className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-focus:top-3 peer-focus:text-xs peer-focus:text-indigo-600 peer-valid:top-3 peer-valid:text-xs font-medium pointer-events-none">
                Sandi Akses
              </label>
            </div>

            {/* Konfirmasi Password */}
            <div className="relative">
              <input
                type="password"
                required
                className="peer w-full px-5 py-4 bg-white/40 border border-gray-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all placeholder-transparent text-gray-700"
                placeholder="Konfirmasi"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              />
              <label className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-focus:top-3 peer-focus:text-xs peer-focus:text-indigo-600 peer-valid:top-3 peer-valid:text-xs font-medium pointer-events-none">
                Ulangi Sandi
              </label>
            </div>
          </div>

          {/* Akses Key Khusus Admin */}
          <div className="relative mt-2">
            <input
              type="password"
              required
              className="peer w-full px-5 py-4 bg-cyan-50/40 border border-cyan-200/60 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500 transition-all placeholder-transparent text-gray-700"
              placeholder="System Key"
              value={formData.systemKey}
              onChange={(e) => setFormData({...formData, systemKey: e.target.value})}
            />
            <label className="absolute left-5 top-1/2 -translate-y-1/2 text-cyan-700/70 text-sm transition-all peer-placeholder-shown:text-base peer-focus:top-3 peer-focus:text-xs peer-focus:text-cyan-700 peer-valid:top-3 peer-valid:text-xs font-medium pointer-events-none">
              System Access Key
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-4 mt-6 rounded-2xl text-white font-semibold tracking-wide transition-all duration-300 shadow-glow-cyan
              ${isLoading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-cyan-500 via-indigo-600 to-indigo-700 hover:shadow-[0_0_25px_rgba(79,70,229,0.3)] active:scale-95'
              }`}
          >
            {isLoading ? 'Memproses...' : 'Daftarkan Admin'}
          </button>
        </form>

        <div className="mt-8 text-center border-t border-gray-100 pt-6">
          <p className="text-sm font-medium text-gray-500">
            Sudah memiliki akses?{' '}
            <Link 
              href="/admin-login" 
              className="text-indigo-600 font-semibold hover:text-cyan-600 transition-colors"
            >
              Masuk Sistem
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}