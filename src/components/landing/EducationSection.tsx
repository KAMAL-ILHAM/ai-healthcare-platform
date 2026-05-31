'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookMarked, ArrowUpRight, Clock, Star, Sparkles, BookOpen } from 'lucide-react';

const categories = ["Terbaru", "Farmakologi", "Gaya Hidup", "Mental Health", "Nutrisi"];

const trendingArticles = [
  {
    id: 1,
    title: "Memahami Interaksi Obat: Antasida dan Antibiotik",
    category: "Farmakologi",
    readTime: "5 min read",
    author: "Apt. Kamal Ilham",
    color: "from-blue-400 to-indigo-500"
  },
  {
    id: 2,
    title: "Mengelola Sindrom Dispepsia di Tengah Kesibukan",
    category: "Gaya Hidup",
    readTime: "4 min read",
    author: "Dr. Sarah",
    color: "from-emerald-400 to-teal-500"
  },
  {
    id: 3,
    title: "Mitos dan Fakta Seputar Suplemen Vitamin C Dosis Tinggi",
    category: "Nutrisi",
    readTime: "6 min read",
    author: "Apt. Budi",
    color: "from-amber-400 to-orange-500"
  }
];

export default function EducationSection() {
  const [activeCategory, setActiveCategory] = useState("Terbaru");

  return (
    <section id="education" className="py-16 bg-white relative overflow-hidden z-8">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* SECTION HEADER & TABS */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 border border-gray-100 shadow-sm mb-4"
            >
              <BookOpen className="w-4 h-4 text-primary" />
              <span className="text-sm font-bold text-gray-800 tracking-wide font-satoshi uppercase">Pusat Edukasi</span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-extrabold text-gray-900 font-satoshi tracking-tight"
            >
              Wawasan Medis <span className="italic font-light text-gradient-cyan-indigo">Terpercaya.</span>
            </motion.h2>
          </div>

          {/* Category Tabs */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar w-full md:w-auto"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 font-inter whitespace-nowrap ${
                  activeCategory === cat 
                    ? 'bg-gray-900 text-white shadow-md' 
                    : 'bg-white border border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        {/* LAYOUT GRID: FEATURED (Left) & TRENDING (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* FEATURED ARTICLE (col-span-7) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="lg:col-span-7 group cursor-pointer"
          >
            <div className="relative w-full h-[400px] rounded-[2rem] overflow-hidden mb-6 shadow-sm border border-gray-100">
              {/* Premium Image Placeholder */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-blue-100 transition-transform duration-700 group-hover:scale-105">
                <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_50%_0%,#4F46E5_0%,transparent_70%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.4)_1px,transparent_1px)] bg-[size:20px_20px]" />
              </div>
              
              {/* Floating Badges */}
              <div className="absolute top-5 left-5 flex gap-2">
                <span className="px-3 py-1 bg-white/80 backdrop-blur-md rounded-full text-xs font-bold text-primary flex items-center gap-1 shadow-sm">
                  <Star className="w-3 h-3 fill-primary" /> Pilihan Redaksi
                </span>
              </div>
              <button className="absolute top-5 right-5 w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-gray-400 hover:text-primary transition-colors shadow-sm z-10">
                <BookMarked className="w-5 h-5" />
              </button>
            </div>

            <div className="pr-4">
              <div className="flex items-center gap-3 text-xs font-semibold text-gray-500 mb-3 font-inter">
                <span className="uppercase tracking-wider text-primary">Kesehatan Umum</span>
                <div className="w-1 h-1 bg-gray-300 rounded-full" />
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> 8 min read</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 font-satoshi leading-snug mb-3 group-hover:text-primary transition-colors">
                Panduan Lengkap Merawat Diri di Era Cuaca Ekstrem Tropis
              </h3>
              <p className="text-gray-500 font-inter line-clamp-2 leading-relaxed mb-4">
                Perubahan cuaca yang drastis dapat memicu penurunan imun. Pelajari langkah-langkah farmakologis dan gaya hidup untuk menjaga tubuh tetap prima.
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600">
                    KI
                  </div>
                  <span className="text-sm font-bold text-gray-900 font-satoshi">Apt. Kamal Ilham</span>
                </div>
                <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* TRENDING ARTICLES (col-span-5) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <h4 className="text-lg font-bold font-satoshi text-gray-900 border-b border-gray-100 pb-2">Sedang Tren</h4>
            
            {trendingArticles.map((article, index) => (
              <motion.div 
                key={article.id}
                initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.15 }}
                className="group flex gap-4 cursor-pointer p-3 -mx-3 rounded-2xl hover:bg-gray-50 transition-colors"
              >
                <div className={`w-28 h-24 rounded-xl bg-gradient-to-br ${article.color} shrink-0 overflow-hidden relative shadow-sm`}>
                   <div className="absolute inset-0 bg-white/20 group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="flex flex-col justify-center">
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1 font-inter">{article.category}</div>
                  <h5 className="font-bold text-gray-900 font-satoshi leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {article.title}
                  </h5>
                  <div className="flex items-center gap-2 text-xs font-medium text-gray-500 font-inter">
                    <span>{article.author}</span>
                    <div className="w-1 h-1 bg-gray-300 rounded-full" />
                    <span>{article.readTime}</span>
                  </div>
                </div>
              </motion.div>
            ))}

            <button className="mt-4 w-full py-4 rounded-xl border border-gray-200 text-sm font-bold text-gray-600 hover:border-gray-900 hover:text-gray-900 transition-colors font-satoshi">
              Lihat Semua Artikel
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}