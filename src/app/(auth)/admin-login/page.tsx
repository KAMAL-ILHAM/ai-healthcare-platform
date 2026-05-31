'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); 
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(''); 
    
    try {
      const response = await fetch('/api/auth/login-admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.error || 'Kredensial tidak valid. Silakan periksa kembali email dan kata sandi Anda.');
        setIsLoading(false);
        return;
      }

      console.log("Login sukses:", data.message);
      router.push('/dashboard/admin'); 

    } catch (error) {
      setErrorMessage('Terjadi kesalahan jaringan. Periksa koneksi Anda dan coba lagi.');
      setIsLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden bg-ambient-glow font-sans">
      
      <div className="absolute inset-0 bg-pattern-grid pointer-events-none"></div>

      <div 
        className="absolute top-[15%] left-[20%] w-72 h-72 bg-cyan-400/30 rounded-full blur-[80px] pointer-events-none mix-blend-multiply"
        style={{ animation: 'float-blob 8s ease-in-out infinite' }}
      ></div>
      <div 
        className="absolute bottom-[15%] right-[20%] w-80 h-80 bg-indigo-500/20 rounded-full blur-[80px] pointer-events-none mix-blend-multiply"
        style={{ animation: 'float-blob 10s ease-in-out infinite reverse' }}
      ></div>

      <div className="relative z-10 w-full max-w-[420px] p-10 bg-white/60 backdrop-blur-2xl border border-white/80 rounded-[2rem] shadow-premium">
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 shadow-glow-cyan mb-5">
            <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight mb-1">
            <span className="text-gradient-cyan-indigo">EIOHealth</span>
          </h1>
          <p className="text-sm font-semibold text-gray-500 tracking-widest uppercase mt-1">
            Admin Workspace
          </p>
        </div>

        {/* Notifikasi Error akan muncul di sini jika login gagal */}
        {errorMessage && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm font-medium text-center animate-in fade-in slide-in-from-top-2 duration-300">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="peer w-full px-5 py-4 bg-white/50 border border-gray-200/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all duration-300 text-gray-800 placeholder-transparent"
              placeholder="Alamat Email"
              required
            />
            <label className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 text-sm transition-all duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-3 peer-focus:text-xs peer-focus:text-cyan-600 peer-valid:top-3 peer-valid:text-xs font-medium bg-transparent pointer-events-none">
              Alamat Email
            </label>
          </div>

          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="peer w-full px-5 py-4 bg-white/50 border border-gray-200/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-300 text-gray-800 placeholder-transparent"
              placeholder="Kata Sandi"
              required
            />
            <label className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 text-sm transition-all duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-3 peer-focus:text-xs peer-focus:text-indigo-600 peer-valid:top-3 peer-valid:text-xs font-medium bg-transparent pointer-events-none">
              Kata Sandi
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-4 mt-4 rounded-xl text-white font-bold tracking-wide transition-all duration-300
              ${isLoading 
                ? 'bg-indigo-300 cursor-not-allowed' 
                : 'bg-gradient-to-r from-cyan-500 to-indigo-600 shadow-glow-cyan hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(79,70,229,0.5)] active:scale-[0.98]'
              }`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Memverifikasi...
              </span>
            ) : (
              'Masuk ke Sistem'
            )}
          </button>
        </form>
      </div>
    </main>
  );
}