import { PrismaClient } from '@prisma/client';
import { FileText, Tags, BookOpen, PenTool, ArrowUpRight, Clock } from 'lucide-react';
import Link from 'next/link';

// Inisialisasi Prisma
const prisma = new PrismaClient();

// Fungsi bantuan untuk menghitung waktu (misal: "2 jam lalu")
function timeAgo(date: Date) {
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

export default async function AdminDashboard() {
  // 🌟 MENGAMBIL DATA REAL DARI DATABASE SECARA PARALEL (SUPER CEPAT)
  const [
    totalArticles,
    publishedArticles,
    draftArticles,
    activeCategories,
    latestArticles,
    recentActivities
  ] = await Promise.all([
    prisma.article.count(), // 1. Total semua artikel
    prisma.article.count({ where: { status: 'PUBLISHED' } }), // 2. Artikel terbit
    prisma.article.count({ where: { status: 'DRAFT' } }), // 3. Artikel draft
    prisma.category.count({ where: { status: 'Aktif' } }), // 4. Kategori aktif
    
    // 5. Ambil 3 artikel terbaru untuk tabel kiri
    prisma.article.findMany({
      take: 3,
      orderBy: { createdAt: 'desc' },
      include: { category: true }
    }),
    
    // 6. Ambil 4 artikel yang paling terakhir diedit untuk aktivitas kanan
    prisma.article.findMany({
      take: 4,
      orderBy: { updatedAt: 'desc' },
      select: { title: true, status: true, updatedAt: true }
    })
  ]);

  return (
    <div className="w-full max-w-[1400px] mx-auto space-y-8 animate-in fade-in duration-500">
      
      {/* Judul Halaman */}
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Overview</h1>
        <p className="text-sm font-medium text-gray-500 mt-1">Pantau metrik dan data nyata sistem EIOHealth hari ini.</p>
      </div>

      {/* Grid 4 Kartu Metrik Database */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* KARTU 1: Total Artikel */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-semibold text-gray-500">Total Artikel</p>
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center">
              <FileText className="w-5 h-5 text-[#0066FF]" />
            </div>
          </div>
          <div>
            <h3 className="text-4xl font-black text-gray-900">{totalArticles}</h3>
            <p className="text-xs font-bold text-gray-400 mt-2 tracking-wide">Keseluruhan di database</p>
          </div>
        </div>

        {/* KARTU 2: Artikel Publikasi */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-semibold text-gray-500">Telah Terbit</p>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-emerald-600" />
            </div>
          </div>
          <div>
            <h3 className="text-4xl font-black text-gray-900">{publishedArticles}</h3>
            <p className="text-xs font-bold text-emerald-500 mt-2 tracking-wide">Status PUBLISHED</p>
          </div>
        </div>

        {/* KARTU 3: Draft Tersimpan */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-semibold text-gray-500">Draft & Revisi</p>
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center">
              <PenTool className="w-5 h-5 text-amber-600" />
            </div>
          </div>
          <div>
            <h3 className="text-4xl font-black text-gray-900">{draftArticles}</h3>
            <p className="text-xs font-bold text-amber-500 mt-2 tracking-wide">Belum dipublikasikan</p>
          </div>
        </div>

        {/* KARTU 4: Kategori Aktif (Pengganti Faskes) */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-semibold text-gray-500">Kategori Aktif</p>
            <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center">
              <Tags className="w-5 h-5 text-purple-600" />
            </div>
          </div>
          <div>
            <h3 className="text-4xl font-black text-gray-900">{activeCategories}</h3>
            <p className="text-xs font-bold text-purple-500 mt-2 tracking-wide">Siap digunakan penulis</p>
          </div>
        </div>

      </div>

      {/* Grid Bawah (Artikel & Aktivitas) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Kolom Kiri: Artikel Terbaru */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-gray-900">Artikel Terbaru</h3>
            <Link href="/admin/artikel" className="text-sm font-bold text-[#0066FF] hover:text-blue-700 flex items-center gap-1 transition-colors">
              Kelola Semua <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="space-y-6">
            {latestArticles.length === 0 ? (
              <p className="text-sm text-gray-500 font-medium italic">Belum ada artikel di database.</p>
            ) : (
              latestArticles.map((article) => (
                <div key={article.id} className="flex items-center justify-between group pb-6 border-b border-gray-50 last:border-0 last:pb-0">
                  <div className="pr-4">
                    <Link href={`/admin/artikel/edit/${article.id}`}>
                      <h4 className="text-base font-bold text-gray-900 group-hover:text-[#0066FF] transition-colors line-clamp-1">
                        {article.title}
                      </h4>
                    </Link>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-md">
                        {article.category?.name || 'Tanpa Kategori'}
                      </span>
                      <span className="text-xs font-medium text-gray-400">
                        • {new Date(article.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-black tracking-wider uppercase ${
                      article.status === 'PUBLISHED' 
                        ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' 
                        : 'bg-amber-50 text-amber-600 border border-amber-100'
                    }`}>
                      {article.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Kolom Kanan: Aktivitas Terakhir */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
          <div className="flex items-center gap-2 mb-8">
            <Clock className="w-5 h-5 text-gray-400" />
            <h3 className="text-xl font-bold text-gray-900">Aktivitas Terakhir</h3>
          </div>
          
          <div className="space-y-8 border-l-2 border-gray-100 ml-2 pl-6 relative">
            {recentActivities.length === 0 ? (
              <p className="text-xs text-gray-500">Belum ada aktivitas.</p>
            ) : (
              recentActivities.map((activity, index) => (
                <div key={index} className="relative">
                  <div className={`absolute -left-[31px] top-1.5 w-3 h-3 rounded-full ring-4 ring-white shadow-sm ${
                    activity.status === 'PUBLISHED' ? 'bg-emerald-500' : 'bg-[#0066FF]'
                  }`}></div>
                  <h4 className="text-sm font-bold text-gray-900 leading-snug line-clamp-2" title={activity.title}>
                    Artikel "{activity.title}" diperbarui
                  </h4>
                  <p className="text-xs font-medium text-gray-400 mt-1">
                    Apoteker Kamal • {timeAgo(new Date(activity.updatedAt))}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}