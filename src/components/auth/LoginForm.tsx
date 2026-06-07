'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
// 🌟 Tambahkan 'Home' di import lucide-react
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2, Home } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Gagal login");
      }

      router.push('/dashboard');
      router.refresh(); 

    } catch (error: any) {
      setErrorMessage(error.message);
      setIsLoading(false); 
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      className="w-full max-w-[420px]"
    >
      {/* 🌟 Tambahkan class 'relative' di pembungkus kartu agar tombol Home bisa absolute di dalamnya */}
      <div className="relative bg-[rgba(255,255,255,0.65)] backdrop-blur-xl border border-white/60 p-8 sm:p-10 rounded-[32px] shadow-[0_8px_32px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_48px_rgba(79,70,229,0.1)] transition-shadow duration-500">
        
        {/* 🌟 Tombol Kembali ke Beranda (Landing Page) */}
        <Link 
          href="/" 
          className="absolute top-6 right-6 flex items-center justify-center w-10 h-10 bg-white/50 hover:bg-white border border-white shadow-sm hover:shadow-md text-gray-500 hover:text-indigo-600 rounded-full transition-all duration-300 z-10"
          title="Kembali ke Halaman Utama"
        >
          <Home className="w-4 h-4" />
        </Link>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Log in</h2>
          <p className="text-sm text-gray-500 mt-2">Masuk untuk melanjutkan ke EIOHealth</p>
        </div>

        {/* Notifikasi Error */}
        {errorMessage && (
          <div className="mb-6 p-3 rounded-xl bg-red-50 border border-red-100 text-sm text-red-600 text-center font-medium">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide ml-1">Email</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
              </div>
              <input
                type="email" required placeholder="user123@gmail.com"
                value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 bg-white/40 border border-white/60 rounded-xl text-sm focus:outline-none focus:bg-white/80 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all placeholder:text-gray-400 text-gray-900 font-medium shadow-sm"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between ml-1">
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Password</label>
              <Link href="/forgot-password" className="text-xs font-medium text-indigo-600 hover:text-indigo-700 transition-colors">
                Lupa?
              </Link>
            </div>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
              </div>
              <input
                type={showPassword ? "text" : "password"} required placeholder="••••••••"
                value={password} onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-12 py-3.5 bg-white/40 border border-white/60 rounded-xl text-sm focus:outline-none focus:bg-white/80 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all placeholder:text-gray-400 text-gray-900 font-medium shadow-sm"
              />
              <button
                type="button" onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-indigo-600 transition-colors"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit" disabled={isLoading}
            className="w-full group relative py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white text-sm font-bold flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_8px_24px_rgba(79,70,229,0.3)] active:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
              <>Masuk <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600 font-medium">
          Belum punya akun?{' '}
          <Link href="/register" className="text-indigo-600 hover:text-indigo-800 transition-colors">
            Daftar sekarang
          </Link>
        </p>
      </div>
    </motion.div>
  );
}