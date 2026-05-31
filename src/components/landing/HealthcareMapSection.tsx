'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Navigation2, Star, Clock, Building2, Stethoscope, Activity, Sparkles, ChevronRight } from 'lucide-react';

// --- Kategori Filter ---
const filters = ["Semua", "Rumah Sakit", "Klinik", "Apotek"];

// --- Data Dummy Fasilitas (Lokalisasi Samarinda) ---
const facilities = [
  {
    id: 1,
    name: "RSUD Abdoel Wahab Sjahranie",
    category: "Rumah Sakit",
    distance: "2.5 km",
    time: "8 min",
    rating: 4.8,
    reviews: 1250,
    status: "Buka 24 Jam",
    isOpen: true,
    icon: <Building2 className="w-5 h-5 text-indigo-500" />,
    color: "bg-indigo-50",
    coordinates: { top: '30%', left: '25%' } // Posisi pin di peta
  },
  {
    id: 2,
    name: "Apotek Kimia Farma Juanda",
    category: "Apotek",
    distance: "0.8 km",
    time: "3 min",
    rating: 4.9,
    reviews: 842,
    status: "Buka • Tutup 22.00",
    isOpen: true,
    icon: <Activity className="w-5 h-5 text-cyan-500" />,
    color: "bg-cyan-50",
    coordinates: { top: '45%', left: '60%' }
  },
  {
    id: 3,
    name: "Klinik Muhammadiyah",
    category: "Klinik",
    distance: "1.2 km",
    time: "5 min",
    rating: 4.7,
    reviews: 320,
    status: "Tutup • Buka 08.00",
    isOpen: false,
    icon: <Stethoscope className="w-5 h-5 text-emerald-500" />,
    color: "bg-emerald-50",
    coordinates: { top: '70%', left: '40%' }
  }
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
            <Navigation2 className="w-4 h-4 text-primary" />
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

        {/* INTERACTIVE UI LAYOUT */}
        <div className="relative w-full rounded-[2.5rem] bg-white border border-gray-100 shadow-[0_20px_60px_rgba(0,0,0,0.03)] overflow-hidden flex flex-col lg:flex-row h-auto lg:h-[700px]">
          
          {/* LEFT PANEL: FILTERS & CARDS */}
          <div className="w-full lg:w-[400px] bg-white border-r border-gray-100 p-6 lg:p-8 flex flex-col z-20 shadow-[20px_0_40px_rgba(0,0,0,0.02)]">
            
            {/* Search / Filter Header */}
            <div className="mb-6">
              <h3 className="text-xl font-bold font-satoshi text-gray-900 mb-4">Rekomendasi Terdekat</h3>
              
              {/* Rounded Pill Tabs */}
              <div className="flex flex-wrap gap-2">
                {filters.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 font-inter ${
                      activeFilter === filter 
                        ? 'bg-primary text-white shadow-[0_4px_15px_rgba(79,70,229,0.3)]' 
                        : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {/* Scrollable Location Cards */}
            <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar pb-4">
              <AnimatePresence mode="popLayout">
                {filteredFacilities.map((facility) => (
                  <motion.div
                    key={facility.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="group bg-white rounded-2xl p-4 border border-gray-100 hover:border-primary/30 shadow-sm hover:shadow-[0_10px_30px_rgba(79,70,229,0.08)] cursor-pointer transition-all duration-300 relative overflow-hidden"
                  >
                    {/* Hover Gradient Glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${facility.color}`}>
                          {facility.icon}
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{facility.category}</span>
                          <div className="flex items-center gap-1 mt-1 text-xs font-bold text-primary bg-primary/5 px-2 py-1 rounded-md">
                            <Navigation2 className="w-3 h-3" />
                            {facility.distance}
                          </div>
                        </div>
                      </div>

                      <h4 className="font-bold text-gray-900 font-satoshi mb-1 group-hover:text-primary transition-colors">
                        {facility.name}
                      </h4>

                      <div className="flex items-center gap-3 text-xs font-inter mb-3">
                        <div className="flex items-center gap-1 text-amber-500 font-semibold">
                          <Star className="w-3.5 h-3.5 fill-amber-500" />
                          {facility.rating} <span className="text-gray-400 font-medium">({facility.reviews})</span>
                        </div>
                        <div className="w-1 h-1 bg-gray-300 rounded-full" />
                        <div className="text-gray-500 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" /> ETA {facility.time}
                        </div>
                      </div>

                      <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                        <span className={`text-[11px] font-bold ${facility.isOpen ? 'text-emerald-500' : 'text-red-400'}`}>
                          {facility.status}
                        </span>
                        <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-primary transition-colors group-hover:translate-x-1" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* RIGHT PANEL: LARGE MAP PREVIEW */}
          <div className="flex-1 relative bg-[#F4F7FB] overflow-hidden min-h-[400px]">
            {/* Simulated Minimal Light Map Background */}
            <div className="absolute inset-0 opacity-50 bg-[linear-gradient(rgba(79,70,229,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(79,70,229,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#F4F7FB_100%)]" />

            {/* Central Pulse (User Location) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="relative flex items-center justify-center">
                <div className="absolute w-24 h-24 bg-primary/20 rounded-full animate-ping opacity-75" />
                <div className="absolute w-12 h-12 bg-primary/20 rounded-full animate-pulse" />
                <div className="w-5 h-5 bg-primary border-4 border-white rounded-full shadow-lg z-10 relative" />
                <div className="absolute -bottom-8 whitespace-nowrap bg-gray-900 text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg">
                  Lokasi Anda
                </div>
              </div>
            </div>

            {/* Dynamic Map Markers based on filtered facilities */}
            <AnimatePresence>
              {filteredFacilities.map((facility) => (
                <motion.div
                  key={`marker-${facility.id}`}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  className="absolute z-20 cursor-pointer group"
                  style={{ top: facility.coordinates.top, left: facility.coordinates.left }}
                >
                  <div className="relative flex flex-col items-center">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-[0_5px_15px_rgba(0,0,0,0.1)] border border-gray-100 group-hover:scale-110 group-hover:border-primary transition-all duration-300">
                      {facility.id === 1 ? <Building2 className="w-4 h-4 text-indigo-500" /> : 
                       facility.id === 2 ? <Activity className="w-4 h-4 text-cyan-500" /> : 
                       <Stethoscope className="w-4 h-4 text-emerald-500" />}
                    </div>
                    {/* Tooltip on hover */}
                    <div className="absolute top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-white px-3 py-2 rounded-xl shadow-lg border border-gray-100 whitespace-nowrap z-30 flex flex-col items-center pointer-events-none">
                      <span className="text-xs font-bold text-gray-900 font-satoshi">{facility.name}</span>
                      <span className="text-[10px] text-gray-500 font-inter">{facility.distance} • ETA {facility.time}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

          </div>
        </div>
      </div>
    </section>
  );
}