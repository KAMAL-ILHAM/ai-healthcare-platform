'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, Sparkles, Clock, ArrowRight, ChevronRight, TrendingUp, Activity
} from 'lucide-react';
import Link from 'next/link';

// Definisi Tipe Data Props
interface ArticleProps {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  likes: number;
  author: string;
  image: string;
  url: string;
  isApi: boolean;
}

interface TrendingProps {
  rank: string;
  title: string;
  views: string;
  url: string;
  isApi: boolean;
}

export default function EducationClient({ 
  initialCategories, 
  featuredArticle, 
  articles,
  trendingTopics
}: { 
  initialCategories: string[], 
  featuredArticle: ArticleProps | null, 
  articles: ArticleProps[],
  trendingTopics: TrendingProps[]
}) {
  const [activeCategory, setActiveCategory] = useState('Semua Topik');

  // Logika Filter
  const filteredArticles = activeCategory === 'Semua Topik' 
    ? articles 
    : articles.filter(article => article.category === activeCategory);

  // Animasi Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">

      {/* TABS KATEGORI - Margin & padding disesuaikan agar lebih proporsional */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3">
        {initialCategories.map((cat) => (
          <button
            key={cat} onClick={() => setActiveCategory(cat)}
            className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
              activeCategory === cat 
                ? 'bg-gradient-to-r from-indigo-600 to-cyan-500 text-white shadow-md' 
                : 'bg-white/60 backdrop-blur-md text-slate-600 hover:bg-white hover:text-indigo-600 border border-white/60'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* PERBAIKAN LAYOUT: items-start agar kolom kanan bisa sticky */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* KONTEN UTAMA (KIRI) */}
        <motion.div variants={containerVariants} initial="hidden" animate="show" className="lg:col-span-2 space-y-8">
          
          {/* ARTIKEL UTAMA (FEATURED) - Proporsi dipertahankan, tipografi dihaluskan */}
          {featuredArticle && activeCategory === 'Semua Topik' && (
            <Link href={featuredArticle.url} target={featuredArticle.isApi ? "_blank" : "_self"} className="block">
              <motion.div variants={itemVariants} className="relative w-full h-[380px] rounded-[28px] overflow-hidden group cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500">
                <div className="absolute inset-0 bg-slate-900">
                  <img src={featuredArticle.image} alt={featuredArticle.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700 ease-out" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
                
                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 bg-cyan-500/20 backdrop-blur-md border border-cyan-400/30 text-cyan-300 text-xs font-bold rounded-full flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3" /> {featuredArticle.category}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-white leading-tight mb-2 tracking-tight group-hover:text-cyan-100 transition-colors line-clamp-2 md:line-clamp-3">
                    {featuredArticle.title}
                  </h2>
                  <p className="text-slate-300 text-sm md:text-base line-clamp-2 max-w-2xl mb-5 font-medium">
                    {featuredArticle.excerpt}
                  </p>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-white text-xs font-bold border border-slate-600 shadow-sm">
                      {featuredArticle.author.substring(0, 2).toUpperCase()}
                    </div>
                    <span className="text-white text-sm font-semibold">{featuredArticle.author}</span>
                  </div>
                </div>
              </motion.div>
            </Link>
          )}

          {/* 
            🌟 PERBAIKAN SCROLL INTERNAL:
            Area daftar artikel dibungkus container dengan max-height. 
            Mencegah halaman memanjang tanpa batas.
          */}
          <div className="max-h-[560px] overflow-y-auto pr-2 pb-4 no-scrollbar">
            {filteredArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {filteredArticles.map((article) => (
                  <Link key={article.id} href={article.url} target={article.isApi ? "_blank" : "_self"} className="block h-full">
                    {/* PERBAIKAN CARD: Padding konsisten, layout flex flex-col agar isi rapi */}
                    <motion.div variants={itemVariants} className="bg-white/70 backdrop-blur-xl border border-white/80 p-4 rounded-3xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group cursor-pointer flex flex-col h-full">
                      
                      {/* PERBAIKAN GAMBAR: Menggunakan aspect-video agar proporsinya seragam */}
                      <div className="w-full aspect-video mb-4 rounded-2xl overflow-hidden relative shadow-sm">
                        <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute top-2 left-2">
                          <span className="text-[10px] font-bold text-slate-800 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-lg shadow-sm">
                            {article.category}
                          </span>
                        </div>
                      </div>
                      
                      {/* PERBAIKAN TEKS: Hierarki diperjelas */}
                      <div className="flex-1 flex flex-col">
                        <h3 className="text-base font-bold text-slate-800 leading-snug group-hover:text-indigo-600 transition-colors line-clamp-2 mb-2">
                          {article.title}
                        </h3>
                        
                        {/* Area metadata di-push ke bawah menggunakan mt-auto */}
                        <div className="mt-auto pt-3 border-t border-slate-100/60 flex items-center justify-between">
                          <div className="flex items-center gap-3 text-[11px] font-semibold text-slate-500">
                            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {article.readTime}</span>
                            <span className="flex items-center gap-1.5"><Heart className="w-3.5 h-3.5 text-rose-400" /> {article.likes}</span>
                          </div>
                          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>

                    </motion.div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="py-16 text-center text-slate-500 bg-white/40 rounded-3xl border border-white/60 font-medium">
                Belum ada artikel untuk kategori ini.
              </div>
            )}
          </div>
        </motion.div>

        {/* 
          🌟 PERBAIKAN WIDGET (KANAN): 
          Menjadi sticky, tetap terlihat saat user men-scroll daftar artikel di kiri.
        */}
        <div className="space-y-6 lg:sticky lg:top-6">
          
          {/* AI RECOMMENDATION */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="bg-gradient-to-br from-[#1A2352] to-[#0F172A] p-6 rounded-[28px] shadow-xl relative overflow-hidden group border border-white/5">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-3xl rounded-full" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/20 blur-3xl rounded-full" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-2 text-cyan-300 mb-3">
                <Sparkles className="w-4 h-4" />
                <h3 className="text-[11px] font-bold uppercase tracking-widest">AI Recommended</h3>
              </div>
              <p className="text-slate-300 text-sm mb-5 leading-relaxed font-medium">
                Berdasarkan riwayat bacaan kesehatan Anda, AI merekomendasikan artikel ini.
              </p>
              
              {articles.length > 0 && (
                <Link href={articles[0].url} target={articles[0].isApi ? "_blank" : "_self"} className="block">
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-colors group/card">
                    <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center mb-3">
                      <Activity className="w-4 h-4 text-cyan-300" />
                    </div>
                    <h4 className="text-white font-bold text-sm leading-snug mb-2 group-hover/card:text-cyan-200 transition-colors line-clamp-2">
                      {articles[0].title}
                    </h4>
                    <div className="flex items-center text-[11px] text-cyan-200/60 font-medium">
                      <span>Rekomendasi Pintar</span>
                      <ArrowRight className="w-3 h-3 ml-auto opacity-0 group-hover/card:opacity-100 group-hover/card:translate-x-1 transition-all" />
                    </div>
                  </div>
                </Link>
              )}
            </div>
          </motion.div>

          {/* TRENDING TOPICS DINAMIS */}
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white/70 backdrop-blur-xl border border-white/80 p-6 rounded-[28px] shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-rose-50 rounded-xl">
                <TrendingUp className="w-4 h-4 text-rose-500" />
              </div>
              <h3 className="text-base font-extrabold text-slate-800">Trending Topik</h3>
            </div>
            
            <div className="space-y-4">
              {trendingTopics.map((topic, index) => (
                <Link key={index} href={topic.url} target={topic.isApi ? "_blank" : "_self"} className="block">
                  <div className="flex items-start gap-4 group mb-1">
                    <span className="text-2xl font-black text-slate-200 group-hover:text-indigo-200 transition-colors mt-0.5">
                      {topic.rank}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800 group-hover:text-indigo-600 transition-colors leading-snug line-clamp-2">
                        {topic.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-1 font-semibold">{topic.views} pembaca</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}