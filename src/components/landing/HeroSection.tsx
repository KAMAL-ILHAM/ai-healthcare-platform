'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, ShieldCheck, MapPin, Bot, Activity, LineChart, Heart, Star, Users } from 'lucide-react';

export default function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-start pt-32 md:pt-40 overflow-hidden bg-[#FAFCFF]">
      
      {/* 1. Cinematic Background Elements */}
      <div className="absolute inset-0 bg-pattern-grid pointer-events-none opacity-60" />
      <div className="absolute top-0 left-0 right-0 h-[80vh] bg-[radial-gradient(ellipse_at_top,#ffffff_0%,transparent_80%)] pointer-events-none" />
      
      {/* Glowing Orbs for that "AI Startup" Vibe */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] left-[15%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] mix-blend-multiply animate-float-blob" />
        <div className="absolute top-[20%] right-[10%] w-[600px] h-[600px] bg-cyan-400/10 rounded-full blur-[150px] mix-blend-multiply animate-float-blob" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-[20%] left-[50%] -translate-x-1/2 w-[800px] h-[400px] bg-indigo-500/5 rounded-full blur-[150px] mix-blend-multiply" />
      </div>

      {/* 2. Main Content (Typography Hierarchy) */}
      <div className="relative z-10 container mx-auto px-6 text-center flex flex-col items-center">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center w-full"
        >
          {/* Modern Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-xl border border-white/80 shadow-[0_2px_20px_rgba(0,0,0,0.04)] mb-8 hover:shadow-md transition-all cursor-default">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-bold text-gray-800 font-satoshi tracking-wide uppercase">AI-Powered Healthcare Ecosystem</span>
          </div>

          {/* Huge Typography */}
          <h1 className="text-6xl md:text-[6rem] font-extrabold tracking-tighter text-gray-900 mb-8 max-w-5xl leading-[1.05] font-satoshi">
            Your <span className="italic font-light text-gradient-cyan-indigo">Intelligent</span> <br />
            Health Assistant.
          </h1>

          <p className="text-lg md:text-xl text-gray-500 mb-10 max-w-2xl font-medium leading-relaxed font-inter">
            Edukasi medis terpercaya, konsultasi AI responsif, dan rekomendasi apotek terdekat dalam satu platform <span className="text-primary font-semibold italic">futuristik</span>.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8 z-20">
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 rounded-full bg-gray-900 text-white font-bold flex items-center justify-center gap-3 shadow-[0_8px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_8px_30px_rgba(79,70,229,0.3)] transition-all font-satoshi text-lg group"
            >
              <Bot className="w-5 h-5 text-cyan-400" />
              Mulai Konsultasi AI
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 rounded-full bg-white/60 backdrop-blur-xl border border-white/80 text-gray-900 font-bold flex items-center justify-center gap-3 hover:bg-white transition-all font-satoshi text-lg shadow-sm"
            >
              <MapPin className="w-5 h-5 text-gray-500" />
              Cari Faskes Terdekat
            </motion.button>
          </div>

          {/* Trust Indicator */}
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
            className="flex items-center gap-4 mb-20"
          >
            <div className="flex -space-x-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center shadow-sm">
                  <Users className="w-4 h-4 text-gray-400" />
                </div>
              ))}
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
              </div>
              <div className="text-sm font-medium text-gray-500 font-inter mt-0.5">
                Dipercaya oleh <strong className="text-gray-900">10,000+</strong> pasien
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* 3. The "Startup Showcase" Layered Mockup */}
        <div className="relative w-full max-w-5xl h-[600px] mt-10">
          
          {/* Main Dashboard Preview (Center) */}
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-1/2 -translate-x-1/2 w-full h-[520px] rounded-[2rem] bg-white/60 backdrop-blur-3xl border border-white/80 shadow-[0_40px_100px_rgba(0,0,0,0.08)] z-10 flex flex-col overflow-hidden"
          >
            {/* Window Header */}
            <div className="h-14 border-b border-gray-100/50 flex items-center px-6 justify-between bg-white/50">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="text-xs font-bold tracking-wider text-gray-400 uppercase flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500" /> AI Pharmacist Assistant
              </div>
              <div className="w-16" />
            </div>

            {/* AI Chat Interface */}
            <div className="flex-1 p-6 md:px-24 md:py-10 flex flex-col gap-6 bg-gradient-to-b from-white/30 to-white/10 overflow-hidden">
              
              <div className="self-end bg-gray-900 text-white p-4 md:p-5 rounded-2xl rounded-tr-sm shadow-md max-w-[85%] md:max-w-[70%] font-inter text-sm md:text-base">
                Saya diresepkan antibiotik Amoxicillin, tapi saya juga sedang rutin minum antasida untuk lambung. Apakah boleh diminum bersamaan?
              </div>
              
              <div className="self-start flex gap-3 md:gap-4 max-w-[95%] md:max-w-[85%] relative z-10">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-cyan-500 flex items-center justify-center shrink-0 shadow-lg">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                
                <div className="bg-white border border-gray-100 text-gray-700 p-5 md:p-6 rounded-2xl rounded-tl-sm shadow-sm font-inter text-sm md:text-base leading-relaxed">
                  <p className="mb-4">Sebaiknya <strong className="text-gray-900 text-primary">jangan diminum bersamaan</strong>. Antasida mengandung magnesium/aluminium yang dapat mengikat antibiotik di lambung, sehingga penyerapan Amoxicillin menjadi tidak maksimal.</p>
                  
                  <div className="flex items-start gap-3 p-4 bg-primary/5 rounded-xl border border-primary/10">
                    <Activity className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-gray-900 text-sm mb-1">Rekomendasi Farmasi:</div>
                      <div className="text-gray-600 text-sm">Beri jeda minimal <strong>2 jam</strong> antara minum antasida dan antibiotik. Pastikan Amoxicillin dihabiskan sesuai resep dokter.</div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>

          {/* Floating UI Card 1: Vital Sign (PINDAH KE KIRI) */}
          <motion.div 
            animate={{ y: [-5, 5, -5] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute top-[70%] -left-4 md:-left-12 lg:-left-16 w-52 rounded-2xl bg-white backdrop-blur-xl border border-gray-100 shadow-[0_15px_40px_rgba(0,0,0,0.08)] p-4 z-30 hidden md:flex items-center gap-4"
          >
            <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center shrink-0">
              <Heart className="w-5 h-5 text-red-500 animate-pulse" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Detak Jantung</div>
              <div className="font-bold text-gray-900 font-satoshi">72 <span className="text-xs text-gray-500 font-normal">bpm</span></div>
            </div>
          </motion.div>

          {/* Floating UI Card 2: Analytics Preview (TETAP DI KANAN BAWAH) */}
          <motion.div 
            animate={{ y: [10, -10, 10] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-[20%] -right-4 md:-right-12 lg:-right-16 w-56 rounded-3xl bg-white/90 backdrop-blur-xl border border-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-5 z-30 hidden md:block"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-xl bg-cyan-50 flex items-center justify-center border border-cyan-100">
                <LineChart className="w-5 h-5 text-cyan-600" />
              </div>
              <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">Health Score</span>
            </div>
            <div className="flex items-end gap-1.5 h-16 mb-2">
              {[40, 60, 45, 80, 55, 90, 75].map((height, i) => (
                <div key={i} className="flex-1 bg-gradient-to-t from-cyan-500 to-cyan-300 rounded-sm" style={{ height: `${height}%` }} />
              ))}
            </div>
            <div className="font-extrabold text-3xl text-gray-900 font-satoshi">
              92<span className="text-sm font-medium text-gray-500 ml-1">/100</span>
            </div>
            <div className="text-xs text-emerald-500 font-medium mt-1">↑ 12% dari minggu lalu</div>
          </motion.div>

          {/* Floating UI Card 3: Maps Preview (PINDAH KE KANAN ATAS) */}
          <motion.div 
            animate={{ y: [-10, 10, -10] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-45 right-4 lg:-right-12 w-64 rounded-3xl bg-white/90 backdrop-blur-xl border border-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-4 z-30 hidden md:block"
          >
            <div className="w-full h-32 rounded-2xl bg-blue-50/50 border border-blue-100/50 relative overflow-hidden mb-4 flex items-center justify-center">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:10px_10px]" />
              <div className="relative w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center animate-pulse">
                <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center shadow-lg">
                  <MapPin className="w-3 h-3" />
                </div>
              </div>
            </div>
            <h4 className="font-bold text-gray-900 font-satoshi text-sm mb-1">Apotek Terdekat</h4>
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-500 font-inter">Kimia Farma Jl. Merdeka</span>
              <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">Buka</span>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Seamless Fade-out Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white to-transparent pointer-events-none z-40" />
    </section>
  );
}