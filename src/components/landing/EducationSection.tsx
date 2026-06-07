'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Bell, User, LayoutDashboard, Sparkles, MapPin, Activity, Settings, TrendingUp } from 'lucide-react';

const tabs = ["Semua Topik", "Penyakit Menular", "Edukasi Medis"];

export default function EducationSection() {
  const [activeTab, setActiveTab] = useState("Semua Topik");

  return (
    <section id="education" className="py-10 sm:py-12 md:py-16 bg-[#FAFCFF] relative overflow-hidden z-10">
      <div className="container mx-auto px-4 sm:px-6 max-w-[1400px] relative z-10">
        
        {/* SECTION HEADER (Landing Page Text) */}
        {/* Catatan: 'hidden md:block' dihapus agar judul tetap muncul di mobile, namun ukurannya disesuaikan */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white border border-gray-100 shadow-sm mb-4 sm:mb-6"
          >
            <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
            <span className="text-xs sm:text-sm font-bold text-gray-800 tracking-wide font-satoshi uppercase">
              Pusat Edukasi
            </span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 font-satoshi tracking-tight leading-tight"
          >
            Wawasan Medis <br className="hidden sm:block" />
            <span className="italic font-light text-gradient-cyan-indigo">Terpercaya & Terpersonalisasi.</span>
          </motion.h2>
        </div>

        {/* MOCKUP CONTAINER - BACKGROUND GRID ABU-ABU */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="relative w-full rounded-2xl sm:rounded-[2rem] bg-[#F4F7FB] border-2 border-white/60 shadow-[0_30px_100px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col md:flex-row h-auto lg:h-[800px] xl:w-[90%] mx-auto"
          style={{ backgroundImage: 'linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px)', backgroundSize: '40px 40px' }}
        >
          
          {/* LEFT SIDEBAR (Icon Only) - Disembunyikan di layar kecil, muncul di MD ke atas */}
          <div className="w-[80px] bg-white border-r border-slate-100 flex-col items-center py-6 justify-between shrink-0 z-20 shadow-[4px_0_24px_rgba(0,0,0,0.02)] hidden md:flex">
            <div className="flex flex-col gap-6 items-center w-full">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-cyan-400 rounded-2xl flex items-center justify-center shadow-md mb-4">
                <Activity className="text-white w-6 h-6" />
              </div>
              
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-slate-400 hover:bg-slate-50 cursor-pointer">
                <LayoutDashboard className="w-5 h-5" />
              </div>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-slate-400 hover:bg-slate-50 cursor-pointer">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-slate-400 hover:bg-slate-50 cursor-pointer">
                <MapPin className="w-5 h-5" />
              </div>
              {/* Active Tab (Book) */}
              <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm border border-indigo-100 cursor-pointer relative">
                <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-indigo-600 rounded-r-full" />
                <BookOpen className="w-5 h-5" />
              </div>
            </div>

            <div className="flex flex-col gap-4 items-center w-full">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-slate-400 hover:bg-slate-50 cursor-pointer">
                <Settings className="w-5 h-5" />
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white text-xs font-bold shadow-md cursor-pointer">
                KI
              </div>
            </div>
          </div>

          {/* MAIN CONTENT AREA */}
          <div className="flex-1 flex flex-col overflow-hidden p-4 sm:p-6 md:p-8 z-10 min-h-0">
            
            {/* Topbar / Title */}
            <div className="flex justify-between items-start mb-4 sm:mb-6 shrink-0">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-satoshi uppercase tracking-tight">
                  EDUKASI KESEHATAN
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 font-inter italic mt-1 max-w-[250px] sm:max-w-none leading-snug">
                  Pusat literasi medis cerdas dan rekomendasi terpersonalisasi.
                </p>
              </div>
              <div className="hidden lg:flex items-center gap-4">
                <div className="w-10 h-10 bg-white rounded-full border border-slate-200 flex items-center justify-center text-slate-600 shadow-sm">
                  <Bell className="w-4 h-4" />
                </div>
                <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm">
                  <span className="text-sm font-bold text-slate-800">Kamal Ilham</span>
                  <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                    <User className="w-3 h-3" />
                  </div>
                </div>
              </div>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 shrink-0">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 sm:px-6 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 font-inter ${
                    activeTab === tab 
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-md border-transparent' 
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* SPLIT LAYOUT (Grid) */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:min-h-0">
              
              {/* LEFT COLUMN: ARTICLES */}
              <div className="lg:col-span-2 flex flex-col gap-4 sm:gap-6 overflow-y-auto no-scrollbar lg:pb-6 lg:pr-2">
                
                {/* BIG FEATURED ARTICLE */}
                <div className="relative w-full h-[280px] sm:h-[380px] rounded-2xl sm:rounded-[24px] overflow-hidden shadow-sm group cursor-pointer shrink-0">
                  <img 
                    src="https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=1000" 
                    alt="Penyakit Menular" 
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/70 to-transparent" />
                  
                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8 flex flex-col">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white w-max mb-3 sm:mb-4">
                      <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-cyan-400" />
                      <span className="text-[10px] sm:text-[11px] font-bold tracking-wide">Penyakit Menular</span>
                    </div>
                    
                    <h2 className="text-xl sm:text-3xl font-black text-white font-satoshi leading-tight mb-2 sm:mb-3">
                      Mengenal Penyakit Menular
                    </h2>
                    
                    <p className="text-xs sm:text-sm text-gray-300 font-inter line-clamp-2 leading-relaxed mb-4 sm:mb-6">
                      <span className="italic text-gray-400">*Ditulis oleh: Apt. Kamal Ilham*</span> Penyakit menular adalah jenis penyakit yang disebabkan oleh mikroorganisme seperti virus, bakteri, jamur, atau parasit.
                    </p>
                    
                    <div className="flex items-center gap-2.5 sm:gap-3">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 text-white text-[10px] sm:text-xs font-bold">
                        K
                      </div>
                      <span className="text-xs sm:text-sm font-bold text-white font-satoshi">Kamal Ilham</span>
                    </div>
                  </div>
                </div>

                {/* BOTTOM GRID ARTICLES */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="h-32 sm:h-40 rounded-2xl sm:rounded-[24px] bg-slate-900 overflow-hidden relative shadow-sm border border-slate-200 group cursor-pointer">
                     <img src="https://images.unsplash.com/photo-1584308666744-24d5e4a5d898?auto=format&fit=crop&q=80&w=500" alt="Medis" className="absolute inset-0 w-full h-full object-cover opacity-60 transition-opacity group-hover:opacity-80" />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                     <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-white/90 backdrop-blur px-2.5 py-1 rounded-md text-[9px] sm:text-[10px] font-bold text-slate-800">Edukasi Medis</div>
                  </div>
                  <div className="h-32 sm:h-40 rounded-2xl sm:rounded-[24px] bg-rose-900 overflow-hidden relative shadow-sm border border-slate-200 group cursor-pointer">
                     <img src="https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&q=80&w=500" alt="Virus" className="absolute inset-0 w-full h-full object-cover opacity-60 transition-opacity group-hover:opacity-80" />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                     <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-white/90 backdrop-blur px-2.5 py-1 rounded-md text-[9px] sm:text-[10px] font-bold text-slate-800">Edukasi Medis</div>
                  </div>
                </div>

              </div>

              {/* RIGHT COLUMN: WIDGETS */}
              <div className="lg:col-span-1 flex flex-col gap-4 sm:gap-6 h-auto lg:h-full pb-4 lg:pb-0">
                
                {/* WIDGET 1: AI RECOMMENDED */}
                <div className="bg-[#111827] rounded-2xl sm:rounded-[24px] p-5 sm:p-6 shadow-lg border border-slate-800 shrink-0">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400" />
                    <span className="text-[10px] sm:text-xs font-bold tracking-widest text-cyan-400 uppercase">AI RECOMMENDED</span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-300 font-inter mb-4 sm:mb-5 leading-relaxed">
                    Berdasarkan riwayat bacaan kesehatan Anda, AI merekomendasikan artikel ini.
                  </p>
                  
                  <div className="bg-[#1E293B] rounded-xl sm:rounded-[16px] p-4 sm:p-5 border border-slate-700/50 cursor-pointer hover:bg-[#1E293B]/80 transition-colors">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center mb-3 sm:mb-4">
                      <Activity className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400" />
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold text-white leading-snug mb-2 sm:mb-3">
                      Kementerian Kesehatan melaporkan perkembangan kompleks wabah viru...
                    </h4>
                    <span className="text-[9px] sm:text-[10px] font-medium text-slate-400">Rekomendasi Pintar</span>
                  </div>
                </div>

                {/* WIDGET 2: TRENDING TOPIK */}
                <div className="bg-white rounded-2xl sm:rounded-[24px] p-5 sm:p-6 shadow-sm border border-slate-100 flex-1 flex flex-col min-h-0">
                  <div className="flex items-center gap-2 mb-4 sm:mb-6 shrink-0">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-rose-50 flex items-center justify-center">
                      <TrendingUp className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-rose-500" />
                    </div>
                    <h3 className="text-sm sm:text-base font-black text-slate-900 font-satoshi">Trending Topik</h3>
                  </div>

                  {/* Di desktop scrollable, di mobile biarkan memanjang natural */}
                  <div className="flex flex-col gap-4 sm:gap-6 lg:overflow-y-auto no-scrollbar lg:pr-1">
                    {/* Item 1 */}
                    <div className="flex items-start gap-3 sm:gap-4 cursor-pointer group">
                      <span className="text-xl sm:text-2xl font-black text-slate-200 mt-0.5 sm:mt-1">01</span>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-800 leading-snug group-hover:text-primary transition-colors">
                          Stop Anggap Wajar Nyeri Punggung Saat Menua, Ini Tanda Harus Cek ke Dokter...
                        </h4>
                        <p className="text-[9px] sm:text-[10px] font-medium text-slate-500 mt-1 sm:mt-1.5">4.3k pembaca</p>
                      </div>
                    </div>
                    
                    {/* Item 2 */}
                    <div className="flex items-start gap-3 sm:gap-4 cursor-pointer group">
                      <span className="text-xl sm:text-2xl font-black text-slate-200 mt-0.5 sm:mt-1">02</span>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-800 leading-snug group-hover:text-primary transition-colors">
                          China Peringatkan Warganya untuk Menghindari Perjalanan Tidak...
                        </h4>
                        <p className="text-[9px] sm:text-[10px] font-medium text-slate-500 mt-1 sm:mt-1.5">2.1k pembaca</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}