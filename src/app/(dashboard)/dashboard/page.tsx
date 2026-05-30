'use client';

import { motion } from 'framer-motion';
import { Sparkles, MapPin, BookOpen, Activity, Droplets, Moon, Plus, ArrowRight } from 'lucide-react';
import StatsCard from '@/components/dashboard/StatsCard';

export default function DashboardPage() {
  return (
    <>
      {/* --- OVERVIEW STATS CARDS GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          title="Konsultasi AI" value="12" subtitle="Bulan ini" 
          icon={Sparkles} colorClass="text-indigo-600" bgClass="bg-indigo-50" delay={0.1} 
        />
        <StatsCard 
          title="Fasilitas Tersimpan" value="5" subtitle="Apotek & Klinik" 
          icon={MapPin} colorClass="text-cyan-600" bgClass="bg-cyan-50" delay={0.2} 
        />
        <StatsCard 
          title="Artikel Dibaca" value="28" subtitle="+4 dari minggu lalu" 
          icon={BookOpen} colorClass="text-emerald-600" bgClass="bg-emerald-50" delay={0.3} 
        />
        <StatsCard 
          title="Skor Kesehatan" value="94" subtitle="Kondisi Prima" 
          icon={Activity} colorClass="text-rose-500" bgClass="bg-rose-50" delay={0.4} 
        />
      </div>

      {/* --- MAIN CORE GRID: AI CHAT PREVIEW & PERSONAL TRACKERS --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* AI Consultation Panel (Membentang 2 Kolom) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="lg:col-span-2 bg-gradient-to-br from-gray-900 to-indigo-950 p-1 rounded-[32px] shadow-2xl relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
          <div className="bg-white/10 backdrop-blur-2xl w-full h-full rounded-[28px] p-8 relative z-10 flex flex-col justify-between border border-white/10">
            
            <div className="flex justify-between items-start">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-cyan-300 text-xs font-semibold mb-4">
                  <Sparkles className="w-3 h-3" /> EIOHealth AI Assistant
                </div>
                <h2 className="text-2xl font-bold text-white tracking-tight leading-tight">
                  Konsultasi Cerdas <br/> Berbasis Analisis Medis.
                </h2>
              </div>
              <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors border border-white/10">
                <Plus className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Simulasi Balasan Pesan AI */}
            <div className="mt-8 space-y-4">
              <div className="flex justify-end">
                <div className="bg-indigo-500/20 border border-indigo-400/30 text-indigo-100 text-sm px-4 py-3 rounded-2xl rounded-tr-sm backdrop-blur-md max-w-[80%]">
                  Bantu saya buat rutinitas dan jadwal skincare dengan double cleansing, serta rekomendasi jam re-apply Azarine sunscreen.
                </div>
              </div>
              <div className="flex justify-start">
                <div className="bg-white/10 border border-white/10 text-gray-200 text-sm px-4 py-3 rounded-2xl rounded-tl-sm backdrop-blur-md max-w-[80%] flex gap-3">
                  <Sparkles className="w-5 h-5 shrink-0 text-cyan-400 mt-0.5" />
                  <p className="leading-relaxed">Tentu. Untuk menjaga skin barrier, lakukan <b>double cleansing</b> di malam hari. Aplikasikan <b>Azarine sunscreen</b> di pagi hari dan re-apply setiap 3-4 jam, terutama jam 10:00 dan 13:00 siang...</p>
                </div>
              </div>
            </div>

            {/* Input Bar */}
            <div className="mt-6 relative">
              <input type="text" placeholder="Tanyakan keluhan kesehatan Anda hari ini..." className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-5 pr-14 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 backdrop-blur-md" />
              <button className="absolute right-2 top-2 p-2 bg-cyan-500 hover:bg-cyan-400 text-white rounded-xl transition-colors shadow-[0_0_15px_rgba(6,182,212,0.4)]">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Panel Kanan: Alat Pelacak Kesehatan (Trackers) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
          className="space-y-6"
        >
          {/* Water Tracker */}
          <div className="bg-white/60 backdrop-blur-xl border border-white/80 p-6 rounded-[28px] shadow-[0_8px_30px_rgba(0,0,0,0.03)]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold text-gray-900">Hidrasi Harian</h3>
              <Droplets className="w-5 h-5 text-cyan-500" />
            </div>
            <div className="flex items-end gap-2 mb-3">
              <span className="text-3xl font-extrabold text-gray-900 tracking-tight">1.2</span>
              <span className="text-sm font-medium text-gray-500 mb-1">/ 2.5 L</span>
            </div>
            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-cyan-500 w-[48%] rounded-full shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
            </div>
          </div>

          {/* Sleep Tracker */}
          <div className="bg-white/60 backdrop-blur-xl border border-white/80 p-6 rounded-[28px] shadow-[0_8px_30px_rgba(0,0,0,0.03)]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold text-gray-900">Kualitas Tidur</h3>
              <Moon className="w-5 h-5 text-indigo-500" />
            </div>
            <div className="flex items-end gap-2 mb-3">
              <span className="text-3xl font-extrabold text-gray-900 tracking-tight">6h 45m</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg w-fit">
              <Activity className="w-3 h-3" /> +15m dari kemarin
            </div>
          </div>
        </motion.div>

      </div>
    </>
  );
}