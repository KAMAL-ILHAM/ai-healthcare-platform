'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, Tag, X, Link2, ChevronDown, Loader2, ToggleLeft, AlertTriangle } from 'lucide-react';
import { getCategories, createCategory, updateCategory, deleteCategory } from './action';

export default function KategoriPage() {
  // State untuk Modal Tambah/Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null); 
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [status, setStatus] = useState('Aktif'); 
  
  // State untuk Modal Hapus (Delete)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<{id: string, name: string} | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // State Database Utama
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fungsi Tarik Data
  const fetchCategories = async () => {
    setIsLoading(true);
    const result = await getCategories();
    if (result.success && result.data) {
      setCategories(result.data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Auto-generate Slug
  useEffect(() => {
    const generatedSlug = name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '') 
      .replace(/\s+/g, '-');        
    setSlug(generatedSlug);
  }, [name]);

  // Buka Modal Tambah
  const openAddModal = () => {
    setEditId(null);
    setName('');
    setSlug('');
    setStatus('Aktif');
    setIsModalOpen(true);
  };

  // Buka Modal Edit
  const openEditModal = (cat: any) => {
    setEditId(cat.id);
    setName(cat.name);
    setSlug(cat.slug);
    setStatus(cat.status || 'Aktif');
    setIsModalOpen(true);
  };

  // Buka Modal Konfirmasi Hapus
  const handleDeleteClick = (id: string, categoryName: string) => {
    setCategoryToDelete({ id, name: categoryName });
    setIsDeleteModalOpen(true);
  };

  // Submit Tambah/Edit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    let result;
    if (editId) {
      result = await updateCategory(editId, name, slug, status);
    } else {
      result = await createCategory(name, slug, status);
    }
    
    if (result.success) {
      await fetchCategories(); 
      setIsModalOpen(false);
    } else {
      alert(result.error);
    }
    
    setIsSubmitting(false);
  };

  // Eksekusi Hapus Data ke Database
  const confirmDelete = async () => {
    if (!categoryToDelete) return;
    
    setIsDeleting(true);
    const result = await deleteCategory(categoryToDelete.id);
    
    if (result.success) {
      await fetchCategories(); 
      setIsDeleteModalOpen(false);
      setCategoryToDelete(null);
    } else {
      alert(result.error);
    }
    setIsDeleting(false);
  };

  return (
    <div className="relative w-full max-w-[1400px] mx-auto space-y-6 animate-in fade-in duration-500">
      
      {/* Header Halaman */}
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Kategori Artikel</h1>
        <p className="text-sm font-medium text-gray-500 mt-1">Kelola label dan pengelompokan konten EIOHealth.</p>
      </div>

      <div className="bg-white/60 backdrop-blur-xl border border-white/80 shadow-sm rounded-3xl p-6">
        
        {/* BARIS KONTROL */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-6">
          <div className="relative w-full lg:w-[350px]">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Cari kategori..."
              className="w-full pl-11 pr-4 py-2.5 bg-white/70 border border-white/50 rounded-xl text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0066FF]/30 transition-all shadow-sm"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            <div className="relative w-full sm:w-auto">
              <select className="w-full appearance-none bg-white/70 border border-white/50 text-gray-600 text-sm font-bold rounded-xl px-4 py-2.5 pr-10 focus:outline-none focus:ring-2 focus:ring-[#0066FF]/30 cursor-pointer shadow-sm hover:bg-white transition-all">
                <option value="semua">Semua Kategori</option>
                <option value="terbaru">Terbaru</option>
                <option value="terlama">Terlama</option>
              </select>
              <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>

            <button 
              onClick={openAddModal}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#0066FF] hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-md shadow-blue-500/20"
            >
              <Plus className="w-4 h-4" />
              Tambah Kategori
            </button>
          </div>
        </div>

        {/* Tabel Data */}
        <div className="overflow-hidden rounded-2xl border border-gray-100/50 bg-white/40 min-h-[300px]">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/50 border-b border-gray-100/50">
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Nama Kategori</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Slug</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Total Artikel</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Status</th>
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

                {!isLoading && categories.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-16 text-center">
                      <div className="flex flex-col items-center justify-center space-y-3">
                        <div className="w-16 h-16 rounded-3xl bg-blue-50/50 flex items-center justify-center border border-blue-100/50 shadow-inner">
                          <Tag className="w-8 h-8 text-[#0066FF]/40" />
                        </div>
                        <p className="text-gray-900 font-extrabold text-lg">Kosong belum ada kategori.....</p>
                        <p className="text-gray-500 font-medium text-sm max-w-sm mx-auto">
                          Tabel kategori di database kamu belum memiliki data sama sekali.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}

                {!isLoading && categories.length > 0 && categories.map((cat) => (
                  <tr key={cat.id} className="hover:bg-white/60 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-50/80 flex items-center justify-center border border-blue-100/50">
                          <Tag className="w-4 h-4 text-[#0066FF]" />
                        </div>
                        <span className="font-bold text-gray-900">{cat.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-gray-600">{cat.slug}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-black text-gray-900">{cat._count?.articles || 0}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold tracking-wide ${
                        cat.status === 'Aktif' 
                          ? 'bg-emerald-50/80 text-emerald-600 border border-emerald-100/50' 
                          : 'bg-red-50/80 text-red-600 border border-red-100/50'
                      }`}>
                        {cat.status || 'Aktif'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 lg:opacity-100 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => openEditModal(cat)}
                          className="p-2 text-gray-500 hover:text-[#0066FF] hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit Kategori"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        {/* Panggil fungsi Buka Modal Hapus di sini */}
                        <button 
                          onClick={() => handleDeleteClick(cat.id, cat.name)}
                          className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          title="Hapus Kategori"
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

      {/* ========================================= */}
      {/* 1. POPUP MODAL: TAMBAH / EDIT KATEGORI    */}
      {/* ========================================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <div onClick={() => !isSubmitting && setIsModalOpen(false)} className="absolute inset-0 bg-gray-900/20 backdrop-blur-sm cursor-pointer" />

          <div className="relative w-full max-w-md bg-white/70 backdrop-blur-2xl border border-white/90 shadow-2xl rounded-3xl p-6 overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="absolute top-[-30%] right-[-20%] w-48 h-48 bg-blue-400/10 blur-3xl rounded-full pointer-events-none" />

            <div className="flex items-center justify-between pb-4 border-b border-gray-100/50 mb-6 relative">
              <div className="flex items-center gap-2.5">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-white shadow-md ${editId ? 'bg-amber-500 shadow-amber-500/20' : 'bg-[#0066FF] shadow-blue-500/20'}`}>
                  {editId ? <Edit2 size={18} strokeWidth={2.5} /> : <Plus size={18} strokeWidth={2.5} />}
                </div>
                <div>
                  <h3 className="font-extrabold text-gray-900 text-lg">
                    {editId ? 'Edit Kategori' : 'Kategori Baru'}
                  </h3>
                  <p className="text-xs font-medium text-gray-400 mt-0.5">
                    {editId ? 'Perbarui data kategori yang sudah ada' : 'Input data model prisma categories'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => !isSubmitting && setIsModalOpen(false)}
                className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50/50 rounded-lg transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 relative">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block ml-1">Nama Kategori</label>
                <div className="relative flex items-center">
                  <Tag className="w-4 h-4 absolute left-4 text-gray-400" />
                  <input
                    type="text"
                    required
                    disabled={isSubmitting}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Contoh: Farmakologi, Obat Bebas"
                    className="w-full pl-11 pr-4 py-3 bg-white/80 border border-white rounded-xl text-sm font-semibold text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0066FF]/30 transition-all shadow-sm disabled:opacity-50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block ml-1">Slug URL</label>
                <div className="relative flex items-center">
                  <Link2 className="w-4 h-4 absolute left-4 text-gray-400" />
                  <input
                    type="text"
                    required
                    disabled={isSubmitting}
                    value={slug}
                    onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                    placeholder="otomatis-terisi-strip"
                    className="w-full pl-11 pr-4 py-3 bg-gray-50/50 border border-white rounded-xl text-sm font-semibold text-gray-500 placeholder-gray-400 focus:outline-none shadow-inner disabled:opacity-50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block ml-1">Status Kategori</label>
                <div className="relative flex items-center">
                  <ToggleLeft className="w-4 h-4 absolute left-4 text-gray-400" />
                  <select
                    disabled={isSubmitting}
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full appearance-none pl-11 pr-10 py-3 bg-white/80 border border-white rounded-xl text-sm font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0066FF]/30 transition-all shadow-sm cursor-pointer disabled:opacity-50"
                  >
                    <option value="Aktif">Aktif (Muncul di Form Artikel)</option>
                    <option value="Nonaktif">Nonaktif (Sembunyikan)</option>
                  </select>
                  <ChevronDown className="w-4 h-4 absolute right-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100/50 mt-6">
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-sm font-bold text-gray-500 hover:text-gray-800 hover:bg-gray-50/80 transition-all disabled:opacity-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-5 py-2.5 rounded-xl text-sm font-bold text-white shadow-lg transition-all flex items-center gap-2 disabled:opacity-50 ${
                    editId ? 'bg-amber-500 hover:bg-amber-600 shadow-amber-500/20' : 'bg-[#0066FF] hover:bg-blue-700 shadow-blue-500/20'
                  }`}
                >
                  {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                  {isSubmitting ? 'Menyimpan...' : (editId ? 'Simpan Perubahan' : 'Simpan Data')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================= */}
      {/* 2. POPUP MODAL: KONFIRMASI HAPUS (DANGER) */}
      {/* ========================================= */}
      {isDeleteModalOpen && categoryToDelete && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <div onClick={() => !isDeleting && setIsDeleteModalOpen(false)} className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm cursor-pointer" />

          <div className="relative w-full max-w-sm bg-white/80 backdrop-blur-2xl border border-white/90 shadow-2xl rounded-3xl p-6 overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Hiasan Blob Merah */}
            <div className="absolute top-[-30%] right-[-20%] w-40 h-40 bg-red-400/10 blur-3xl rounded-full pointer-events-none" />

            <div className="flex flex-col items-center text-center relative z-10">
              <div className="w-14 h-14 rounded-full bg-red-100/80 flex items-center justify-center border border-red-200/50 mb-4 shadow-sm">
                <AlertTriangle className="w-7 h-7 text-red-600" />
              </div>
              <h3 className="font-extrabold text-gray-900 text-xl mb-2">Hapus Kategori?</h3>
              <p className="text-sm font-medium text-gray-500 mb-1">
                Anda yakin ingin menghapus kategori:
              </p>
              <p className="text-base font-bold text-gray-900 mb-6 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100">
                "{categoryToDelete.name}"
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