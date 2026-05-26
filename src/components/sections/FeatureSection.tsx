'use client';

import { motion } from 'framer-motion';
import { MessageSquare, Map, FileText, Sparkles } from 'lucide-react';

const features = [
  {
    title: "AI Chatbot Responsif",
    description: "Konsultasi keluhan awal dengan asisten AI cerdas yang dilatih secara medis sebelum Anda mengunjungi dokter.",
    icon: <MessageSquare className="w-6 h-6 text-primary" />,
    illustration: (
      <div className="relative w-full h-full flex flex-col items-center justify-center p-4">
        <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 4, repeat: Infinity }} className="w-3/4 bg-white/80 backdrop-blur-sm p-3 rounded-2xl rounded-bl-none shadow-sm mb-3 relative z-10 border border-white/50">
          <div className="w-20 h-2 bg-gray-200 rounded-full mb-2" />
          <div className="w-32 h-2 bg-gray-100 rounded-full" />
        </motion.div>
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 4, repeat: Infinity, delay: 1 }} className="w-3/4 bg-primary/20 backdrop-blur-sm p-3 rounded-2xl rounded-br-none shadow-sm self-end relative z-10 border border-primary/30">
          <div className="w-24 h-2 bg-primary/40 rounded-full ml-auto mb-2" />
          <div className="w-16 h-2 bg-primary/30 rounded-full ml-auto" />
        </motion.div>
      </div>
    )
  },
  {
    title: "Rekomendasi Faskes",
    description: "Temukan rumah sakit, klinik, dan apotek terdekat dengan integrasi peta presisi dan informasi jam buka real-time.",
    icon: <Map className="w-6 h-6 text-cyan-500" />,
    illustration: (
      <div className="relative w-full h-full flex items-center justify-center p-4">
        <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 5, repeat: Infinity }} className="absolute w-32 h-32 border border-cyan-500/20 rounded-full" />
        <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 5, repeat: Infinity, delay: 0.5 }} className="absolute w-24 h-24 border border-cyan-500/30 rounded-full" />
        <div className="relative z-10 bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-md border border-white/50 flex items-center gap-3">
          <div className="w-10 h-10 bg-cyan-500/10 rounded-full flex items-center justify-center">
            <Map className="w-5 h-5 text-cyan-500" />
          </div>
          <div>
            <div className="w-16 h-2 bg-gray-200 rounded-full mb-2" />
            <div className="w-10 h-2 bg-gray-100 rounded-full" />
          </div>
        </div>
      </div>
    )
  },
  {
    title: "Edukasi Terpercaya",
    description: "Akses ribuan artikel kesehatan medis dan panduan pengobatan yang dikurasi langsung oleh para ahli farmasi dan dokter.",
    icon: <FileText className="w-6 h-6 text-indigo-500" />,
    illustration: (
      <div className="relative w-full h-full flex items-center justify-center p-4">
        <motion.div animate={{ rotate: [0, 2, 0, -2, 0] }} transition={{ duration: 6, repeat: Infinity }} className="w-2/3 h-32 bg-white/80 backdrop-blur-md rounded-xl shadow-sm border border-white/50 p-4 relative z-10">
          <div className="w-1/3 h-3 bg-indigo-100 rounded-full mb-4" />
          <div className="w-full h-2 bg-gray-100 rounded-full mb-2" />
          <div className="w-5/6 h-2 bg-gray-100 rounded-full mb-2" />
          <div className="w-4/6 h-2 bg-gray-100 rounded-full" />
          <div className="absolute -right-4 -bottom-4 w-12 h-12 bg-indigo-50/80 backdrop-blur-sm rounded-xl border border-indigo-100 flex items-center justify-center shadow-sm">
            <FileText className="w-5 h-5 text-indigo-400" />
          </div>
        </motion.div>
      </div>
    )
  }
];

export default function FeatureSection() {
  return (
    <section className="relative py-32 overflow-hidden bg-ambient-glow bg-soft-depth">
      
      {/* 1. Grid Pattern (Sama dengan Hero) */}
      <div className="absolute inset-0 bg-pattern-grid pointer-events-none" />

      {/* 2. Floating Gradient Blobs (Animated - Posisi berbeda dari Hero) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div 
          className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[110px] mix-blend-multiply opacity-50 animate-float-blob" 
          animate={{ x: [0, -30, 0], y: [0, 50, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div 
          className="absolute top-[20%] left-[-5%] w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px] mix-blend-multiply opacity-40 animate-float-blob" 
          animate={{ x: [0, 40, 0], y: [0, -40, 0] }}
          transition={{ duration: 12, repeat: Infinity, delay: 2 }}
        />
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/40 backdrop-blur-xl border border-white/60 shadow-sm mb-6"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-bold text-gray-800 tracking-wide font-satoshi uppercase">
              Layanan Utama
            </span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-8 font-satoshi tracking-tighter leading-[1.1]"
          >
            Satu Platform untuk <br />
            Semua Solusi <span className="italic font-light text-gradient-cyan-indigo">Kesehatan.</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-gray-600 font-inter max-w-2xl mx-auto leading-relaxed"
          >
            Platform kami dirancang untuk menyederhanakan cara Anda mendapatkan informasi medis, berkonsultasi, dan menemukan fasilitas terdekat.
          </motion.p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index, duration: 0.6 }}
              className="group relative bg-white/60 backdrop-blur-xl rounded-[2.5rem] p-5 border border-white/80 shadow-premium hover:shadow-glow-cyan hover:-translate-y-3 transition-all duration-500 cursor-default"
            >
              {/* Illustration Header */}
              <div className="w-full h-60 rounded-[2rem] bg-gradient-to-br from-white/80 to-blue-50/30 mb-8 overflow-hidden relative border border-white/50">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_0%,#4F46E5_0%,transparent_70%)]" />
                {feature.illustration}
              </div>

              {/* Text Content */}
              <div className="px-4 pb-6">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 border border-white shadow-sm group-hover:scale-110 group-hover:shadow-md transition-all duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-extrabold text-gray-900 mb-4 font-satoshi tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed font-inter text-base md:text-lg">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 3. Gradient Fade-out (Untuk menyambung ke section di bawahnya jika ada) */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white/50 via-transparent to-transparent pointer-events-none" />
    </section>
  );
}