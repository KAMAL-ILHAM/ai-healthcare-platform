'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Stethoscope, MapPin, Activity, Bot, HeartPulse } from 'lucide-react';
export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-start pt-32 md:pt-48 overflow-hidden bg-ambient-glow bg-soft-depth">
      
      {/* Pattern Kotak-Kotak Transparansi 40% Warna Biru (Grid Overlay) */}
      <div className="absolute inset-0 bg-pattern-grid pointer-events-none" />

      {/* Floating Gradient Blobs (Animated) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div 
          className="absolute top-[15%] left-[20%] w-[400px] h-[400px] bg-primary/20 rounded-full blur-[100px] mix-blend-multiply opacity-60 animate-float-blob" 
          initial={{ x: 0, y: 0 }}
        />
        <motion.div 
          className="absolute top-[25%] right-[15%] w-[450px] h-[450px] bg-cyan/20 rounded-full blur-[120px] mix-blend-multiply opacity-50 animate-float-blob" 
          initial={{ x: 0, y: 0, scale: 0.9 }}
          transition={{ delay: 1 }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/40 backdrop-blur-xl border border-white/60 shadow-[0_2px_10px_rgb(0,0,0,0.05)] mb-8">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-bold text-gray-800 tracking-wide font-satoshi">AI-Powered Healthcare Ecosystem</span>
          </div>

          {/* Heading Besar dan Bold dengan Satoshi Font (Perbaiki Spacing) */}
          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter text-gray-900 mb-8 max-w-5xl leading-[1.1] font-satoshi">
            Your <span className="italic font-light text-gradient-cyan-indigo">Intelligent</span> <br />
            Health Assistant.
          </h1>

          {/* Subtitle Readable dan Spacing Nyaman */}
          <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl font-medium leading-relaxed font-inter">
            Edukasi medis <span className="italic font-light text-primary">terpercaya</span>, konsultasi AI responsif, dan rekomendasi fasilitas kesehatan terdekat dalam satu platform <span className="italic font-light text-primary">futuristik</span>.
          </p>

          {/* Button Gradient Modern dengan Efek Glow Cyan */}
          <div className="flex flex-col sm:flex-row gap-5 mb-24">
            <motion.button 
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-full bg-primary text-white font-bold flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(79,70,229,0.3)] hover:shadow-[0_10px_40px_rgba(79,70,229,0.4)] hover:shadow-cyan hover:-translate-y-0.5 transition-all duration-300 font-satoshi"
            >
              <Stethoscope className="w-5 h-5" />
              Mulai Konsultasi
              <ArrowRight className="w-4 h-4" />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-full bg-white backdrop-blur-lg text-gray-900 font-bold border border-white/60 flex items-center justify-center gap-3 shadow-premium hover:bg-gray-50 hover:shadow-md transition-all duration-300 font-satoshi"
            >
              <MapPin className="w-5 h-5 text-gray-500" />
              Cari Apotek Terdekat
            </motion.button>
          </div>
        </motion.div>

        {/* Card Glassmorphism (Interactive Dashboard UI Start Here) */}
        {/* Card Glassmorphism (Interactive Dashboard UI) */}
        <motion.div 
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-5xl mx-auto h-[400px] md:h-[500px] rounded-[2.5rem] bg-white/30 backdrop-blur-2xl border border-white/60 shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-2 md:p-4"
        >
          <div className="w-full h-full rounded-[2rem] bg-gradient-to-br from-white/80 to-white/40 border border-white/80 shadow-inner flex flex-col overflow-hidden relative">
            
            {/* Top Window Bar (MacOS Style) */}
            <div className="h-12 bg-white/50 border-b border-white/60 flex items-center px-4 gap-4 backdrop-blur-sm">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <div className="flex-1 flex justify-center">
                <div className="text-xs font-semibold text-gray-500 font-satoshi flex items-center gap-2 bg-white/60 px-3 py-1 rounded-full shadow-sm">
                  <Bot className="w-3.5 h-3.5 text-primary" />
                  AI Consultation Active
                </div>
              </div>
            </div>

            {/* Dashboard Content */}
            <div className="flex-1 p-4 md:p-6 flex gap-6">
              
              {/* Left: Chat Interface Simulation */}
              <div className="flex-1 flex flex-col gap-5 justify-center">
                {/* User Message */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.2, duration: 0.5 }} 
                  className="self-end bg-gradient-to-r from-primary to-indigo-600 text-white text-sm md:text-base px-5 py-3.5 rounded-2xl rounded-tr-sm shadow-md max-w-[85%] font-inter"
                >
                  Saya merasa demam tinggi dan nyeri sendi sejak kemarin. Apa yang harus saya lakukan?
                </motion.div>

                {/* AI Response */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 2, duration: 0.5 }} 
                  className="self-start flex gap-3 max-w-[95%] md:max-w-[85%]"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan to-blue-500 flex items-center justify-center shrink-0 shadow-sm mt-1">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-white border border-gray-100 text-gray-700 text-sm md:text-base px-5 py-4 rounded-2xl rounded-tl-sm shadow-sm font-inter">
                    <p className="mb-3 leading-relaxed">Berdasarkan gejala demam dan nyeri sendi, ini bisa menjadi indikasi infeksi virus. Pastikan Anda menjaga hidrasi tubuh dengan baik.</p>
                    <div className="bg-blue-50/50 p-3 rounded-xl border border-blue-100">
                      <p className="font-semibold text-primary mb-1 text-sm">Rekomendasi Farmasi:</p>
                      <p className="text-gray-600 text-sm">Anda dapat berkonsultasi lebih lanjut untuk mendapatkan pereda nyeri atau antipiretik yang tepat. Apotek terdekat beroperasi hingga pukul 22:00.</p>
                    </div>
                  </div>
                </motion.div>
              </div>

              

              {/* Right: Floating Widgets (Hidden on mobile) */}
              <div className="hidden md:flex w-1/3 flex-col gap-4 justify-center">
                {/* Widget 1 */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.5 }} 
                  className="bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-white shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center border border-red-100">
                    <HeartPulse className="w-6 h-6 text-red-500 animate-pulse" />
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">Status Gejala</div>
                    <div className="font-extrabold text-gray-900 text-lg font-satoshi">Tingkat Sedang</div>
                  </div>
                </motion.div>

                {/* Widget 2 */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.8 }} 
                  className="bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-white shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 rounded-full bg-cyan-50 flex items-center justify-center border border-cyan-100">
                    <MapPin className="w-6 h-6 text-cyan-600" />
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">Fasilitas Medis</div>
                    <div className="font-extrabold text-gray-900 text-sm font-satoshi">3 Apotek Ditemukan</div>
                    <div className="text-xs text-primary font-medium mt-0.5">Jarak &lt; 2 km</div>
                  </div>
                </motion.div>
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}