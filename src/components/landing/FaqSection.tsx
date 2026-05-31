'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Search, Users, BookOpen, Stethoscope } from 'lucide-react';
import { CircleQuestionMark } from 'lucide-react';


const faqs = [
  {
    question: "Apakah diagnosis dari AI EIOHealth 100% akurat?",
    answer: "AI kami dilatih menggunakan jutaan data farmakologis dan klinis. Namun, sistem ini bertindak sebagai alat triase dan edukasi awal, BUKAN pengganti diagnosis tatap muka dari dokter atau apoteker profesional."
  },
  {
    question: "Bagaimana sistem menjaga kerahasiaan data rekam medis saya?",
    answer: "Semua data medis, riwayat chat AI, dan profil kesehatan Anda dienkripsi secara end-to-end. Kami mematuhi standar keamanan setara HIPAA untuk memastikan tidak ada kebocoran data."
  },
  {
    question: "Apakah saya bisa langsung membeli obat yang direkomendasikan AI?",
    answer: "Untuk obat bebas (OTC), Anda akan diarahkan ke apotek terdekat. Namun, untuk obat keras (Ethical) seperti antibiotik, sistem akan mengingatkan Anda bahwa resep dokter tetap diwajibkan sesuai regulasi BPOM."
  },
  {
    question: "Apakah menggunakan platform EIOHealth ini gratis?",
    answer: "Ya! Fitur inti seperti konsultasi AI dasar, pencarian fasilitas kesehatan terdekat, dan membaca jurnal edukasi dapat diakses secara gratis oleh seluruh pengguna."
  },
  {
    question: "Bagaimana jika AI mendeteksi kondisi gawat darurat?",
    answer: "Sistem kami menggunakan protokol 'Red Flag Detection'. Jika gejala yang Anda masukkan mengarah pada kondisi kritis (misal: serangan jantung), AI akan langsung mengunci layar dan memunculkan tombol panggilan darurat medis."
  },
  {
    question: "Dapatkah saya berkonsultasi dengan apoteker asli?",
    answer: "Tentu. Kami menyediakan fitur 'Live Consult' di dalam dashboard di mana Anda bisa terhubung dengan Apoteker berlisensi untuk pertanyaan terkait dosis dan interaksi obat yang kompleks."
  }
];

const quickLinks = [
  {
    title: "Gabung Komunitas EIO",
    description: "Diskusikan masalah kesehatan umum dan berbagi pengalaman di forum aktif kami.",
    icon: <Users className="w-5 h-5 text-indigo-500" />,
    color: "bg-indigo-50"
  },
  {
    title: "Baca Dokumentasi Medis",
    description: "Pelajari lebih lanjut tentang algoritma AI kami dan cara kami memproses data medis.",
    icon: <BookOpen className="w-5 h-5 text-cyan-500" />,
    color: "bg-cyan-50"
  },
  {
    title: "Konsultasi Ahli",
    description: "Butuh bantuan mendesak? Jadwalkan telekonsultasi dengan tim dokter & apoteker kami.",
    icon: <Stethoscope className="w-5 h-5 text-emerald-500" />,
    color: "bg-emerald-50"
  }
];

export default function FaqSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-1 bg-white relative z-4">
      <div className="container mx-auto px-3 max-w-6xl relative z-10">
        
        {/* TOP SECTION: BIG SEARCH HEADER (Sesuai Referensi) */}
        <div className="relative w-full rounded-[3rem] bg-gradient-to-b from-[#FAFCFF] to-transparent border border-gray-100 px-6 py-16 md:py-24 text-center mb-16 overflow-hidden">
          {/* Subtle Ambient Background */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-[200px] bg-primary/5 rounded-full blur-[80px] pointer-events-none" />
          <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 border border-gray-100 shadow-sm mb-4"
            >
              <CircleQuestionMark className="w-4 h-4 text-primary" />
              <span className="text-sm font-bold text-gray-800 tracking-wide font-satoshi uppercase">FAQ</span>
            </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-4xl md:text-[3.5rem] font-extrabold text-gray-900 mb-10 font-satoshi tracking-tight"
          >
            Pusat Bantuan
          </motion.h2>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="max-w-2xl mx-auto relative"
          >
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Cari FAQ, panduan, atau artikel medis..." 
              className="w-full bg-white/80 backdrop-blur-md border border-gray-200 text-gray-900 placeholder-gray-400 text-base md:text-lg rounded-full py-4 pl-14 pr-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all"
            />
          </motion.div>
        </div>

        {/* BOTTOM SECTION: SPLIT LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* LEFT: MINIMALIST ACCORDION (Col-span 7) */}
          <div className="lg:col-span-7">
            <h3 className="text-2xl font-bold text-gray-900 font-satoshi mb-8">Pertanyaan Umum</h3>
            
            <div className="flex flex-col">
              {faqs.map((faq, index) => {
                const isActive = activeIndex === index;
                return (
                  <div key={index} className="border-b border-gray-100 last:border-0">
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full flex items-center justify-between py-5 text-left group"
                    >
                      <div className="flex items-start gap-4">
                        <motion.div
                          animate={{ rotate: isActive ? 90 : 0 }} // Rotate panah ke bawah jika aktif
                          transition={{ duration: 0.2, ease: "easeInOut" }}
                          className="mt-0.5 text-gray-400 group-hover:text-primary transition-colors shrink-0"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </motion.div>
                        <span className={`text-[15px] md:text-base font-medium font-satoshi transition-colors ${isActive ? 'text-gray-900 font-bold' : 'text-gray-700 group-hover:text-gray-900'}`}>
                          {faq.question}
                        </span>
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        >
                          <div className="pl-9 pr-4 pb-6 text-sm md:text-[15px] text-gray-500 font-inter leading-relaxed">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT: QUICK LINKS (Col-span 5) */}
          <div className="lg:col-span-5">
            <h3 className="text-2xl font-bold text-gray-900 font-satoshi mb-8">Tautan Cepat</h3>
            
            <div className="flex flex-col gap-4">
              {quickLinks.map((link, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}
                  className="bg-gray-50/80 hover:bg-white p-6 rounded-[1.5rem] border border-transparent hover:border-gray-200 shadow-none hover:shadow-[0_10px_30px_rgba(0,0,0,0.04)] transition-all duration-300 cursor-pointer group"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-full ${link.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                      {link.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 font-satoshi mb-1 group-hover:text-primary transition-colors">
                        {link.title}
                      </h4>
                      <p className="text-sm text-gray-500 font-inter leading-relaxed">
                        {link.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}