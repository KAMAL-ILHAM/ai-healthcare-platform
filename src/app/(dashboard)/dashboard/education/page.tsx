'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, Bookmark, Heart, Search, Sparkles, 
  Clock, ArrowRight, ChevronRight, PlayCircle, Filter,
  TrendingUp, Activity
} from 'lucide-react';

// --- MOCK DATA ---
const categories = ['Semua Topik', 'Kesehatan Umum', 'Obat & Farmasi', 'Mental Health', 'Nutrisi', 'Penyakit', 'Fitness', 'AI Healthcare'];

const featuredArticle = {
  title: "Masa Depan Farmasi Klinis: Integrasi AI dalam Pemantauan Efek Samping Obat",
  excerpt: "Bagaimana kecerdasan buatan merevolusi cara apoteker memprediksi dan memitigasi interaksi obat yang kompleks secara real-time.",
  category: "AI Healthcare",
  readTime: "8 min read",
  author: "Dr. Sarah Chen",
  image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=2070&auto=format&fit=crop"
};

const articles = [
  { id: 1, title: "Memahami Double Cleansing: Panduan Medis untuk Skin Barrier", category: "Kesehatan Umum", time: "5 min", likes: 124 },
  { id: 2, title: "Protokol Baru Penanganan Resistensi Antibiotik 2026", category: "Obat & Farmasi", time: "12 min", likes: 342 },
  { id: 3, title: "Dampak Kurang Tidur Terhadap Produksi Kortisol", category: "Mental Health", time: "6 min", likes: 89 },
  { id: 4, title: "Analisis Nutrisi Mikrobioma Usus Modern", category: "Nutrisi", time: "7 min", likes: 210 },
];

const trendingTopics = [
  { rank: "01", title: "Panduan Vaksinasi Influenza Tipe Baru", views: "24.5k" },
  { rank: "02", title: "Mitos & Fakta Suplemen Kolagen", views: "18.2k" },
  { rank: "03", title: "Manajemen Stres Pasca Pandemi", views: "15.8k" },
];

export default function EducationPage() {
  const [activeCategory, setActiveCategory] = useState('Semua Topik');
  const [searchQuery, setSearchQuery] = useState('');

  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">

      {/* --- CATEGORY FILTER TABS --- */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
        {categories.map((cat) => (
          <button
            key={cat} onClick={() => setActiveCategory(cat)}
            className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
              activeCategory === cat 
                ? 'bg-gradient-to-r from-indigo-600 to-cyan-500 text-white shadow-md' 
                : 'bg-white/50 backdrop-blur-md text-gray-600 hover:bg-white border border-white/60'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* --- MAIN GRID LAYOUT --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* KOLOM KIRI (Konten Utama - Span 2) */}
        <motion.div 
          variants={containerVariants} initial="hidden" animate="show" 
          className="lg:col-span-2 space-y-8"
        >
          {/* HERO FEATURED ARTICLE */}
          <motion.div variants={itemVariants} className="relative w-full h-[400px] rounded-[32px] overflow-hidden group cursor-pointer shadow-[0_8px_32px_rgba(0,0,0,0.05)]">
            <div className="absolute inset-0 bg-gray-900">
              <img src={featuredArticle.image} alt="Featured" className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700 ease-out" />
            </div>
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
            
            <div className="absolute inset-0 p-8 flex flex-col justify-end">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-cyan-500/20 backdrop-blur-md border border-cyan-400/30 text-cyan-300 text-xs font-bold rounded-full flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3" /> {featuredArticle.category}
                </span>
                <span className="text-gray-300 text-xs font-medium flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {featuredArticle.readTime}
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-3 tracking-tight group-hover:text-cyan-100 transition-colors">
                {featuredArticle.title}
              </h2>
              <p className="text-gray-300 text-sm md:text-base line-clamp-2 max-w-2xl mb-6">
                {featuredArticle.excerpt}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-400 to-indigo-500 p-[2px]">
                    <div className="w-full h-full rounded-full bg-gray-900 border-2 border-transparent flex items-center justify-center text-white text-xs font-bold">SC</div>
                  </div>
                  <span className="text-white text-sm font-medium">{featuredArticle.author}</span>
                </div>
                <button className="flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white text-white hover:text-gray-900 backdrop-blur-md border border-white/20 rounded-xl text-sm font-bold transition-all duration-300">
                  Baca Artikel <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* ARTICLE GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articles.map((article) => (
              <motion.div 
                key={article.id} variants={itemVariants}
                className="bg-white/60 backdrop-blur-xl border border-white/80 p-5 rounded-[28px] shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(79,70,229,0.08)] hover:-translate-y-1 transition-all duration-300 group cursor-pointer flex flex-col justify-between h-56"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg">
                      {article.category}
                    </span>
                    <button className="p-2 bg-white rounded-full shadow-sm text-gray-400 hover:text-rose-500 transition-colors">
                      <Bookmark className="w-4 h-4" />
                    </button>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 leading-snug group-hover:text-indigo-600 transition-colors line-clamp-3">
                    {article.title}
                  </h3>
                </div>
                
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100/60">
                  <div className="flex items-center gap-3 text-xs font-medium text-gray-500">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {article.time}</span>
                    <span className="flex items-center gap-1"><Heart className="w-3 h-3" /> {article.likes}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* KOLOM KANAN (Widgets - Span 1) */}
        <div className="space-y-6">
          
          {/* AI RECOMMENDATION WIDGET */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-indigo-900 to-gray-900 p-6 rounded-[32px] shadow-2xl relative overflow-hidden group"
          >
            {/* Animated Background Effects */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/20 blur-3xl rounded-full" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/30 blur-3xl rounded-full" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-2 text-cyan-300 mb-4">
                <Sparkles className="w-5 h-5" />
                <h3 className="text-sm font-bold uppercase tracking-widest">AI Recommended</h3>
              </div>
              <p className="text-gray-300 text-sm mb-5 leading-relaxed">
                Berdasarkan keahlian Anda di bidang Farmasi, AI merekomendasikan jurnal terbaru terkait interaksi obat kardiovaskular.
              </p>
              
              <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-4 hover:bg-white/20 transition-colors cursor-pointer group/card">
                <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center mb-3">
                  <Activity className="w-4 h-4 text-cyan-300" />
                </div>
                <h4 className="text-white font-bold text-sm leading-snug mb-2 group-hover/card:text-cyan-200 transition-colors">
                  Jurnal Farmakologi: Update Interaksi Statin & Antibiotik Makrolida
                </h4>
                <div className="flex items-center text-xs text-cyan-200/70">
                  <span>Diterbitkan 2 hari lalu</span>
                  <ArrowRight className="w-3 h-3 ml-auto opacity-0 group-hover/card:opacity-100 group-hover/card:translate-x-1 transition-all" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* TRENDING TOPICS */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="bg-white/60 backdrop-blur-xl border border-white/80 p-6 rounded-[32px] shadow-[0_8px_32px_rgba(0,0,0,0.03)]"
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 bg-rose-50 rounded-xl">
                <TrendingUp className="w-5 h-5 text-rose-500" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Trending Topik</h3>
            </div>
            
            <div className="space-y-5">
              {trendingTopics.map((topic, index) => (
                <div key={index} className="flex items-start gap-4 group cursor-pointer">
                  <span className="text-2xl font-extrabold text-gray-200 group-hover:text-indigo-200 transition-colors">
                    {topic.rank}
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 group-hover:text-indigo-600 transition-colors leading-snug">
                      {topic.title}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1 font-medium">{topic.views} pembaca</p>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-6 py-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-600 text-sm font-bold rounded-xl transition-colors">
              Lihat Semua Trending
            </button>
          </motion.div>

          {/* CONTINUE READING WIDGET */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="bg-white/60 backdrop-blur-xl border border-white/80 p-6 rounded-[32px] shadow-[0_8px_32px_rgba(0,0,0,0.03)] flex items-center justify-between cursor-pointer hover:shadow-lg transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-inner">
                <PlayCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-0.5">Lanjut Baca</p>
                <h4 className="text-sm font-bold text-gray-900 leading-snug">Panduan Skincare Malam...</h4>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}