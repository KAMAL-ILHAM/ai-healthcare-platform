'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Bot, Activity, ShieldCheck, Heart, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function FinalCtaSection() {
  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden">
      
      {/* 1. BACKGROUND GLOW SYSTEM */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Orbs Besar - Diperkecil sedikit di mobile agar tidak terlalu dominan */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-primary/10 rounded-full blur-[100px] md:blur-[160px] animate-pulse" />
        <div className="absolute top-1/2 left-1/2 md:left-1/3 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-cyan-400/10 rounded-full blur-[90px] md:blur-[140px] animate-float-slow" />
        
        {/* Thin Grid Accent */}
        <div className="absolute inset-0 bg-pattern-grid opacity-30" />
      </div>

      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        
        {/* 2. FLOATING HEALTHCARE ICONS (Sekarang muncul di semua perangkat) */}
        {/* Menggunakan opacity-60 di mobile agar teks utama tetap terbaca jelas jika tertumpuk, full opacity di desktop */}
        <div className="absolute inset-0 pointer-events-none opacity-60 md:opacity-100 z-0">
          <motion.div 
            animate={{ y: [-15, 15, -15], x: [-5, 5, -5], rotate: [0, 10, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-4 left-0 md:top-2 md:left-10 w-10 h-10 md:w-16 md:h-16 bg-white/80 md:bg-white backdrop-blur-sm rounded-xl md:rounded-2xl shadow-lg md:shadow-xl flex items-center justify-center border border-gray-100/50 md:border-gray-100"
          >
            <Bot className="w-5 h-5 md:w-8 md:h-8 text-primary" />
          </motion.div>
          
          <motion.div 
            animate={{ y: [15, -15, 15], x: [5, -5, 5], rotate: [0, -10, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-32 left-2 md:bottom-20 md:left-20 w-8 h-8 md:w-14 md:h-14 bg-white/80 md:bg-white backdrop-blur-sm rounded-lg md:rounded-2xl shadow-lg md:shadow-xl flex items-center justify-center border border-gray-100/50 md:border-gray-100"
          >
            <Activity className="w-4 h-4 md:w-7 md:h-7 text-cyan-500" />
          </motion.div>
          
          <motion.div 
            animate={{ y: [-10, 10, -10], x: [10, -10, 10] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-10 right-0 md:top-5 md:right-10 w-10 h-10 md:w-14 md:h-14 bg-white/80 md:bg-white backdrop-blur-sm rounded-xl md:rounded-2xl shadow-lg md:shadow-xl flex items-center justify-center border border-gray-100/50 md:border-gray-100"
          >
            <ShieldCheck className="w-5 h-5 md:w-7 md:h-7 text-emerald-500" />
          </motion.div>
          
          <motion.div 
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-16 right-0 md:bottom-10 md:right-20 w-12 h-12 md:w-16 md:h-16 bg-white/80 md:bg-white backdrop-blur-sm rounded-xl md:rounded-2xl shadow-lg md:shadow-xl flex items-center justify-center border border-gray-100/50 md:border-gray-100"
          >
            <Heart className="w-6 h-6 md:w-8 md:h-8 text-red-400 fill-red-400/10" />
          </motion.div>
        </div>

        {/* 3. CONTENT CONTAINER */}
        <div className="relative z-20 flex flex-col items-center text-center mt-8 md:mt-0">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-white border border-gray-100 shadow-sm mb-6 md:mb-10"
          >
            <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary" />
            <span className="text-xs md:text-sm font-bold text-gray-800 tracking-widest font-satoshi uppercase">Mulai Transformasi Sekarang</span>
          </motion.div>

          {/* GIANT TYPOGRAPHY - Disesuaikan agar muat di layar mobile tanpa terpotong */}
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl md:text-[5.5rem] font-extrabold text-gray-900 mb-6 md:mb-8 font-satoshi tracking-tight leading-[1.1]"
          >
            Kesehatan Masa Depan <br className="hidden sm:block" />
            Dalam <span className="italic font-light text-gradient-cyan-indigo">Genggaman Anda.</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-base md:text-lg lg:text-xl text-gray-500 font-inter max-w-2xl mb-10 md:mb-12 leading-relaxed px-2 md:px-0"
          >
            Bergabunglah dengan ribuan pengguna yang telah mempercayakan <span className="text-gray-900 font-bold">EIOHealth</span> untuk panduan medis berbasis AI yang cerdas dan cepat.
          </motion.p>

          {/* LARGE GLOWING BUTTON */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="relative"
          >
            {/* Pulse Animation behind the button */}
            <div className="absolute inset-0 bg-primary/40 rounded-full blur-xl md:blur-2xl animate-pulse md:scale-110" />
            
            <Link href="/register">
              <motion.button 
                whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 0 40px rgba(79,70,229,0.4)"
                  }}
                whileTap={{ scale: 0.95 }}
                className="relative z-10 px-8 py-4 md:px-12 md:py-5 rounded-full bg-gray-900 text-white font-bold text-lg md:text-xl flex items-center gap-2 md:gap-3 shadow-2xl transition-all group overflow-hidden"
              >
                {/* Button Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                
                Dapatkan Akses Gratis
                <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="mt-8 text-[10px] sm:text-xs md:text-sm font-bold text-gray-400 font-satoshi uppercase tracking-[0.1em] md:tracking-[0.2em] px-4"
          >
            No credit card required • HIPAA Compliant • 24/7 Support
          </motion.p>

        </div>
      </div>

    </section>
  );
}