'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Bot, Activity, ShieldCheck, Heart, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function FinalCtaSection() {
  return (
    <section className="py-12 bg-white relative overflow-hidden">
      
      {/* 1. BACKGROUND GLOW SYSTEM */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Orbs Besar */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[160px] animate-pulse" />
        <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-400/10 rounded-full blur-[140px] animate-float-slow" />
        
        {/* Thin Grid Accent */}
        <div className="absolute inset-0 bg-pattern-grid opacity-30" />
      </div>

      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        
        {/* 2. FLOATING HEALTHCARE ICONS (De-synchronized Animation) */}
        <div className="absolute inset-0 pointer-events-none hidden lg:block">
          <motion.div 
            animate={{ y: [-20, 20, -20], x: [-10, 10, -10], rotate: [0, 10, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-2 left-10 w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center border border-gray-100"
          >
            <Bot className="w-8 h-8 text-primary" />
          </motion.div>
          <motion.div 
            animate={{ y: [20, -20, 20], x: [10, -10, 10], rotate: [0, -10, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-20 left-20 w-14 h-14 bg-white rounded-2xl shadow-xl flex items-center justify-center border border-gray-100"
          >
            <Activity className="w-7 h-7 text-cyan-500" />
          </motion.div>
          <motion.div 
            animate={{ y: [-15, 15, -15], x: [15, -15, 15] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-5 right-10 w-14 h-14 bg-white rounded-2xl shadow-xl flex items-center justify-center border border-gray-100"
          >
            <ShieldCheck className="w-7 h-7 text-emerald-500" />
          </motion.div>
          <motion.div 
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-10 right-20 w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center border border-gray-100"
          >
            <Heart className="w-8 h-8 text-red-400 fill-red-400/10" />
          </motion.div>
        </div>

        {/* 3. CONTENT CONTAINER */}
        <div className="relative z-20 flex flex-col items-center text-center">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-100 shadow-sm mb-10"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-bold text-gray-800 tracking-widest font-satoshi uppercase">Mulai Transformasi Sekarang</span>
          </motion.div>

          {/* GIANT TYPOGRAPHY */}
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-[5.5rem] font-extrabold text-gray-900 mb-8 font-satoshi tracking-tight leading-[1.1]"
          >
            Kesehatan Masa Depan <br />
            Dalam <span className="italic font-light text-gradient-premium leading-none">Genggaman Anda.</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-lg md:text-xl text-gray-500 font-inter max-w-2xl mb-12 leading-relaxed"
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
            <div className="absolute inset-0 bg-primary/40 rounded-full blur-2xl animate-pulse scale-110" />
            
            <Link href="/register">
              <motion.button 
                whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 0 40px rgba(79,70,229,0.4)"
                  }}
                whileTap={{ scale: 0.95 }}
                className="relative z-10 px-12 py-5 rounded-full bg-gray-900 text-white font-bold text-xl flex items-center gap-3 shadow-2xl transition-all group overflow-hidden"
              >
                {/* Button Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                
                Dapatkan Akses Gratis
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="mt-8 text-sm font-bold text-gray-400 font-satoshi uppercase tracking-[0.2em]"
          >
            No credit card required • HIPAA Compliant • 24/7 Support
          </motion.p>

        </div>
      </div>

    </section>
  );
}