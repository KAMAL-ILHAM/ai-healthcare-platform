import { BookOpen, Activity, Send, Mic, Shield, Sparkles, Search } from 'lucide-react';
import prisma from '@/lib/prisma';
import Link from 'next/link';
import DashboardStats from './DashboardStats'; 

export default async function DashboardPage() {
  
  // AMBIL DATA STATISTIK DARI DATABASE
  const [totalArticles, recentArticles, totalCategories] = await Promise.all([
    prisma.article.count({ where: { status: 'PUBLISHED' } }),
    prisma.article.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: { createdAt: 'desc' },
      take: 3, 
      include: { category: true }
    }),
    prisma.category.count()
  ]);

  return (
    // 🌟 KUNCI 1: h-[calc(...)] disesuaikan dengan tinggi navbar, dan overflow-hidden agar tidak ada scroll global
    <div className="h-[calc(100vh-100px)] flex flex-col gap-6 overflow-hidden pb-2">
      
      {/* --- OVERVIEW STATS CARDS GRID --- */}
      {/* 🌟 KUNCI 2: shrink-0 agar kotak ini ukurannya tetap utuh tidak tergencet */}
      <div className="shrink-0">
        <DashboardStats 
          totalArticles={totalArticles.toString()} 
          totalCategories={totalCategories.toString()} 
        />
      </div>

      {/* --- MAIN CORE GRID --- */}
      {/* 🌟 KUNCI 3: flex-1 dan min-h-0 agar grid ini mengambil SISA tinggi layar tanpa tembus ke bawah */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-0">
        
        {/* --- PANEL KIRI: AI CHAT DUMMY (2 Kolom) --- */}
        <div className="lg:col-span-2 bg-white/80 backdrop-blur-xl border border-white/80 p-6 rounded-[32px] shadow-sm flex flex-col overflow-hidden h-full">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-4 shrink-0 relative">
            <div className="flex items-center gap-2.5 z-10">
              <div className="w-3 h-3 rounded-full bg-rose-400"></div>
              <div className="w-3 h-3 rounded-full bg-amber-400"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="flex items-center gap-2 text-slate-400 font-bold text-xs tracking-widest uppercase">
                <Shield className="w-4 h-4" />
                AI Assistant
              </div>
            </div>
          </div>

          {/* Area Percakapan */}
          {/* 🌟 KUNCI 4: Area ini diberi flex-1, overflow-y-auto, dan min-h-0 agar ia bisa discroll jika isinya panjang */}
          <div className="flex-1 overflow-y-auto space-y-6 pr-2 no-scrollbar flex flex-col py-2 min-h-0">
            
            {/* Pesan Pasien */}
            <div className="flex justify-end">
              <div className="bg-slate-900 text-white text-sm px-6 py-4 rounded-[20px] rounded-tr-sm shadow-md max-w-[80%] font-medium leading-relaxed">
                Saya diresepkan antibiotik Amoxicillin, tapi saya juga sedang rutin minum antasida untuk lambung. Apakah boleh diminum bersamaan?
              </div>
            </div>

            {/* Pesan AI Apoteker */}
            <div className="flex justify-start gap-4">
              <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center shrink-0 shadow-md">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              
              <div className="bg-white border border-slate-200 p-5 rounded-[20px] rounded-tl-sm shadow-sm max-w-[85%]">
                <p className="text-slate-700 text-sm leading-relaxed mb-4">
                  Sebaiknya <span className="font-bold text-indigo-600">jangan diminum bersamaan</span>. Antasida mengandung magnesium/aluminium yang dapat mengikat antibiotik di lambung, sehingga penyerapan Amoxicillin menjadi tidak maksimal.
                </p>
                
                <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-xl flex gap-3">
                  <Activity className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 mb-1">Rekomendasi Farmasi:</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Beri jeda minimal <b>2 jam</b> antara minum antasida dan antibiotik. Pastikan Amoxicillin dihabiskan sesuai resep dokter.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Input Bar Action */}
          {/* 🌟 KUNCI 5: mt-4 dan shrink-0 memastikan input selalu lengket di bawah tanpa ikut terpotong */}
          <div className="mt-4 shrink-0 relative">
            <div className="w-full flex items-center bg-slate-50 border border-slate-200 rounded-3xl py-2 px-3 text-sm text-slate-800 shadow-sm">
              <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
              </button>
              
              <input 
                type="text" 
                placeholder="Mulai Konsultasi" 
                className="flex-1 bg-transparent border-none focus:outline-none text-slate-800 placeholder:text-slate-400 px-3" 
              />
              
              <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors mr-2">
                <Mic className="w-5 h-5" />
              </button>

              <button className="p-2 bg-slate-900 text-white rounded-full hover:bg-cyan-500 transition-all shadow-md">
                <Send className="w-4 h-4 ml-0.5" />
              </button>
            </div>
          </div>
        </div>

        {/* --- PANEL KANAN: ARTIKEL (1 Kolom) --- */}
        <div className="bg-white/60 backdrop-blur-xl border border-white/80 p-6 rounded-[32px] shadow-sm flex flex-col h-full overflow-hidden min-h-0">
          
          <div className="flex items-center justify-between mb-4 w-full shrink-0">
            <h3 className="text-lg font-black text-slate-900 tracking-tight">Terakhir Dibaca</h3>
            <Link href="/dashboard/education" className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 transition-colors group shrink-0">
              Lihat Semua 
              <Search className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* List Artikel */}
          <div className="flex-1 overflow-y-auto space-y-3 pr-1 no-scrollbar min-h-0">
            {recentArticles.length > 0 ? (
              recentArticles.map((article) => (
                <Link 
                  href={`/dashboard/education/${article.slug}`} 
                  key={article.id}
                  className="block p-3.5 rounded-2xl bg-white border border-slate-100 hover:border-indigo-100 hover:shadow-md transition-all group"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0 group-hover:bg-indigo-600 transition-colors">
                      <BookOpen className="w-4 h-4 text-indigo-600 group-hover:text-white transition-colors" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] font-bold text-indigo-600 mb-0.5 truncate">{article.category.name}</p>
                      <h4 className="text-xs font-bold text-slate-900 leading-snug line-clamp-2 group-hover:text-indigo-700 transition-colors">
                        {article.title}
                      </h4>
                      <p className="text-[10px] text-slate-500 mt-1 font-medium">
                        {new Intl.DateTimeFormat('id-ID', { dateStyle: 'medium' }).format(article.createdAt)}
                      </p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center bg-slate-50 rounded-2xl border border-slate-100 border-dashed py-6">
                <BookOpen className="w-7 h-7 text-slate-300 mb-2" />
                <p className="text-xs font-semibold text-slate-600">Belum ada artikel</p>
              </div>
            )}
          </div>

          {/* Quick Action Bottom Card */}
          <div className="shrink-0 mt-4">
            <Link href="/dashboard/education" className="flex items-center gap-4 p-3.5 rounded-2xl bg-indigo-50 border border-indigo-100 hover:bg-indigo-100 transition-colors group">
              <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Search className="w-3.5 h-3.5 text-white" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-indigo-900">Cari Artikel</h4>
                <p className="text-[11px] text-indigo-700 mt-0.5">Temukan Artikel terbaru.</p>
              </div>
            </Link>
          </div>
          
        </div>
      </div>
    </div>
  );
}