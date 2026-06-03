'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Map as MapIcon, ChevronRight, ShieldAlert, Building2, Navigation2, MapPin, X, Activity } from 'lucide-react';

// --- Kategori Filter ---
const filters = ["Semua", "Rumah Sakit", "Klinik", "Apotek"];

// --- Data Dummy Fasilitas (Replikasi Samarinda/Balikpapan) ---
const facilities = [
  { id: 1, name: "Apotek Kimia Farma 4", category: "Apotek", distance: "0.1 KM", type: "activity" },
  { id: 2, name: "Apotek Surya", category: "Apotek", distance: "0.2 KM", type: "activity" },
  { id: 3, name: "Apotek 99", category: "Apotek", distance: "0.2 KM", type: "activity" },
  { id: 4, name: "Apotek Aman", category: "Apotek", distance: "0.2 KM", type: "activity" },
  { id: 5, name: "Apotek Kimia Farma Hidayatullah", category: "Apotek", distance: "0.2 KM", type: "activity" }
];

export default function HealthcareMapSection() {
  const [activeFilter, setActiveFilter] = useState("Semua");

  const filteredFacilities = facilities.filter(
    f => activeFilter === "Semua" || f.category === activeFilter
  );

  return (
    <section id="location" className="py-12 bg-[#FAFCFF] relative overflow-hidden z-10">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-100 shadow-sm mb-6"
          >
            <MapIcon className="w-4 h-4 text-primary" />
            <span className="text-sm font-bold text-gray-800 tracking-wide font-satoshi uppercase">
              Integrasi Lokasi
            </span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 font-satoshi tracking-tight"
          >
            Temukan Fasilitas Medis <br />
            <span className="italic font-light text-gradient-cyan-indigo">Dalam Hitungan Detik.</span>
          </motion.h2>
        </div>

        {/* DASHBOARD MOCKUP CONTAINER */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="relative w-full rounded-[2rem] bg-[#F8FBFF] border-2 border-white/60 shadow-[0_30px_100px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col p-6 h-[750px]"
        >
          
          {/* TOP HEADER BARS (Dummy) */}
          <div className="flex justify-between items-center w-full mb-6">
            <div className="flex items-center gap-2 px-6 py-2.5 bg-white rounded-full shadow-sm border border-slate-100">
              <Activity className="w-4 h-4 text-indigo-600" />
              <span className="text-xs font-bold tracking-widest text-slate-800">FASKES</span>
            </div>
            <div className="flex items-center gap-2 px-6 py-2.5 bg-white rounded-full shadow-sm border border-slate-100 text-slate-600">
              <span className="text-xs font-semibold">Dashboard</span>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 h-full min-h-0">
            
            {/* KIRI: PETA & SEARCH (Fleksibel membesar) */}
            <div className="flex-1 flex flex-col min-h-0">
              
              {/* Search Bar */}
              <div className="w-full flex items-center bg-white border border-slate-200 rounded-2xl py-3 px-4 shadow-sm mb-4 shrink-0">
                <Search className="w-5 h-5 text-slate-400 mr-3 shrink-0" />
                <input 
                  type="text" 
                  placeholder="Ketik nama kota atau daerah (Contoh: Balikpapan)... lalu Enter" 
                  className="flex-1 bg-transparent border-none focus:outline-none text-sm text-slate-800 placeholder:text-slate-400"
                  readOnly
                />
              </div>

              {/* Filter Pills */}
              <div className="flex flex-wrap gap-2 mb-4 shrink-0">
                {filters.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-5 py-2 rounded-xl text-xs font-bold transition-all duration-300 font-inter border ${
                      activeFilter === filter 
                        ? 'bg-slate-900 text-white border-slate-900 shadow-sm' 
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              {/* MAP AREA */}
              <div className="flex-1 w-full bg-[#f4ebd8] rounded-2xl border border-slate-200 overflow-hidden relative shadow-sm">
                {/* Tekstur Peta (Dummy) */}
                <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
                
                {/* Garis Jalan Maya */}
                <div className="absolute top-1/3 left-0 right-0 h-1 bg-white/60 transform rotate-12" />
                <div className="absolute top-0 bottom-0 left-1/4 w-1.5 bg-white/70" />
                <div className="absolute top-1/2 left-1/4 right-0 h-1.5 bg-white/70" />
                <div className="absolute top-2/3 right-20 w-32 h-20 bg-white/50 rounded-lg" />
                
                {/* Pin Lokasi Aktif */}
                <div className="absolute top-[55%] left-[45%] -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
                  <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center shadow-xl border-4 border-indigo-200/50 cursor-pointer">
                    <Navigation2 className="w-4 h-4 text-white transform rotate-45" />
                  </div>
                </div>

                {/* Tombol Target Kanan Bawah */}
                <div className="absolute bottom-4 right-4 w-10 h-10 bg-white rounded-xl shadow-md border border-slate-100 flex items-center justify-center cursor-pointer hover:bg-slate-50">
                  <Navigation2 className="w-5 h-5 text-slate-700" />
                </div>

                {/* Watermark Kanan Bawah */}
                <div className="absolute bottom-1 right-2 text-[9px] text-slate-500 bg-white/60 px-1 py-0.5 rounded">
                  Leaflet | © OpenStreetMap contributors
                </div>
              </div>
            </div>

            {/* KANAN: DARURAT & LIST (Lebar Statis) */}
            <div className="w-full lg:w-[380px] flex flex-col gap-4 min-h-0 shrink-0">
              
              {/* Emergency Card (Merah) */}
              <div className="w-full bg-[#D0214C] rounded-2xl p-6 text-white shadow-lg shrink-0 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4 blur-2xl pointer-events-none" />
                
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
                    <ShieldAlert className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg leading-tight">Panggilan Darurat</h3>
                    <p className="text-xs text-white/80 mt-0.5">Akses cepat siaga 24 Jam.</p>
                  </div>
                </div>
                
                <button className="w-full bg-white text-[#D0214C] font-bold text-sm py-3 rounded-xl shadow-sm hover:bg-red-50 transition-colors flex items-center justify-center gap-2">
                  <span className="rotate-[270deg]">📞</span> Lihat Nomor Darurat
                </button>
              </div>

              {/* Fasilitas Terdekat List */}
              <div className="flex-1 bg-white rounded-2xl border border-slate-200 p-5 flex flex-col min-h-0 shadow-sm">
                <h3 className="text-sm font-bold text-slate-800 mb-4 shrink-0">Fasilitas Terdekat</h3>
                
                <div className="flex-1 overflow-y-auto space-y-2 no-scrollbar min-h-0">
                  <AnimatePresence>
                    {filteredFacilities.map((facility) => (
                      <motion.div
                        key={facility.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-[#F0FDF4] flex items-center justify-center text-[#10B981] border border-[#D1FAE5]">
                            <Activity className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-slate-900 leading-tight">{facility.name}</h4>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                                {facility.category}
                              </span>
                              <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
                                <MapIcon className="w-3 h-3" /> {facility.distance}
                              </span>
                            </div>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100 shrink-0">
                  <button className="w-full bg-white border border-slate-200 text-slate-700 font-bold text-xs py-3 rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
                    Lihat Semua Fasilitas <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

              </div>

            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}