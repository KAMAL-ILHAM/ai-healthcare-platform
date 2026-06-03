'use client';

import { motion } from 'framer-motion';
import { 
  LayoutDashboard, MessageSquare, MapPin, BookMarked, Settings, 
  Search, Bell, Activity, Sparkles, BookOpen, User, Shield, Plus, Mic, Send 
} from 'lucide-react';

export default function DashboardPreviewSection() {
  return (
    <section id="dashboard" className="py-12 bg-[#FAFCFF] relative overflow-hidden z-10">
      
      {/* Cinematic Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-400/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-[1400px] relative z-10">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-100 shadow-sm mb-6"
          >
            <LayoutDashboard className="w-4 h-4 text-primary" />
            <span className="text-sm font-bold text-gray-800 tracking-wide font-satoshi uppercase">
              Dashboard Enterprise
            </span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 font-satoshi tracking-tight"
          >
            Pusat Kendali <br />
            <span className="italic font-light text-gradient-cyan-indigo">Kesehatan Personal.</span>
          </motion.h2>
        </div>

        {/* DASHBOARD MOCKUP CONTAINER */}
        <motion.div 
          initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full mx-auto rounded-[2rem] bg-[#F8FBFF] border-2 border-white/60 shadow-[0_30px_100px_rgba(0,0,0,0.08)] overflow-hidden flex h-[700px] md:h-[750px] lg:w-[95%] xl:w-[90%]"
        >
          
          {/* LEFT SIDEBAR (Icon Only) - Meniru UI Asli */}
          <div className="w-[80px] bg-white border-r border-slate-100 flex flex-col items-center py-6 justify-between shrink-0 z-20 shadow-[4px_0_24px_rgba(0,0,0,0.02)] hidden sm:flex">
            <div className="flex flex-col gap-6 items-center w-full">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-cyan-400 rounded-2xl flex items-center justify-center shadow-md mb-4">
                <Activity className="text-white w-6 h-6" />
              </div>
              
              <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm border border-indigo-100 cursor-pointer">
                <LayoutDashboard className="w-5 h-5" />
              </div>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-slate-400 hover:bg-slate-50 cursor-pointer">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-slate-400 hover:bg-slate-50 cursor-pointer">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-slate-400 hover:bg-slate-50 cursor-pointer">
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

          {/* MAIN DASHBOARD CONTENT AREA */}
          <div className="flex-1 flex flex-col overflow-hidden bg-[#F5F8FF]/50 p-6 md:p-8">
            
            {/* Topbar / Welcome Message */}
            <div className="flex justify-between items-center mb-8 shrink-0">
              <div>
                <h3 className="text-2xl font-black text-slate-900 font-satoshi flex items-center gap-2">
                  Selamat datang kembali, Kamal <span className="text-xl">👋</span>
                </h3>
                <p className="text-sm text-slate-500 font-inter mt-1">Pusat kontrol kesehatan digital Anda siap digunakan.</p>
              </div>
              <div className="hidden md:flex items-center gap-4">
                <div className="w-10 h-10 bg-white rounded-full border border-slate-200 flex items-center justify-center text-slate-600 shadow-sm">
                  <Bell className="w-4 h-4" />
                </div>
                <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm">
                  <span className="text-sm font-bold text-slate-800">Kamal</span>
                  <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                    <User className="w-3 h-3" />
                  </div>
                </div>
              </div>
            </div>

            {/* OVERVIEW STATS CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 shrink-0">
              {/* Card 1 */}
              <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-4xl font-black text-slate-900 mb-2">12</h2>
                    <p className="text-sm font-bold text-slate-600">Total Artikel Edukasi</p>
                    <p className="text-[11px] text-slate-400 mt-1">Siap dibaca</p>
                  </div>
                  <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
                    <BookOpen className="w-5 h-5" />
                  </div>
                </div>
              </div>
              
              {/* Card 2 */}
              <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-4xl font-black text-slate-900 mb-2">6</h2>
                    <p className="text-sm font-bold text-slate-600">Kategori Pembahasan</p>
                    <p className="text-[11px] text-slate-400 mt-1">Topik kesehatan</p>
                  </div>
                  <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-500">
                    <Activity className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Card 3 (Map) */}
              <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-4xl font-black text-slate-900 mb-2">Peta</h2>
                    <p className="text-sm font-bold text-slate-600">Cari Fasilitas Medis</p>
                    <p className="text-[11px] text-slate-400 mt-1">Temukan apotek & klinik terdekat.</p>
                  </div>
                  <div className="w-12 h-12 bg-cyan-50 rounded-2xl flex items-center justify-center text-cyan-600">
                    <MapPin className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>

            {/* SPLIT CONTENT AREA */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-0">
              
              {/* LEFT: AI CHAT PANEL (col-span-2) */}
              <div className="lg:col-span-2 bg-white/80 backdrop-blur-xl border border-white p-5 rounded-[28px] shadow-[0_8px_30px_rgba(0,0,0,0.03)] flex flex-col h-full">
                {/* Header Chat */}
                <div className="flex items-center justify-between mb-4 shrink-0 relative px-2">
                  <div className="flex items-center gap-2 z-10">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-400"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="flex items-center gap-1.5 text-slate-400 font-bold text-[10px] tracking-widest uppercase">
                      <Shield className="w-3.5 h-3.5" /> AI ASSISTANT
                    </div>
                  </div>
                </div>

                {/* Area Chat */}
                <div className="flex-1 overflow-y-auto space-y-4 px-2 no-scrollbar flex flex-col justify-end min-h-0">
                  {/* User Bubble */}
                  <div className="flex justify-end">
                    <div className="bg-[#0F172A] text-white text-xs px-5 py-3.5 rounded-[20px] rounded-tr-sm shadow-md max-w-[85%] font-medium leading-relaxed">
                      Saya diresepkan antibiotik Amoxicillin, tapi saya juga sedang rutin minum antasida untuk lambung. Apakah boleh diminum bersamaan?
                    </div>
                  </div>

                  {/* AI Bubble */}
                  <div className="flex justify-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center shrink-0 shadow-sm mt-1">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-white border border-slate-200 p-4 rounded-[20px] rounded-tl-sm shadow-sm max-w-[90%]">
                      <p className="text-slate-700 text-xs leading-relaxed mb-3">
                        Sebaiknya <span className="font-bold text-indigo-600">jangan diminum bersamaan</span>. Antasida mengandung magnesium/aluminium yang dapat mengikat antibiotik di lambung.
                      </p>
                      <div className="bg-indigo-50/50 border border-indigo-100 p-3 rounded-xl flex gap-2">
                        <Activity className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-[11px] font-bold text-slate-900 mb-0.5">Rekomendasi Farmasi:</h4>
                          <p className="text-[11px] text-slate-600 leading-relaxed">
                            Beri jeda minimal <b>2 jam</b> antara minum antasida dan antibiotik.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Input Bar */}
                <div className="mt-4 shrink-0 px-1">
                  <div className="w-full flex items-center bg-slate-50 border border-slate-200 rounded-full py-1.5 px-2 text-sm">
                    <div className="p-2 text-slate-400"><Plus className="w-4 h-4" /></div>
                    <span className="flex-1 px-2 text-xs text-slate-400 font-medium">Mulai Konsultasi...</span>
                    <div className="p-2 text-slate-400 mr-1"><Mic className="w-4 h-4" /></div>
                    <div className="p-2 bg-slate-900 text-white rounded-full"><Send className="w-3.5 h-3.5 ml-0.5" /></div>
                  </div>
                </div>
              </div>

              {/* RIGHT: TERAKHIR DIBACA (col-span-1) */}
              <div className="bg-white/80 backdrop-blur-xl border border-white p-5 rounded-[28px] shadow-[0_8px_30px_rgba(0,0,0,0.03)] flex flex-col h-full overflow-hidden hidden lg:flex">
                <div className="flex items-center justify-between mb-4 shrink-0">
                  <h3 className="text-base font-black text-slate-900">Terakhir Dibaca</h3>
                  <span className="text-[10px] font-bold text-indigo-600 flex items-center gap-1 cursor-pointer">
                    Lihat Semua <Search className="w-3 h-3" />
                  </span>
                </div>

                <div className="flex-1 overflow-y-auto space-y-3 no-scrollbar min-h-0">
                  {[1, 2].map((i) => (
                    <div key={i} className="block p-3 rounded-2xl bg-white border border-slate-100 shadow-sm hover:border-indigo-100 transition-colors">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0">
                          <BookMarked className="w-3.5 h-3.5 text-indigo-600" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-[10px] font-bold text-indigo-600 mb-0.5 truncate">Penyakit Menular</p>
                          <h4 className="text-xs font-bold text-slate-900 leading-snug line-clamp-2">
                            {i === 1 ? "Mengenal Penyakit Menular dan Pencegahannya" : "Panduan Dasar P3K di Rumah"}
                          </h4>
                          <p className="text-[9px] text-slate-500 mt-1 font-medium">31 Mei 2026</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="shrink-0 mt-3">
                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-indigo-50 border border-indigo-100 cursor-pointer">
                    <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center shrink-0">
                      <Search className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-[11px] font-bold text-indigo-900">Cari Artikel</h4>
                      <p className="text-[9px] text-indigo-700 mt-0.5">Temukan Artikel terbaru.</p>
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