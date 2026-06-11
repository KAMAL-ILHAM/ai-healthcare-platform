import { BookOpen, Activity, Send, Mic, Shield, Sparkles, Search } from 'lucide-react';
import prisma from '@/lib/prisma';
import Link from 'next/link';
import DashboardStats from './DashboardStats'; 

export default async function DashboardPage() {
  
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
    <div className="h-auto md:h-[calc(100vh-100px)] flex flex-col gap-4 md:gap-6 overflow-visible md:overflow-hidden pb-2">
      {/*   PERBAIKAN MOBILE: h-auto agar bisa di-scroll di HP, md:h-[calc...] hanya untuk laptop */}
      
      <div className="shrink-0">
        <DashboardStats 
          totalArticles={totalArticles.toString()} 
          totalCategories={totalCategories.toString()} 
        />
      </div>

      {/*   PERBAIKAN MOBILE: Jarak grid diperkecil di HP (gap-4) */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 min-h-0">
        
        {/* --- PANEL KIRI: AI CHAT --- */}
        {/*   PERBAIKAN MOBILE: Tinggi statis h-[450px] untuk HP, radius dan padding disesuaikan */}
        <div className="lg:col-span-2 bg-white/80 backdrop-blur-xl border border-white/80 p-4 md:p-6 rounded-[24px] md:rounded-[32px] shadow-sm flex flex-col overflow-hidden h-[450px] md:h-full">
          
          <div className="flex items-center justify-between mb-4 shrink-0 relative">
            <div className="flex items-center gap-2.5 z-10">
              <div className="w-3 h-3 rounded-full bg-rose-400"></div>
              <div className="w-3 h-3 rounded-full bg-amber-400"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="flex items-center gap-2 text-slate-400 font-bold text-[10px] md:text-xs tracking-widest uppercase">
                <Shield className="w-4 h-4 hidden sm:block" />
                AI Assistant
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto space-y-4 md:space-y-6 pr-2 no-scrollbar flex flex-col py-2 min-h-0">
            
            <div className="flex justify-end">
              <div className="bg-slate-900 text-white text-xs md:text-sm px-4 md:px-6 py-3 md:py-4 rounded-[16px] md:rounded-[20px] rounded-tr-sm shadow-md max-w-[85%] md:max-w-[80%] font-medium leading-relaxed">
                Saya diresepkan antibiotik Amoxicillin, tapi saya juga sedang rutin minum antasida untuk lambung. Apakah boleh diminum bersamaan?
              </div>
            </div>

            <div className="flex justify-start gap-2 md:gap-4">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-indigo-600 flex items-center justify-center shrink-0 shadow-md">
                <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-white" />
              </div>
              
              <div className="bg-white border border-slate-200 p-4 md:p-5 rounded-[16px] md:rounded-[20px] rounded-tl-sm shadow-sm max-w-[90%] md:max-w-[85%]">
                <p className="text-slate-700 text-xs md:text-sm leading-relaxed mb-3 md:mb-4">
                  Sebaiknya <span className="font-bold text-indigo-600">jangan diminum bersamaan</span>. Antasida mengandung magnesium/aluminium yang dapat mengikat antibiotik di lambung, sehingga penyerapan Amoxicillin menjadi tidak maksimal.
                </p>
                
                <div className="bg-indigo-50 border border-indigo-100 p-3 md:p-4 rounded-xl flex gap-2 md:gap-3">
                  <Activity className="w-4 h-4 md:w-5 md:h-5 text-indigo-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-[11px] md:text-sm font-bold text-slate-900 mb-1">Rekomendasi Farmasi:</h4>
                    <p className="text-[11px] md:text-sm text-slate-600 leading-relaxed">
                      Beri jeda minimal <b>2 jam</b> antara minum antasida dan antibiotik.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3 md:mt-4 shrink-0 relative">
            <div className="w-full flex items-center bg-slate-50 border border-slate-200 rounded-[20px] md:rounded-3xl py-1.5 md:py-2 px-2 md:px-3 text-sm text-slate-800 shadow-sm">
              <button className="p-1.5 md:p-2 text-slate-400 hover:text-slate-600 transition-colors hidden sm:block">
              </button>
              
              <input 
                type="text" 
                placeholder="Mulai Konsultasi" 
                className="flex-1 bg-transparent border-none focus:outline-none text-slate-800 placeholder:text-slate-400 px-2 md:px-3 text-xs md:text-sm" 
              />
              
              <button className="p-1.5 md:p-2 text-slate-400 hover:text-slate-600 transition-colors mr-1 md:mr-2">
                <Mic className="w-4 h-4 md:w-5 md:h-5" />
              </button>

              <button className="p-1.5 md:p-2 bg-slate-900 text-white rounded-full hover:bg-cyan-500 transition-all shadow-md shrink-0">
                <Send className="w-3.5 h-3.5 md:w-4 md:h-4 ml-0.5" />
              </button>
            </div>
          </div>
        </div>

        {/* --- PANEL KANAN: ARTIKEL --- */}
        {/*   PERBAIKAN MOBILE: Tinggi auto di HP agar list artikel tidak tergencet */}
        <div className="bg-white/60 backdrop-blur-xl border border-white/80 p-4 md:p-6 rounded-[24px] md:rounded-[32px] shadow-sm flex flex-col h-auto md:h-full overflow-hidden min-h-0">
          
          <div className="flex items-center justify-between mb-4 w-full shrink-0">
            <h3 className="text-base md:text-lg font-black text-slate-900 tracking-tight">Terakhir Dibaca</h3>
            <Link href="/dashboard/education" className="text-[10px] md:text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 transition-colors group shrink-0">
              Lihat Semua 
              <Search className="w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="flex-1 md:overflow-y-auto space-y-3 pr-1 no-scrollbar min-h-0">
            {recentArticles.length > 0 ? (
              recentArticles.map((article) => (
                <Link 
                  href={`/dashboard/education/${article.slug}`} 
                  key={article.id}
                  className="block p-3 md:p-3.5 rounded-2xl bg-white border border-slate-100 hover:border-indigo-100 hover:shadow-md transition-all group"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 md:w-9 md:h-9 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0 group-hover:bg-indigo-600 transition-colors">
                      <BookOpen className="w-3.5 h-3.5 md:w-4 md:h-4 text-indigo-600 group-hover:text-white transition-colors" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] md:text-[11px] font-bold text-indigo-600 mb-0.5 truncate">{article.category.name}</p>
                      <h4 className="text-[11px] md:text-xs font-bold text-slate-900 leading-snug line-clamp-2 group-hover:text-indigo-700 transition-colors">
                        {article.title}
                      </h4>
                      <p className="text-[9px] md:text-[10px] text-slate-500 mt-1 font-medium">
                        {new Intl.DateTimeFormat('id-ID', { dateStyle: 'medium' }).format(article.createdAt)}
                      </p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-32 md:h-full text-center bg-slate-50 rounded-2xl border border-slate-100 border-dashed py-6">
                <BookOpen className="w-6 h-6 md:w-7 md:h-7 text-slate-300 mb-2" />
                <p className="text-[11px] md:text-xs font-semibold text-slate-600">Belum ada artikel</p>
              </div>
            )}
          </div>

          <div className="shrink-0 mt-3 md:mt-4">
            <Link href="/dashboard/education" className="flex items-center gap-3 md:gap-4 p-3 md:p-3.5 rounded-2xl bg-indigo-50 border border-indigo-100 hover:bg-indigo-100 transition-colors group">
              <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-indigo-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Search className="w-3 h-3 md:w-3.5 md:h-3.5 text-white" />
              </div>
              <div>
                <h4 className="text-[11px] md:text-xs font-bold text-indigo-900">Cari Artikel</h4>
                <p className="text-[9px] md:text-[11px] text-indigo-700 mt-0.5">Temukan Artikel terbaru.</p>
              </div>
            </Link>
          </div>
          
        </div>
      </div>
    </div>
  );
}