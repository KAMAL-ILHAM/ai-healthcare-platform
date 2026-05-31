'use client';

import { motion } from 'framer-motion';
import { 
  LayoutDashboard, MessageSquare, MapPin, BookMarked, Settings, 
  Search, Bell, Activity, HeartPulse, TrendingUp, Bot, ArrowUpRight, Sparkles 
} from 'lucide-react';

export default function DashboardPreviewSection() {
  return (
    <section className="py-12 bg-[#FAFCFF] relative overflow-hidden z-10">
      
      {/* Cinematic Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-400/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-20">
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
          className="relative w-full rounded-[2.5rem] bg-white/60 backdrop-blur-3xl border border-white shadow-[0_40px_100px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col h-[750px]"
        >
          {/* macOS Window Header */}
          <div className="h-14 border-b border-gray-100/50 flex items-center px-6 justify-between bg-white/50 shrink-0">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <div className="text-xs font-bold tracking-wider text-gray-400 uppercase flex items-center gap-2">
              app.eiohealth.com
            </div>
            <div className="w-16" />
          </div>

          {/* MAIN DASHBOARD LAYOUT */}
          <div className="flex flex-1 overflow-hidden">
            
            {/* LEFT SIDEBAR (Glass Effect) */}
            <div className="w-64 border-r border-gray-100/50 bg-white/30 p-6 flex flex-col justify-between hidden lg:flex">
              <div>
                <div className="flex items-center gap-2.5 mb-12 px-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-cyan-500 rounded-lg flex items-center justify-center shadow-sm">
                    <Activity className="text-white w-4 h-4" />
                  </div>
                  <span className="text-lg font-bold tracking-tight text-gray-900 font-satoshi">EIOHealth</span>
                </div>

                <nav className="space-y-2">
                  {[
                    { name: "Overview", icon: <LayoutDashboard className="w-4 h-4" />, active: true },
                    { name: "Chat History", icon: <MessageSquare className="w-4 h-4" />, active: false },
                    { name: "Faskes Tracker", icon: <MapPin className="w-4 h-4" />, active: false },
                    { name: "Jurnal Disimpan", icon: <BookMarked className="w-4 h-4" />, active: false },
                  ].map((item, i) => (
                    <div key={i} className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 ${item.active ? 'bg-white shadow-sm border border-gray-100 text-primary font-bold' : 'text-gray-500 hover:bg-white/50 hover:text-gray-900 font-medium'}`}>
                      {item.icon}
                      <span className="text-sm font-inter">{item.name}</span>
                    </div>
                  ))}
                </nav>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer text-gray-500 hover:bg-white/50 transition-all font-medium">
                  <Settings className="w-4 h-4" />
                  <span className="text-sm font-inter">Pengaturan</span>
                </div>
                {/* User Profile Snippet */}
                <div className="flex items-center gap-3 px-4 py-3 mt-4 border-t border-gray-100/50 pt-6">
                  <div className="w-9 h-9 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold text-xs">
                    KI
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-gray-900 font-satoshi">Kamal Ilham</span>
                    <span className="text-[10px] font-medium text-gray-500">Pharmacist</span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT ANALYTICS CONTENT */}
            <div className="flex-1 bg-gradient-to-br from-transparent to-gray-50/30 p-8 overflow-y-auto custom-scrollbar">
              
              {/* Topbar */}
              <div className="flex justify-between items-center mb-10">
                <div>
                  <h3 className="text-2xl font-extrabold text-gray-900 font-satoshi">Halo, Kamal!</h3>
                  <p className="text-sm text-gray-500 font-inter">Berikut adalah ringkasan kesehatan Anda minggu ini.</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="relative hidden md:block">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="text" placeholder="Cari rekam medis..." className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-inter focus:outline-none focus:border-primary w-64 shadow-sm" />
                  </div>
                  <button className="w-10 h-10 bg-white rounded-full border border-gray-200 flex items-center justify-center relative shadow-sm hover:border-primary/50 transition-colors">
                    <Bell className="w-4 h-4 text-gray-600" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
                  </button>
                </div>
              </div>

              {/* METRICS ROW */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Health Score */}
                <motion.div whileHover={{ y: -5 }} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.02)] relative overflow-hidden group transition-all">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full -z-10 group-hover:scale-110 transition-transform" />
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                      <Activity className="w-5 h-5 text-indigo-500" />
                    </div>
                    <span className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">Health Score</span>
                  </div>
                  <div className="text-4xl font-black text-gray-900 font-satoshi mb-1">92<span className="text-lg text-gray-400 font-medium">/100</span></div>
                  <div className="text-xs font-semibold text-emerald-500 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" /> +4.2% Kondisi Optimal
                  </div>
                </motion.div>

                {/* Heart Rate */}
                <motion.div whileHover={{ y: -5 }} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.02)] relative overflow-hidden group transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                      <HeartPulse className="w-5 h-5 text-red-500" />
                    </div>
                    <span className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">Detak Jantung</span>
                  </div>
                  <div className="text-4xl font-black text-gray-900 font-satoshi mb-1">72<span className="text-lg text-gray-400 font-medium"> bpm</span></div>
                  <div className="text-xs font-semibold text-gray-500">Rata-rata saat istirahat</div>
                </motion.div>

                {/* Consultations */}
                <motion.div whileHover={{ y: -5 }} className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-3xl shadow-[0_15px_40px_rgba(0,0,0,0.1)] text-white relative overflow-hidden group transition-all">
                  <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white/5 rounded-full blur-xl group-hover:bg-white/10 transition-colors" />
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10">
                      <Bot className="w-5 h-5 text-cyan-400" />
                    </div>
                    <span className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">Sesi AI</span>
                  </div>
                  <div className="text-4xl font-black font-satoshi mb-1">12<span className="text-lg text-gray-400 font-medium"> sesi</span></div>
                  <div className="text-xs font-medium text-cyan-400 flex items-center gap-1">
                    Bulan ini
                  </div>
                </motion.div>
              </div>

              {/* BOTTOM ROW: CHART & HISTORY */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Animated Chart Card */}
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.02)]">
                  <div className="flex justify-between items-center mb-8">
                    <h4 className="font-bold text-gray-900 font-satoshi">Aktivitas Mingguan</h4>
                    <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1.5 rounded-full">Detail</span>
                  </div>
                  <div className="h-48 flex items-end justify-between gap-2 md:gap-4 px-2">
                    {[35, 50, 40, 85, 60, 45, 70].map((height, i) => (
                      <div key={i} className="w-full flex flex-col items-center gap-3">
                        <div className="w-full h-full bg-gray-50 rounded-t-xl flex items-end relative group cursor-pointer overflow-hidden">
                          <motion.div 
                            initial={{ height: 0 }} whileInView={{ height: `${height}%` }} viewport={{ once: true }} transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                            className={`w-full rounded-t-xl ${i === 3 ? 'bg-gradient-to-t from-primary to-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)]' : 'bg-gray-200 group-hover:bg-gray-300'} transition-colors`}
                          />
                        </div>
                        <span className="text-[10px] font-bold text-gray-400">{['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'][i]}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI History & Saved Items */}
                <div className="flex flex-col gap-6">
                  {/* History List */}
                  <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.02)] flex-1">
                    <h4 className="font-bold text-gray-900 font-satoshi mb-5">Riwayat Konsultasi</h4>
                    <div className="space-y-4">
                      {[
                        { title: "Analisis Interaksi Farmakologis", time: "Hari ini, 09:40", tag: "Selesai" },
                        { title: "Gejala Sindrom Dispepsia", time: "Kemarin, 14:20", tag: "Selesai" }
                      ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-3 rounded-2xl hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-colors cursor-pointer group">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-cyan-50 flex items-center justify-center text-cyan-600">
                              <MessageSquare className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-sm font-bold text-gray-900 font-satoshi group-hover:text-primary transition-colors">{item.title}</div>
                              <div className="text-[11px] text-gray-500 font-inter">{item.time}</div>
                            </div>
                          </div>
                          <ArrowUpRight className="w-4 h-4 text-gray-300 group-hover:text-primary transition-colors" />
                        </div>
                      ))}
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