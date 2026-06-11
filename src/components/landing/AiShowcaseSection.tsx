'use client';

import { motion } from 'framer-motion';
import { Bot, Sparkles, Activity, AlertTriangle, Stethoscope, MapPin, ChevronRight, CheckCircle2, ArrowRight } from 'lucide-react';

export default function AiShowcaseSection() {
  return (
    //   PERBAIKAN MOBILE: Padding vertikal disesuaikan (py-12 di HP, py-16 di Desktop)
    <section id="ai-health" className="py-12 md:py-16 bg-[#FAFCFF] relative overflow-hidden z-10">
      
      {/* Background Soft Glow & Blur */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
      <div className="absolute -top-40 right-[-10%] w-[600px] h-[600px] bg-cyan-400/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/*   PERBAIKAN MOBILE: Padding horizontal disesuaikan (px-4 di HP, px-6 di Desktop) */}
      <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 md:gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-white border border-gray-100 shadow-sm mb-4 md:mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary" />
            <span className="text-xs md:text-sm font-bold text-gray-800 tracking-wide font-satoshi uppercase">
              Intelegensi Buatan
            </span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            //   PERBAIKAN MOBILE: Ukuran font judul disesuaikan
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 md:mb-6 font-satoshi tracking-tight"
          >
            Konsultasi Medis <br className="md:hidden" />
            <span className="italic font-light text-gradient-cyan-indigo">Reimagined.</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            //   PERBAIKAN MOBILE: Ukuran deskripsi disesuaikan
            className="text-sm sm:text-base md:text-lg text-gray-500 font-inter max-w-2xl mx-auto"
          >
            Asisten AI kami menganalisis gejala Anda secara real-time, memberikan edukasi awal, dan merekomendasikan langkah medis selanjutnya dengan presisi tinggi.
          </motion.p>
        </div>

        {/* SPLIT LAYOUT: Chat (Left) & Panel (Right) */}
        {/*   PERBAIKAN MOBILE: Jarak antar kolom diperkecil di HP (gap-6) */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-8 items-center">
          
          {/* LEFT: Chat UI Interface (col-span-3) */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            //   PERBAIKAN MOBILE: Tinggi (h-[420px]) dan border-radius diperkecil di HP
            className="lg:col-span-3 bg-white/70 backdrop-blur-2xl rounded-[24px] md:rounded-[2.5rem] border border-white shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col h-[420px] md:h-[550px]"
          >
            {/* Header Chat */}
            <div className="h-14 md:h-16 border-b border-gray-100 bg-white/50 flex items-center px-4 md:px-6 justify-between shrink-0">
              <div className="flex items-center gap-2.5 md:gap-3">
                <div className="relative">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-primary to-cyan-500 flex items-center justify-center shadow-md">
                    <Bot className="w-4 h-4 md:w-5 md:h-5 text-white" />
                  </div>
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 md:w-3 md:h-3 bg-green-500 border-2 border-white rounded-full" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 font-satoshi text-xs md:text-sm">Dr. EIO Assistant</h3>
                  <p className="text-[10px] md:text-xs text-primary font-medium">Sedang mengetik...</p>
                </div>
              </div>
            </div>

            {/* Area Chat Area */}
            <div className="flex-1 p-4 md:p-6 overflow-y-auto flex flex-col gap-4 md:gap-6 bg-gradient-to-b from-transparent to-gray-50/50 scrollbar-thin">
              
              {/* User Message 1 */}
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                //   PERBAIKAN MOBILE: Lebar font, padding disesuaikan
                className="self-end bg-gradient-to-r from-gray-900 to-gray-800 text-white p-3 md:p-4 rounded-[16px] md:rounded-2xl rounded-tr-sm shadow-md max-w-[85%] md:max-w-[80%] font-inter text-[12px] md:text-sm leading-relaxed"
              >
                Dok, sejak pagi saya merasa mual, pusing, dan ada nyeri di bagian ulu hati. Semalam saya telat makan.
              </motion.div>

              {/* AI Response 1 */}
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.8 }}
                className="self-start flex gap-2 md:gap-3 max-w-[90%] md:max-w-[85%]"
              >
                <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-primary to-cyan-500 flex items-center justify-center shrink-0 shadow-sm mt-0.5 md:mt-1">
                  <Bot className="w-3.5 h-3.5 md:w-4 md:h-4 text-white" />
                </div>
                <div className="bg-white border border-gray-100 text-gray-700 p-3 md:p-4 rounded-[16px] md:rounded-2xl rounded-tl-sm shadow-sm font-inter text-[12px] md:text-sm leading-relaxed">
                  Berdasarkan gejala mual, pusing, dan nyeri ulu hati setelah terlambat makan, ini mengindikasikan adanya peningkatan asam lambung (Sindrom Dispepsia). Apakah ada gejala lain seperti muntah atau demam?
                </div>
              </motion.div>

              {/* User Message 2 */}
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true }} transition={{ delay: 1.6 }}
                className="self-end bg-gradient-to-r from-gray-900 to-gray-800 text-white p-3 md:p-4 rounded-[16px] md:rounded-2xl rounded-tr-sm shadow-md max-w-[85%] md:max-w-[80%] font-inter text-[12px] md:text-sm leading-relaxed"
              >
                Tidak ada demam, tapi terasa sedikit perih. Apa yang harus saya lakukan sekarang?
              </motion.div>

              {/* AI Typing Indicator */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 2.2 }}
                className="self-start flex gap-2 md:gap-3 items-end"
              >
                <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0 border border-gray-200">
                  <Bot className="w-3.5 h-3.5 md:w-4 md:h-4 text-gray-400" />
                </div>
                <div className="bg-white border border-gray-100 px-3 py-2 md:px-4 md:py-3 rounded-[16px] md:rounded-2xl rounded-tl-sm shadow-sm flex gap-1.5 items-center h-[34px] md:h-[42px]">
                  <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0 }} className="w-1.5 h-1.5 bg-primary/60 rounded-full" />
                  <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-primary/60 rounded-full" />
                  <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-primary/60 rounded-full" />
                </div>
              </motion.div>

            </div>

            {/* Input Mockup */}
            <div className="p-3 md:p-4 bg-white border-t border-gray-50 shrink-0">
              <div className="h-10 md:h-12 bg-gray-50 border border-gray-100 rounded-full flex items-center px-3 md:px-4 justify-between">
                <span className="text-gray-400 text-xs md:text-sm font-inter">Ketik balasan Anda...</span>
                <div className="w-7 h-7 md:w-8 md:h-8 bg-primary rounded-full flex items-center justify-center shadow-md">
                  <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4 text-white" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Recommendation Panel (col-span-2) */}
          <div className="lg:col-span-2 flex flex-col gap-3 md:gap-4">
            
            {/* AI Diagnosis Indicator */}
            <motion.div 
              initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}
              //   PERBAIKAN MOBILE: Padding & Radius
              className="bg-white rounded-[20px] md:rounded-3xl p-4 md:p-5 border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-md transition-shadow relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500" />
              <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
                <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-cyan-50 flex items-center justify-center">
                  <Activity className="w-3.5 h-3.5 md:w-4 md:h-4 text-cyan-600" />
                </div>
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-gray-400">Analisis Gejala (AI)</span>
              </div>
              <h4 className="text-base md:text-lg font-bold text-gray-900 font-satoshi mb-1.5 md:mb-2">Sindrom Dispepsia</h4>
              <p className="text-[13px] md:text-sm text-gray-500 font-inter leading-relaxed mb-3 md:mb-4">Peningkatan asam lambung akibat iritasi mukosa atau pola makan yang tidak teratur.</p>
              
              {/* Symptom Tags */}
              <div className="flex flex-wrap gap-1.5 md:gap-2">
                {["Mual", "Pusing", "Nyeri Ulu Hati"].map((tag, i) => (
                  <span key={i} className="px-2 py-1 md:px-2.5 md:py-1 rounded-md bg-gray-50 border border-gray-200 text-[10px] md:text-[11px] font-semibold text-gray-600">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Severity Card */}
            <motion.div 
              initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-white rounded-[20px] md:rounded-3xl p-4 md:p-5 border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-center mb-3 md:mb-4">
                <div className="flex items-center gap-1.5 md:gap-2">
                  <AlertTriangle className="w-3.5 h-3.5 md:w-4 md:h-4 text-amber-500" />
                  <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-gray-400">Keparahan</span>
                </div>
                <span className="text-[10px] md:text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-md">Ringan - Sedang</span>
              </div>
              <div className="w-full h-1.5 md:h-2 bg-gray-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }} whileInView={{ width: "40%" }} viewport={{ once: true }} transition={{ duration: 1, delay: 1 }}
                  className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full" 
                />
              </div>
              <p className="text-[10px] md:text-[11px] text-gray-500 mt-2.5 md:mt-3 font-inter">Kondisi dapat ditangani dengan istirahat dan obat antasida awal.</p>
            </motion.div>

            {/* Pharmacy Recommendation Card */}
            <motion.div 
              initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.7 }}
              className="bg-gradient-to-br from-blue-50 to-indigo-50/50 rounded-[20px] md:rounded-3xl p-4 md:p-5 border border-blue-100/50 shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2.5 md:gap-3">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-white flex items-center justify-center shadow-sm text-primary shrink-0">
                    <Stethoscope className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                  <div>
                    <h4 className="text-[13px] md:text-sm font-bold text-gray-900 font-satoshi leading-tight">Tindakan Disarankan</h4>
                    <span className="text-[10px] md:text-[11px] font-medium text-primary">Beli Obat & Istirahat</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-gray-400 group-hover:text-primary transition-colors group-hover:translate-x-1 shrink-0" />
              </div>
              
              <div className="bg-white rounded-xl md:rounded-2xl p-2.5 md:p-3 border border-white flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-1.5 md:gap-2 text-[11px] md:text-xs font-medium text-gray-600">
                  <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4 text-emerald-500 shrink-0" /> <span className="truncate">Apotek Kimia Farma</span>
                </div>
                <span className="text-[9px] md:text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 md:px-2 py-0.5 md:py-1 rounded-full shrink-0">1.2 km</span>
              </div>
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  );
}