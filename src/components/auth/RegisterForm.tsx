'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // State untuk menangkap inputan
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // State untuk notifikasi (Sukses / Error)
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const strength = Math.min(password.length / 10, 1) * 100;
  const strengthColor = strength < 40 ? 'bg-rose-400' : strength < 80 ? 'bg-amber-400' : 'bg-emerald-500';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Gagal mendaftar");
      }

      setSuccessMessage("Akun berhasil dibuat! Silakan masuk.");
      setName('');
      setEmail('');
      setPassword('');

    } catch (error: any) {
      setErrorMessage(error.message);
    } finally {
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
      <div  className="bg-[rgba(255,255,255,0.65)] backdrop-blur-xl border border-white/60 p-8 sm:p-10 rounded-[32px] shadow-[0_8px_32px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_48px_rgba(6,182,212,0.1)] transition-shadow duration-500">
        
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Create Account</h2>
          <p className="text-sm text-gray-500 mt-2">Daftar untuk memulai</p>
        </div>

        {/* Menampilkan pesan Sukses atau Error di sini */}
        {errorMessage && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-100 text-sm text-red-600 text-center font-medium">
            {errorMessage}
          </div>
        )}
        {successMessage && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-100 text-sm text-emerald-600 text-center font-medium">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide ml-1">Nama Lengkap</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400 group-focus-within:text-cyan-600 transition-colors" />
              </div>
              <input
                type="text" required placeholder="Kamal Ilham"
                value={name} onChange={(e) => setName(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white/40 border border-white/60 rounded-xl text-sm focus:outline-none focus:bg-white/80 focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500 transition-all placeholder:text-gray-400 text-gray-900 font-medium shadow-sm"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide ml-1">Email</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-cyan-600 transition-colors" />
              </div>
              <input
                type="email" required placeholder="pharmacist@eiohealth.com"
                value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white/40 border border-white/60 rounded-xl text-sm focus:outline-none focus:bg-white/80 focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500 transition-all placeholder:text-gray-400 text-gray-900 font-medium shadow-sm"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide ml-1">Password</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-cyan-600 transition-colors" />
              </div>
              <input
                type={showPassword ? "text" : "password"} required placeholder="Min. 8 karakter"
                value={password} onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-12 py-3 bg-white/40 border border-white/60 rounded-xl text-sm focus:outline-none focus:bg-white/80 focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500 transition-all placeholder:text-gray-400 text-gray-900 font-medium shadow-sm"
              />
              <button
                type="button" onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-cyan-600 transition-colors"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {password.length > 0 && (
              <div className="h-1 w-full bg-gray-200 rounded-full mt-2 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }} animate={{ width: `${strength}%` }} 
                  className={`h-full ${strengthColor} transition-colors duration-300`} 
                />
              </div>
            )}
          </div>

          <button
            type="submit" disabled={isLoading}
            className="w-full group relative py-3.5 mt-4 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white text-sm font-bold flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_8px_24px_rgba(6,182,212,0.3)] active:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
              <>Daftar Sekarang <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600 font-medium">
          Sudah punya akun?{' '}
          <Link href="/login" className="text-cyan-600 hover:text-indigo-600 transition-colors">
            Masuk di sini
          </Link>
        </p>
      </div>
    </motion.div>
  );
}