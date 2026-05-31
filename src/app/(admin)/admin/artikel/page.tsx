'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Edit2, Trash2, Search, ChevronDown, Loader2, FileText, AlertTriangle } from 'lucide-react';
import { getArticles, deleteArticle } from './action';

export default function ArtikelPage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // State untuk Modal Hapus
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState<{id: string, title: string} | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Tarik data dari database
  const fetchArticles = async () => {
    setIsLoading(true);
    const result = await getArticles();
    if (result.success && result.data) {
      setArticles(result.data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  // Handler Hapus
  const handleDeleteClick = (id: string, title: string) => {
    setArticleToDelete({ id, title });
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!articleToDelete) return;
    setIsDeleting(true);
    
    const result = await deleteArticle(articleToDelete.id);
    if (result.success) {
      await fetchArticles();
      setIsDeleteModalOpen(false);
      setArticleToDelete(null);
    } else {
      alert(result.error);
    }
    setIsDeleting(false);
  };

  return (
    <div className="relative w-full max-w-[1400px] mx-auto space-y-6 animate-in fade-in duration-500">
      
      {/* Header Halaman */}
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Manajemen Artikel</h1>
        <p className="text-sm font-medium text-gray-500 mt-1">Kelola publikasi, edukasi kesehatan, dan jurnal medis EIOHealth.</p>
      </div>

      {/* Container Tabel (Glassmorphism) */}
      <div className="bg-white/60 backdrop-blur-xl border border-white/80 shadow-sm rounded-3xl p-6">
        
        {/* BARIS KONTROL */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-6">
          <div className="relative w-full lg:w-[350px]">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Cari judul artikel..."
              className="w-full pl-11 pr-4 py-2.5 bg-white/70 border border-white/50 rounded-xl text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0066FF]/30 transition-all shadow-sm"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            <div className="relative w-full sm:w-auto">
              <select className="w-full appearance-none bg-white/70 border border-white/50 text-gray-600 text-sm font-bold rounded-xl px-4 py-2.5 pr-10 focus:outline-none focus:ring-2 focus:ring-[#0066FF]/30 cursor-pointer shadow-sm hover:bg-white transition-all">
                <option value="semua">Semua Status</option>
                <option value="published">Diterbitkan</option>
                <option value="draft">Draft</option>
              </select>
              <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>

            {/* Tombol Tambah (Diarahkan ke halaman baru) */}
            <Link 
              href="/admin/artikel/tambah"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#0066FF] hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-md shadow-blue-500/20"
            >
              <Plus className="w-4 h-4" />
              Tulis Artikel
            </Link>
          </div>
        </div>

        {/* Tabel Data Artikel */}
        <div className="overflow-hidden rounded-2xl border border-gray-100/50 bg-white/40 min-h-[300px]">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/50 border-b border-gray-100/50">
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest w-2/5">Judul Artikel</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Kategori</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Tanggal Update</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100/50 relative">
                
                {isLoading && (
                  <tr>
                    <td colSpan={5} className="px-6 py-16 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <Loader2 className="w-8 h-8 text-[#0066FF] animate-spin mb-3" />
                        <p className="text-gray-500 font-medium text-sm">Menarik data dari database...</p>
                      </div>
                    </td>
                  </tr>
                )}

                {!isLoading && articles.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-16 text-center">
                      <div className="flex flex-col items-center justify-center space-y-3">
                        <div className="w-16 h-16 rounded-3xl bg-blue-50/50 flex items-center justify-center border border-blue-100/50 shadow-inner">
                          <FileText className="w-8 h-8 text-[#0066FF]/40" />
                        </div>
                        <p className="text-gray-900 font-extrabold text-lg">Belum ada tulisan</p>
                        <p className="text-gray-500 font-medium text-sm max-w-sm mx-auto">
                          Mulai edukasi pasien hari ini. Klik "Tulis Artikel" untuk membuat konten kesehatan pertama Anda.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}

                {!isLoading && articles.length > 0 && articles.map((article) => (
                  <tr key={article.id} className="hover:bg-white/60 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        {/* Placeholder Thumbnail jika ada */}
                        <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center shrink-0 border border-gray-200/50 overflow-hidden">
                           {article.thumbnail ? (
                             <img src={article.thumbnail} alt="thumb" className="w-full h-full object-cover" />
                           ) : (
                             <FileText className="w-5 h-5 text-gray-400" />
                           )}
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-gray-900 truncate" title={article.title}>{article.title}</p>
                          <p className="text-xs font-medium text-gray-500 truncate mt-0.5">/{article.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {/* Mengambil nama kategori dari relasi Prisma */}
                      <span className="text-sm font-semibold text-gray-600 bg-gray-100/80 px-3 py-1 rounded-lg border border-gray-200/50">
                        {article.category?.name || 'Tanpa Kategori'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold tracking-wide ${
                        article.status === 'PUBLISHED' 
                          ? 'bg-emerald-50/80 text-emerald-600 border border-emerald-100/50' 
                          : 'bg-amber-50/80 text-amber-600 border border-amber-100/50'
                      }`}>
                        {article.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-gray-500">
                        {new Date(article.updatedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 lg:opacity-100 group-hover:opacity-100 transition-opacity">
                        <Link 
                          href={`/admin/artikel/edit/${article.id}`}
                          className="p-2 text-gray-500 hover:text-[#0066FF] hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit Artikel"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Link>
                        <button 
                          onClick={() => handleDeleteClick(article.id, article.title)}
                          className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          title="Hapus Artikel"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* POPUP KONFIRMASI HAPUS */}
      {isDeleteModalOpen && articleToDelete && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <div onClick={() => !isDeleting && setIsDeleteModalOpen(false)} className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm cursor-pointer" />

          <div className="relative w-full max-w-sm bg-white/80 backdrop-blur-2xl border border-white/90 shadow-2xl rounded-3xl p-6 overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="absolute top-[-30%] right-[-20%] w-40 h-40 bg-red-400/10 blur-3xl rounded-full pointer-events-none" />

            <div className="flex flex-col items-center text-center relative z-10">
              <div className="w-14 h-14 rounded-full bg-red-100/80 flex items-center justify-center border border-red-200/50 mb-4 shadow-sm">
                <AlertTriangle className="w-7 h-7 text-red-600" />
              </div>
              <h3 className="font-extrabold text-gray-900 text-xl mb-2">Hapus Artikel?</h3>
              <p className="text-sm font-medium text-gray-500 mb-1">
                Anda yakin ingin menghapus artikel:
              </p>
              <p className="text-sm font-bold text-gray-900 mb-6 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100 line-clamp-2">
                "{articleToDelete.title}"
              </p>

              <div className="flex items-center w-full gap-3">
                <button
                  type="button"
                  disabled={isDeleting}
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="flex-1 py-3 rounded-xl text-sm font-bold text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all disabled:opacity-50"
                >
                  Batal
                </button>
                <button
                  type="button"
                  disabled={isDeleting}
                  onClick={confirmDelete}
                  className="flex-1 py-3 rounded-xl text-sm font-bold text-white bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isDeleting && <Loader2 className="w-4 h-4 animate-spin" />}
                  {isDeleting ? 'Menghapus...' : 'Ya, Hapus'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}