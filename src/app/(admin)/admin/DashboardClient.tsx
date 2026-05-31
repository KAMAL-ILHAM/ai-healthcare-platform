'use client';

import { useState, useEffect } from 'react';
import { FileText, BookOpen, Tags, Users, ArrowUpRight, ChevronLeft, ChevronRight, BarChart3, PieChart as PieIcon, LineChart as LineIcon, BarChart, X, Maximize2 } from 'lucide-react';
import Link from 'next/link';

function timeAgo(dateParam: string | Date) {
  const date = new Date(dateParam);
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " tahun lalu";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " bulan lalu";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " hari lalu";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " jam lalu";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " menit lalu";
  return "Baru saja";
}

interface DashboardProps {
  stats: {
    totalArticles: number;
    publishedArticles: number;
    activeCategories: number;
    regularUsersCount: number;
  };
  latestArticles: any[];
  recentActivities: any[];
}

export default function DashboardClient({ stats, latestArticles, recentActivities }: DashboardProps) {
  
  const [isArticlesModalOpen, setIsArticlesModalOpen] = useState(false);
  const [isActivitiesModalOpen, setIsActivitiesModalOpen] = useState(false);

  // 🌟 OKE MASUK: Batasi tampilan awal hanya 3 item saja di Dashboard
  const displayedArticles = latestArticles.slice(0, 3);
  const displayedActivities = recentActivities.slice(0, 3);

  useEffect(() => {
    if (isArticlesModalOpen || isActivitiesModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isArticlesModalOpen, isActivitiesModalOpen]);

  // --- DATA DUMMY GRAFIK ---
  const dummyCategoryData = [
    { name: 'Farmakologi', count: 45, percentage: 33 },
    { name: 'Kesehatan Anak', count: 28, percentage: 21 },
    { name: 'Edukasi Pasien', count: 32, percentage: 23 },
    { name: 'Obat Bebas', count: 19, percentage: 14 },
    { name: 'Jurnal Medis', count: 12, percentage: 9 },
  ];
  const dummyTimelineMonths = ['Jan 26', 'Feb 26', 'Mar 26', 'Apr 26', 'Mei 26', 'Jun 26', 'Jul 26', 'Ags 26', 'Sep 26', 'Okt 26', 'Nov 26', 'Des 26'];
  const dummyUserRegistrationTrend = [24, 45, 38, 56, 72, 61, 89, 95, 120, 110, 145, 132]; 
  const dummyPublishedArticleTrend = [4, 8, 12, 7, 15, 9, 14, 11, 18, 13, 22, 16];       
  const [currentSlide, setCurrentSlide] = useState(0); 
  const itemsPerSlide = 6;
  const startIndex = currentSlide * itemsPerSlide;
  const visibleMonths = dummyTimelineMonths.slice(startIndex, startIndex + itemsPerSlide);
  const maxUserCount = Math.max(...dummyUserRegistrationTrend) + 20; 
  const userPoints = visibleMonths.map((month, i) => {
    const count = dummyUserRegistrationTrend[startIndex + i];
    const x = 20 + (i / (itemsPerSlide - 1)) * 460; 
    const y = 90 - (count / maxUserCount) * 80;     
    return { x, y, count, month };
  });
  const userPolyline = userPoints.map(p => `${p.x},${p.y}`).join(' ');
  const userPolygon = `20,100 ${userPolyline} 480,100`;
  const maxPublishedCount = Math.max(...dummyPublishedArticleTrend) + 5;
  // -------------------------

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-[1400px] mx-auto">
      
      {/* 1. GRID STATISTIK UTAMA */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard title="Total Artikel" value={stats.totalArticles.toString()} trend="Keseluruhan database" icon={<FileText size={18} />} />
        <StatCard title="Telah Terbit" value={stats.publishedArticles.toString()} trend="Status PUBLISHED" icon={<BookOpen size={18} />} />
        <StatCard title="Kategori Aktif" value={stats.activeCategories.toString()} trend="Siap digunakan penulis" icon={<Tags size={18} />} trendColor="text-indigo-600" />
        <StatCard title="Pengguna Umum" value={stats.regularUsersCount.toString()} trend="Aktif (Bukan Admin/Staff)" icon={<Users size={18} />} trendColor="text-blue-600" />
      </div>

      {/* 2. BARIS GRAFIK TREN BULANAN */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* LINE CHART TREN USER */}
        <div className="bg-white border border-gray-100 rounded-xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] p-6 flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/50 rounded-full blur-3xl pointer-events-none -z-10 opacity-50"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-blue-50 text-blue-600 rounded-lg"><LineIcon size={16} /></div>
                <h3 className="text-base font-bold text-gray-900">Tren Pendaftaran Akun</h3>
              </div>
              <div className="flex items-center gap-1">
                <button type="button" disabled={currentSlide === 0} onClick={() => setCurrentSlide(0)} className="p-1.5 rounded-md border border-gray-100 bg-white hover:bg-gray-50 text-gray-600 disabled:opacity-30 transition-all shadow-sm"><ChevronLeft size={14} strokeWidth={3} /></button>
                <button type="button" disabled={currentSlide === 1} onClick={() => setCurrentSlide(1)} className="p-1.5 rounded-md border border-gray-100 bg-white hover:bg-gray-50 text-gray-600 disabled:opacity-30 transition-all shadow-sm"><ChevronRight size={14} strokeWidth={3} /></button>
              </div>
            </div>
            <p className="text-xs font-medium text-gray-400 mb-6">Pertumbuhan jumlah pengguna aplikasi EIOHealth.</p>
          </div>
          <div className="h-48 w-full relative z-10">
            <div className="absolute top-0 left-0 right-0 bottom-8 flex flex-col justify-between pointer-events-none">
              <div className="w-full border-b border-gray-200 border-dashed opacity-50"></div>
              <div className="w-full border-b border-gray-200 border-dashed opacity-50"></div>
              <div className="w-full border-b border-gray-200 border-dashed opacity-50"></div>
            </div>
            <div className="absolute top-0 left-0 right-0 bottom-8 border-b border-l border-gray-100">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 500 100" preserveAspectRatio="none">
                <defs><linearGradient id="lineGradientBlue" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" /><stop offset="100%" stopColor="#3b82f6" stopOpacity="0" /></linearGradient></defs>
                <polygon points={userPolygon} fill="url(#lineGradientBlue)" className="transition-all duration-700 ease-in-out" />
                <polyline points={userPolyline} fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-all duration-700 ease-in-out" />
              </svg>
              {userPoints.map((p, i) => (
                <div key={i} className="absolute group/dot z-20 flex items-center justify-center w-6 h-6" style={{ left: `${(p.x / 500) * 100}%`, top: `${p.y}%`, transform: 'translate(-50%, -50%)' }}>
                  <div className="absolute opacity-0 group-hover/dot:opacity-100 bottom-full mb-1 left-1/2 -translate-x-1/2 bg-gray-900 text-white font-bold text-[11px] px-3 py-1.5 rounded-lg transition-all whitespace-nowrap shadow-lg pointer-events-none transform translate-y-2 group-hover/dot:translate-y-0">{p.count} User</div>
                  <div className="w-2.5 h-2.5 bg-white border-2 border-blue-500 rounded-full shadow-sm group-hover/dot:scale-150 transition-transform duration-300"></div>
                </div>
              ))}
            </div>
            <div className="absolute bottom-0 inset-x-0 h-8">
              {userPoints.map((p, i) => (
                <span key={i} className="text-[10px] font-bold text-gray-400 absolute bottom-0 -translate-x-1/2 whitespace-nowrap" style={{ left: `${(p.x / 500) * 100}%` }}>{p.month}</span>
              ))}
            </div>
          </div>
        </div>

        {/* BAR CHART ARTIKEL */}
        <div className="bg-white border border-gray-100 rounded-xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-emerald-50 text-emerald-600 rounded-lg"><BarChart size={16} /></div>
                <h3 className="text-base font-bold text-gray-900">Artikel Dipublikasikan</h3>
              </div>
              <div className="flex items-center gap-1">
                <button type="button" disabled={currentSlide === 0} onClick={() => setCurrentSlide(0)} className="p-1.5 rounded-md border border-gray-100 bg-white hover:bg-gray-50 text-gray-600 disabled:opacity-30 transition-all shadow-sm"><ChevronLeft size={14} strokeWidth={3} /></button>
                <button type="button" disabled={currentSlide === 1} onClick={() => setCurrentSlide(1)} className="p-1.5 rounded-md border border-gray-100 bg-white hover:bg-gray-50 text-gray-600 disabled:opacity-30 transition-all shadow-sm"><ChevronRight size={14} strokeWidth={3} /></button>
              </div>
            </div>
            <p className="text-xs font-medium text-gray-400 mb-6">Kepadatan perilisan materi edukasi per bulan.</p>
          </div>
          <div className="h-48 w-full relative z-10">
            <div className="absolute top-0 left-0 right-0 bottom-8 flex flex-col justify-between pointer-events-none z-0"><div className="w-full border-b border-gray-200 border-dashed opacity-50"></div><div className="w-full border-b border-gray-200 border-dashed opacity-50"></div><div className="w-full border-b border-gray-200 border-dashed opacity-50"></div></div>
            <div className="absolute top-0 left-0 right-0 bottom-8 border-b border-l border-gray-100 flex items-end gap-3 px-2 z-10">
              {visibleMonths.map((month, i) => {
                const actualIndex = startIndex + i;
                const count = dummyPublishedArticleTrend[actualIndex];
                const heightPercent = (count / maxPublishedCount) * 90;
                return (
                  <div key={i} className="flex-1 flex flex-col items-center justify-end h-full relative group z-10 pb-8">
                    <div className="absolute opacity-0 group-hover:opacity-100 bottom-[105%] mb-2 bg-gray-900 text-white font-bold text-[11px] px-3 py-1.5 rounded-lg transition-all whitespace-nowrap shadow-lg pointer-events-none transform translate-y-2 group-hover:translate-y-0 z-20">{count} Artikel</div>
                    <div style={{ height: `${heightPercent}%` }} className="w-full max-w-[40px] bg-gradient-to-t from-emerald-100 to-emerald-500 rounded-t transition-all duration-700 relative flex justify-center">
                      <div className="absolute -top-1 w-2.5 h-2.5 bg-white border-2 border-emerald-500 rounded-full shadow-sm group-hover:scale-150 transition-transform duration-300"></div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="absolute bottom-0 inset-x-0 h-8 flex items-end gap-3 px-2">
              {visibleMonths.map((month, i) => (<div key={i} className="flex-1 flex justify-center"><span className="text-[10px] font-bold text-gray-400 absolute bottom-0">{month}</span></div>))}
            </div>
          </div>
        </div>
      </div>

      {/* 3. BARIS KATEGORI DISTRIBUSI */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-gray-100 rounded-xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] p-6">
          <div className="flex items-center gap-2 mb-6">
            <div className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg"><BarChart3 size={16} /></div>
            <h3 className="text-base font-bold text-gray-900">Jumlah Artikel per Kategori</h3>
          </div>
          <div className="space-y-5">
            {dummyCategoryData.map((cat, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between items-end"><span className="text-xs font-bold text-gray-700">{cat.name}</span><span className="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">{cat.count} Artikel</span></div>
                <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden"><div style={{ width: `${cat.percentage}%` }} className="h-full bg-indigo-500 rounded-full transition-all duration-1000" /></div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] p-6 flex flex-col justify-between">
          <div className="flex items-center gap-2 mb-4"><div className="p-1.5 bg-purple-50 text-purple-600 rounded-lg"><PieIcon size={16} /></div><h3 className="text-base font-bold text-gray-900">Distribusi (%)</h3></div>
          <div className="flex flex-col items-center justify-center py-2 space-y-6">
            <div className="relative w-32 h-32 flex items-center justify-center group cursor-pointer">
              <div className="absolute inset-0 rounded-full border-8 border-gray-50 flex items-center justify-center group-hover:scale-105 transition-transform duration-500"><div className="w-16 h-16 bg-white rounded-full shadow-inner border border-gray-50 flex items-center justify-center"><span className="text-[10px] font-black text-gray-400 font-mono tracking-wider">DATA</span></div></div>
              <svg className="w-full h-full transform -rotate-90 group-hover:scale-105 transition-transform duration-500" viewBox="0 0 36 36">
                {dummyCategoryData.map((cat, idx) => {
                  let totalOffset = 0;
                  for (let i = 0; i < idx; i++) totalOffset += dummyCategoryData[i].percentage;
                  const colors = ['#6366f1', '#06b6d4', '#a855f7', '#f59e0b', '#10b981'];
                  return (<circle key={idx} cx="18" cy="18" r="15.915" fill="transparent" stroke={colors[idx % colors.length]} strokeWidth="3" strokeDasharray={`${cat.percentage} ${100 - cat.percentage}`} strokeDashoffset={100 - totalOffset} className="transition-all duration-1000" />);
                })}
              </svg>
            </div>
            <div className="w-full grid grid-cols-2 gap-2 text-[11px] font-bold text-gray-600">
              {dummyCategoryData.map((cat, idx) => {
                const colors = ['bg-indigo-500', 'bg-cyan-500', 'bg-purple-500', 'bg-amber-500', 'bg-emerald-500'];
                return (
                  <div key={idx} className="flex items-center gap-1.5 truncate">
                    <span className={`w-2 h-2 rounded-full shrink-0 ${colors[idx % colors.length]}`} /><span className="truncate">{cat.name}</span><span className="font-mono font-black text-gray-900 shrink-0 ml-auto">{cat.percentage}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 4. BARIS KONTEN TAMBAHAN DENGAN TINGGI COMPACT YANG SAMA */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* KARTU ARTIKEL TERBARU (KIRI) */}
        {/* 🌟 FIX TINGGI: Diperpendek menjadi h-[315px] karena hanya memuat 3 data */}
        <div className="lg:col-span-2 bg-white border border-gray-100 rounded-xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] p-6 h-[315px] flex flex-col">
          {/* 🌟 FIX TOMBOL: Berada di sebelah kanan ujung ujung card */}
          <div className="flex items-center justify-between mb-4 shrink-0">
            <h3 className="text-base font-bold text-gray-900">Artikel Terbaru</h3>
            {latestArticles.length > 3 && (
              <button 
                onClick={() => setIsArticlesModalOpen(true)} 
                className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 transition-all bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg shadow-sm"
              >
                Lihat selengkapnya <ArrowUpRight size={14} strokeWidth={2.5} />
              </button>
            )}
          </div>
          
          <div className="flex-1 overflow-y-auto pr-1 space-y-1 no-scrollbar">
            {displayedArticles.length === 0 ? (
              <p className="text-sm text-gray-400 font-medium italic p-3">Belum ada artikel di database.</p>
            ) : (
              displayedArticles.map((article) => (
                <Link key={article.id} href={`/admin/artikel/edit/${article.id}`} className="block">
                  <div className="flex items-center justify-between p-2.5 hover:bg-gray-50 rounded-xl transition-all group border border-transparent hover:border-gray-100">
                    <div className="pr-4">
                      <p className="text-sm font-bold text-gray-900 group-hover:text-indigo-600 line-clamp-1 transition-colors">{article.title}</p>
                      <p className="text-[11px] font-semibold text-gray-400 mt-0.5 uppercase tracking-wider">{article.category?.name || 'Tanpa Kategori'}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${article.status === 'PUBLISHED' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100/50' : 'bg-amber-50 text-amber-600 border border-amber-100/50'}`}>
                        {article.status}
                      </span>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* KARTU AKTIVITAS TERAKHIR (KANAN) */}
        {/* 🌟 FIX TINGGI: h-[315px] agar seimbang dengan sisi kiri */}
        <div className="bg-white border border-gray-100 rounded-xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] p-6 h-[315px] flex flex-col">
          {/* 🌟 FIX TOMBOL: Menggunakan IKON SAJA di ujung sebelah kanan card */}
          <div className="flex items-center justify-between mb-4 shrink-0">
            <h3 className="text-base font-bold text-gray-900">Aktivitas Terakhir</h3>
            {recentActivities.length > 3 && (
              <button 
                onClick={() => setIsActivitiesModalOpen(true)} 
                className="p-2 text-indigo-600 hover:text-white bg-indigo-50 hover:bg-indigo-600 rounded-xl transition-all shadow-sm group/btn" 
                title="Lihat semua aktivitas"
              >
                <Maximize2 size={14} strokeWidth={3} className="group-hover/btn:rotate-45 transition-transform duration-300" />
              </button>
            )}
          </div>
          
          <div className="flex-1 overflow-y-auto pr-1 no-scrollbar">
            <div className="relative border-l border-gray-100 ml-2.5 space-y-4 pb-2">
              {displayedActivities.length === 0 ? (
                <p className="text-xs text-gray-400 font-medium italic pl-4">Belum ada aktivitas terekam.</p>
              ) : (
                displayedActivities.map((activity, index) => (
                  <div key={index} className="relative pl-4 group">
                    <div className="absolute -left-1 top-1 w-2 h-2 rounded-full bg-indigo-100 border border-white group-hover:scale-125 transition-transform">
                      <div className="w-1 h-1 rounded-full bg-indigo-500 absolute top-0.5 left-0.5"></div>
                    </div>
                    <p className="text-xs font-bold text-gray-800 line-clamp-1 leading-snug group-hover:text-indigo-600 transition-colors">"{activity.title}"</p>
                    <p className="text-[10px] font-medium text-gray-400 mt-0.5">Apoteker Kamal • {timeAgo(activity.updatedAt)}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ========================================== */}
      {/* MODAL WINDOWS POP-UP (FULL VIEW)           */}
      {/* ========================================== */}
      
      {/* Modal Semua Artikel */}
      {isArticlesModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[80vh] flex flex-col shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-5 border-b border-gray-100 shrink-0">
              <h2 className="text-lg font-black text-gray-900">Riwayat Artikel Terbaru</h2>
              <button onClick={() => setIsArticlesModalOpen(false)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"><X size={18} strokeWidth={3} /></button>
            </div>
            <div className="p-5 overflow-y-auto space-y-1.5 no-scrollbar">
              {latestArticles.map((article) => (
                <Link key={article.id} href={`/admin/artikel/edit/${article.id}`} className="block">
                  <div className="flex items-center justify-between p-3.5 hover:bg-gray-50 rounded-xl transition-all group border border-gray-50 hover:border-gray-100">
                    <div className="pr-4">
                      <p className="text-sm font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{article.title}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">{article.category?.name || 'Tanpa Kategori'}</span>
                        <span className="text-xs font-medium text-gray-400">{new Date(article.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                      </div>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider ${article.status === 'PUBLISHED' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>{article.status}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modal Semua Aktivitas */}
      {isActivitiesModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[80vh] flex flex-col shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-5 border-b border-gray-100 shrink-0">
              <h2 className="text-lg font-black text-gray-900">Seluruh Riwayat Aktivitas</h2>
              <button onClick={() => setIsActivitiesModalOpen(false)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"><X size={18} strokeWidth={3} /></button>
            </div>
            <div className="p-6 overflow-y-auto no-scrollbar">
              <div className="relative border-l-2 border-indigo-100 ml-4 space-y-6">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="relative pl-5 group">
                    <div className="absolute -left-[7px] top-1 w-3 h-3 rounded-full bg-indigo-100 border border-white flex items-center justify-center"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div></div>
                    <p className="text-sm font-bold text-gray-900 leading-snug">{activity.title}</p>
                    <p className="text-xs font-semibold text-gray-400 mt-1">Apoteker Kamal • {new Date(activity.updatedAt).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

function StatCard({ title, value, trend, icon, trendColor = "text-emerald-600" }: { title: string, value: string, trend: string, icon: React.ReactNode, trendColor?: string }) {
  return (
    <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] hover:border-indigo-100 hover:shadow-md transition-all group cursor-default">
      <div className="flex items-center justify-between mb-3 text-gray-500">
        <p className="text-sm font-semibold">{title}</p>
        <div className="p-2 bg-gray-50 rounded-lg text-gray-600 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">{icon}</div>
      </div>
      <div>
        <h4 className="text-3xl font-black text-gray-900 mb-1">{value}</h4>
        <p className={`text-xs font-semibold ${trendColor}`}>{trend}</p>
      </div>
    </div>
  );
}