'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Bot, Users, Star, ShieldCheck, HeartPulse, Activity } from 'lucide-react';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-start pt-28 md:pt-40 overflow-hidden bg-[#FAFCFF]">
      
      {/* 1. Cinematic Background Elements */}
      <div className="absolute inset-0 bg-pattern-grid pointer-events-none opacity-60" />
      <div className="absolute top-0 left-0 right-0 h-[80vh] bg-[radial-gradient(ellipse_at_top,#ffffff_0%,transparent_80%)] pointer-events-none" />
      
      {/* Glowing Orbs for that "AI Startup" Vibe */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] left-[15%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-primary/10 rounded-full blur-[100px] md:blur-[120px] mix-blend-multiply animate-float-blob" />
        <div className="absolute top-[20%] right-[10%] w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-cyan-400/10 rounded-full blur-[120px] md:blur-[150px] mix-blend-multiply animate-float-blob" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-[20%] left-[50%] -translate-x-1/2 w-[500px] md:w-[800px] h-[300px] md:h-[400px] bg-indigo-500/5 rounded-full blur-[120px] md:blur-[150px] mix-blend-multiply" />
      </div>

      {/* 🌟 2. FLOATING ICONS (NGAMBANG) */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        
        {/* Ikon Kiri Atas */}
        {/* 🌟 PERBAIKAN: Padding diperkecil di HP (p-2), teks disembunyikan (hidden md:block) */}
        <motion.div 
          animate={{ y: [-10, 10, -10] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] left-[2%] md:top-[25%] md:left-[10%] xl:left-[15%] bg-white/80 backdrop-blur-md p-2 md:p-4 rounded-xl md:rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-white flex flex-col items-center gap-1.5 md:gap-2 rotate-[-5deg]"
        >
          <div className="w-8 h-8 md:w-10 md:h-10 bg-cyan-50 rounded-full flex items-center justify-center shrink-0">
            <ShieldCheck className="w-4 h-4 md:w-5 md:h-5 text-cyan-500" />
          </div>
          <span className="hidden md:block text-[10px] font-bold text-slate-500 tracking-wider">Aman 100%</span>
        </motion.div>

        {/* Ikon Kanan Atas */}
        <motion.div 
          animate={{ y: [10, -10, 10] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[18%] right-[2%] md:top-[20%] md:right-[8%] xl:right-[12%] bg-white/80 backdrop-blur-md p-2 md:p-3 rounded-full md:rounded-[32px] shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-white flex items-center gap-2 md:gap-3 rotate-[5deg]"
        >
          <div className="w-8 h-8 md:w-10 md:h-10 bg-rose-50 rounded-full flex items-center justify-center shrink-0">
            <HeartPulse className="w-4 h-4 md:w-5 md:h-5 text-rose-500" />
          </div>
          <span className="hidden md:block text-[11px] font-bold text-slate-700 pr-2 leading-tight">Cek Gejala<br/>Instan</span>
        </motion.div>

        {/* Ikon Kiri Bawah */}
        <motion.div 
          animate={{ y: [-8, 15, -8], rotate: [0, -5, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[25%] left-[2%] md:bottom-[30%] md:left-[8%] xl:left-[12%] bg-white/80 backdrop-blur-md p-2 md:px-5 md:py-3 rounded-xl md:rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-white flex items-center justify-center gap-2 md:gap-3"
        >
          {/* Di HP tampilkan Ikon Activity, di Laptop tampilkan titik hijau berkedip */}
          <div className="md:hidden w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center">
            <Activity className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="hidden md:block w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          <span className="hidden md:block text-xs font-bold text-slate-700">AI Online 24/7</span>
        </motion.div>

        {/* Ikon Kanan Bawah (Dari awal memang hanya ikon) */}
        <motion.div 
          animate={{ y: [8, -15, 8], rotate: [0, 5, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[28%] right-[5%] md:bottom-[25%] md:right-[10%] xl:right-[15%] w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-indigo-500 to-cyan-400 rounded-xl md:rounded-2xl shadow-[0_10px_40px_rgba(79,70,229,0.3)] border border-white/20 flex items-center justify-center rotate-12"
        >
          <Bot className="w-6 h-6 md:w-8 md:h-8 text-white" />
        </motion.div>
      </div>

      {/* 3. Main Content (Typography Hierarchy) */}
      <div className="relative z-20 container mx-auto px-4 md:px-6 text-center flex flex-col items-center mt-8 md:mt-0">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center w-full"
        >
          {/* Modern Badge */}
          <div className="inline-flex items-center gap-1.5 md:gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-white/60 backdrop-blur-xl border border-white/80 shadow-[0_2px_20px_rgba(0,0,0,0.04)] mb-6 md:mb-8 cursor-default">
            <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary" />
            <span className="text-[10px] md:text-sm font-bold text-gray-800 font-satoshi tracking-wide uppercase">AI-Powered Healthcare Ecosystem</span>
          </div>

          {/* Huge Typography */}
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-gray-900 mb-6 md:mb-8 max-w-5xl leading-[1.1] font-satoshi">
            Your <span className="italic font-light text-gradient-cyan-indigo">Intelligent</span> <br />
            Health Assistant.
          </h1>

          <p className="text-sm sm:text-base md:text-xl text-gray-500 mb-8 md:mb-10 max-w-2xl font-medium leading-relaxed font-inter px-4">
            Edukasi medis terpercaya, konsultasi AI responsif, dan rekomendasi apotek terdekat dalam satu platform <span className="text-primary font-semibold italic">futuristik</span>.
          </p>

          {/* CTA Button (Tunggal & Redirect ke /login) */}
          <div className="mb-12 md:mb-16 z-30">
            <Link href="/login" className="block">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3.5 md:px-8 md:py-4 rounded-full bg-gray-900 hover:bg-transparent text-white font-bold flex items-center justify-center gap-2.5 md:gap-3 shadow-[0_8px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_8px_30px_rgba(79,70,229,0.3)] font-satoshi text-base md:text-lg group relative overflow-hidden transition-all duration-300"
              >
                {/* Background Gradient Tersembunyi (Muncul saat Hover) */}
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />
                
                {/* Konten Tombol */}
                <span className="relative z-10 flex items-center gap-2.5 md:gap-3">
                  <Bot className="w-4 h-4 md:w-5 md:h-5 text-cyan-400 group-hover:text-white transition-colors" />
                  Mulai Konsultasi AI
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.button>
            </Link>
          </div>

          {/* Trust Indicator */}
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
            className="flex items-center gap-3 md:gap-4 mb-20 px-4"
          >
            <div className="flex -space-x-2 md:-space-x-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-white bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center shadow-sm">
                  <Users className="w-3.5 h-3.5 md:w-4 md:h-4 text-gray-400" />
                </div>
              ))}
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 md:w-4 md:h-4 fill-amber-400 text-amber-400" />)}
              </div>
              <div className="text-[11px] md:text-sm font-medium text-gray-500 font-inter mt-0.5">
                Dipercaya oleh <strong className="text-gray-900">10,000+</strong> pasien
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Seamless Fade-out Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white to-transparent pointer-events-none z-40" />
    </section>
  );
}