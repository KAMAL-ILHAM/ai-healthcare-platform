'use client';

import { motion } from 'framer-motion';
import { Activity, Sparkles, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import LoginForm from '@/components/auth/LoginForm';

export default function LoginPage() {
  return (
    <main className="min-h-screen flex flex-col lg:flex-row bg-[#FAFAFA] relative overflow-hidden">
      {/* --- BACKGROUND EFFECTS --- */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Animated Glow Orbs */}
        <motion.div 
          animate={{ x: [0, 50, 0], y: [0, -50, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-cyan-400/20 blur-[120px] rounded-full" 
        />
        <motion.div 
          animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] bg-indigo-500/20 blur-[120px] rounded-full" 
        />
        {/* Futuristic Grid (Pure CSS) */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      {/* --- LEFT SIDE: BRANDING & TYPOGRAPHY --- */}
      <div className="hidden lg:flex flex-1 flex-col justify-between p-12 z-10 relative border-r border-white/50 bg-white/10 backdrop-blur-sm">
        <Link href="/" className="flex items-center gap-2 w-fit group">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <Activity className="text-white w-5 h-5" strokeWidth={2.5} />
          </div>
          <span className="text-xl font-bold text-gray-900 tracking-tight">EIOHealth</span>
        </Link>

        <div className="max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              <span>Platform Kesehatan Masa Depan</span>
            </div>
            <h1 className="text-5xl font-extrabold text-gray-900 leading-[1.1] tracking-tight mb-6">
              Welcome Back to Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500 italic pr-2">Intelligent</span> 
              <span className="italic pr-2">Health</span> Platform.
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed">
              Akses kembali dashboard personal Anda. Kami menggunakan kecerdasan buatan untuk mengoptimalkan manajemen fasilitas dan layanan kesehatan Anda secara real-time.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }}
            className="mt-12 flex items-center gap-4 text-sm text-gray-500 font-medium"
          >
            <ShieldCheck className="w-5 h-5 text-emerald-500" />
            <span>Enkripsi tingkat medis & HIPAA Compliant</span>
          </motion.div>
        </div>
      </div>

      {/* --- RIGHT SIDE: FORM CONTAINER --- */}
      <div className="flex-1 flex items-center justify-center z-10 p-6 lg:p-12">
        <LoginForm />
      </div>
    </main>
  );
}