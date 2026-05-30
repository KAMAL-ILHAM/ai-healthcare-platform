'use client';

import { motion } from 'framer-motion';
import { Activity, Sparkles, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import RegisterForm from '@/components/auth/RegisterForm';

export default function RegisterPage() {
  return (
    <main className="min-h-screen flex flex-col lg:flex-row bg-[#FAFAFA] relative overflow-hidden">
      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div 
          animate={{ x: [0, -50, 0], y: [0, 50, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-400/20 blur-[120px] rounded-full" 
        />
        <motion.div 
          animate={{ x: [0, 30, 0], y: [0, -40, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[20%] -left-[10%] w-[40%] h-[40%] bg-cyan-500/20 blur-[120px] rounded-full" 
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      {/* LEFT SIDE */}
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-100 text-cyan-700 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              <span>Bergabunglah Bersama Kami</span>
            </div>
            <h1 className="text-5xl font-extrabold text-gray-900 leading-[1.1] tracking-tight mb-6">
              Start Your Journey with <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-indigo-600 italic pr-2">Intelligent</span> 
              <span className="italic pr-2">Healthcare.</span>
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed">
              Buat akun dalam hitungan detik dan rasakan ekosistem layanan kesehatan yang didukung penuh oleh teknologi AI terkini.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }}
            className="mt-12 flex items-center gap-4 text-sm text-gray-500 font-medium"
          >
            <ShieldCheck className="w-5 h-5 text-indigo-500" />
            <span>Data Anda aman sepenuhnya di cloud kami</span>
          </motion.div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex-1 flex items-center justify-center z-10 p-6 lg:p-12">
        <RegisterForm />
      </div>
    </main>
  );
}