'use client';

import { motion } from 'framer-motion';
import { Bot, Activity, MapPin, Sparkles } from 'lucide-react';

const steps = [
  {
    number: "01",
    title: "Konsultasi AI",
    description: "Ceritakan keluhan Anda secara natural kepada asisten AI medis kami yang siaga 24/7.",
    icon: <Bot className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />,
    color: "text-primary",
    bgColor: "bg-indigo-50",
    glow: "shadow-[0_0_20px_rgba(79,70,229,0.15)] sm:shadow-[0_0_30px_rgba(79,70,229,0.2)]"
  },
  {
    number: "02",
    title: "Analisis Gejala",
    description: "Sistem memproses data Anda untuk memberikan indikasi medis awal dan tingkat keparahan.",
    icon: <Activity className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-500" />,
    color: "text-cyan-500",
    bgColor: "bg-cyan-50",
    glow: "shadow-[0_0_20px_rgba(6,182,212,0.15)] sm:shadow-[0_0_30px_rgba(6,182,212,0.2)]"
  },
  {
    number: "03",
    title: "Rekomendasi Fasilitas",
    description: "Dapatkan panduan ke apotek atau rumah sakit terdekat sesuai dengan diagnosis awal Anda.",
    icon: <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-500" />,
    color: "text-emerald-500",
    bgColor: "bg-emerald-50",
    glow: "shadow-[0_0_20px_rgba(16,185,129,0.15)] sm:shadow-[0_0_30px_rgba(16,185,129,0.2)]"
  }
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-16 sm:py-20 md:py-24 bg-[#FAFCFF] relative overflow-hidden z-10">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full bg-pattern-grid opacity-40 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md sm:max-w-2xl h-48 sm:h-64 bg-primary/5 rounded-full blur-[80px] sm:blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 max-w-6xl relative z-10">
        
        {/* HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20 md:mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white border border-gray-100 shadow-sm mb-4 sm:mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-500" />
            <span className="text-xs sm:text-sm font-bold text-gray-800 tracking-wide font-satoshi uppercase">Alur Penggunaan</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 font-satoshi tracking-tight leading-tight"
          >
            Cara Kerja <span className="italic font-light text-gradient-cyan-indigo">EIOHealth.</span>
          </motion.h2>
        </div>

        {/* WORKFLOW STEPS */}
        <div className="relative">
          
          {/* Animated Connected Line (Desktop - Horizontal) */}
          <div className="hidden md:block absolute top-12 lg:top-16 left-[15%] right-[15%] h-0.5 bg-gray-200 rounded-full z-0">
            <motion.div 
              initial={{ width: "0%" }} whileInView={{ width: "100%" }} viewport={{ once: true }} transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
              className="h-full bg-gradient-to-r from-primary via-cyan-400 to-emerald-400 rounded-full" 
            />
          </div>

          {/* Animated Connected Line (Mobile - Vertical) */}
          <div className="absolute block md:hidden top-[10%] bottom-[10%] left-1/2 -translate-x-1/2 w-0.5 bg-gray-200 rounded-full z-0">
            <motion.div 
              initial={{ height: "0%" }} whileInView={{ height: "100%" }} viewport={{ once: true }} transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
              className="w-full bg-gradient-to-b from-primary via-cyan-400 to-emerald-400 rounded-full" 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 sm:gap-16 md:gap-8 relative z-10">
            {steps.map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.3, duration: 0.6 }}
                className="relative flex flex-col items-center text-center group"
              >
                {/* Number Glow Circle & Icon */}
                <div className="relative mb-6 sm:mb-8">
                  <div className={`w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-white border-4 border-[#FAFCFF] shadow-xl flex items-center justify-center relative z-10 transition-transform duration-500 group-hover:scale-110 ${step.glow}`}>
                    <span className={`absolute -top-2 -right-2 sm:-top-3 sm:-right-3 text-xs sm:text-sm font-black ${step.color} bg-white px-2 py-1 rounded-lg shadow-sm border border-gray-100`}>
                      {step.number}
                    </span>
                    <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl ${step.bgColor} flex items-center justify-center`}>
                      {step.icon}
                    </div>
                  </div>
                </div>

                {/* Glass Card Content */}
                <div className="bg-white/60 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-white shadow-[0_10px_30px_rgba(0,0,0,0.03)] w-full max-w-sm mx-auto group-hover:border-gray-100 transition-colors">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 font-satoshi mb-2 sm:mb-3">{step.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-500 font-inter leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}