'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Save, Type, Link2, FileText, ToggleLeft, Loader2, User, UploadCloud, Image as ImageIcon } from 'lucide-react';
import { createArticle } from '../action'; 
import { getCategories } from '../../kategori/action'; 

export default function TambahArtikelPage() {
  const router = useRouter();
  
  const [categories, setCategories] = useState<any[]>([]);
  
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const [authorName, setAuthorName] = useState('');
  const [content, setContent] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [status, setStatus] = useState('DRAFT'); 
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);

  useEffect(() => {
    const fetchCats = async () => {
      setIsLoadingCategories(true);
      const result = await getCategories();
      if (result.success && result.data) {
        const activeCategories = result.data.filter((cat: any) => cat.status === 'Aktif');
        setCategories(activeCategories);
      }
      setIsLoadingCategories(false);
    };
    fetchCats();
  }, []);

  useEffect(() => {
    setSlug(title.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-'));
  }, [title]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const uploadedThumbnailUrl = imagePreview ? "https://placeholder.com/gambar-sementara.jpg" : "";

    let finalContent = content;
    if (authorName.trim() !== '') {
      finalContent = `*Ditulis oleh: ${authorName}*\n\n${content}`;
    }

    const result = await createArticle({ 
      title, 
      slug, 
      content: finalContent, 
      thumbnail: uploadedThumbnailUrl, 
      categoryId, 
      status 
    });
    
    if (result.success) {
      router.push('/admin/artikel'); 
    } else {
      alert(result.error);
      setIsSubmitting(false);
    }
  };

  const getCounterColor = () => {
    if (content.length >= 2000) return 'text-red-500';
    if (content.length >= 1900) return 'text-amber-500';
    return 'text-gray-400';
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-500 pb-20 pt-2">
      
      {/* Tombol teks kembali sudah DIHAPUS, digantikan oleh Ikon Home di Layout */}

      <form onSubmit={handleSubmit} className="bg-white/60 backdrop-blur-xl border border-white/80 shadow-sm rounded-3xl p-6 md:p-8 space-y-8">
        
        <div className="border-b border-gray-100 pb-4">
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">Tulis Artikel Baru</h2>
          <p className="text-sm font-medium text-gray-500 mt-1">Lengkapi form di bawah sesuai dengan skema database EIOHealth.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Judul Artikel *</label>
            <div className="relative flex items-center">
              <Type className="w-4 h-4 absolute left-4 text-gray-400" />
              <input 
                type="text" 
                required 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-white bg-white/70 focus:outline-none focus:ring-2 focus:ring-[#0066FF]/30 shadow-sm transition-all font-semibold text-gray-800" 
                placeholder="Masukkan judul artikel..." 
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Kategori *</label>
            <select 
              required 
              value={categoryId} 
              onChange={(e) => setCategoryId(e.target.value)} 
              className="w-full px-4 py-3 rounded-xl border border-white bg-white/70 focus:outline-none focus:ring-2 focus:ring-[#0066FF]/30 shadow-sm transition-all font-semibold text-gray-800 cursor-pointer appearance-none"
            >
              <option value="" disabled>{isLoadingCategories ? 'Memuat kategori...' : 'Pilih Kategori...'}</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Slug URL (Otomatis) *</label>
            <div className="relative flex items-center">
              <Link2 className="w-4 h-4 absolute left-4 text-gray-400" />
              <input 
                type="text" 
                required 
                value={slug} 
                onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))} 
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-white bg-gray-50/50 focus:outline-none shadow-inner text-sm font-medium text-gray-500" 
                placeholder="otomatis-dari-judul" 
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">
              Penulis Artikel (Opsional)
            </label>
            <div className="relative flex items-center">
              <User className="w-4 h-4 absolute left-4 text-gray-400" />
              <input 
                type="text" 
                value={authorName} 
                onChange={(e) => setAuthorName(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-white bg-white/70 focus:outline-none focus:ring-2 focus:ring-[#0066FF]/30 shadow-sm transition-all font-semibold text-gray-800" 
                placeholder="Masukkan nama penulis..."
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          <div className="lg:col-span-2 space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Thumbnail Gambar (Opsional)</label>
            <div className="flex items-center justify-center w-full">
              <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-44 border-2 border-dashed border-gray-300 hover:border-[#0066FF] rounded-2xl cursor-pointer bg-white/50 hover:bg-white/80 transition-all overflow-hidden group">
                
                {imagePreview ? (
                  <div className="relative w-full h-full group">
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-white font-bold text-sm flex items-center gap-2"><ImageIcon className="w-4 h-4"/> Ganti Gambar</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <div className="w-12 h-12 bg-blue-50 text-[#0066FF] rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <UploadCloud className="w-6 h-6" />
                    </div>
                    <p className="mb-1 text-sm text-gray-600 font-medium"><span className="font-bold text-[#0066FF]">Klik untuk upload</span> atau drag and drop</p>
                    <p className="text-xs font-semibold text-gray-400">SVG, PNG, JPG (Maks. 2MB)</p>
                  </div>
                )}
                <input id="dropzone-file" type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
              </label>
            </div>
          </div>

          <div className="space-y-2 h-full">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Status Publikasi *</label>
            <div className="relative flex items-center">
              <ToggleLeft className="w-4 h-4 absolute left-4 text-gray-400" />
              <select 
                required 
                value={status} 
                onChange={(e) => setStatus(e.target.value)} 
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-white bg-white/70 focus:outline-none focus:ring-2 focus:ring-[#0066FF]/30 shadow-sm transition-all font-bold text-gray-800 cursor-pointer appearance-none"
              >
                <option value="DRAFT">DRAFT (Simpan sementara)</option>
                <option value="PUBLISHED">PUBLISHED (Terbitkan)</option>
              </select>
            </div>
            
            <div className="mt-4 p-4 bg-blue-50/50 border border-blue-100 rounded-xl">
              <h4 className="text-xs font-bold text-blue-800 uppercase mb-1">Informasi</h4>
              <p className="text-[11px] font-medium text-blue-600/80 leading-relaxed">
                Artikel yang berstatus <strong>DRAFT</strong> tidak akan dimunculkan ke publikasi aplikasi. Gunakan status ini jika Anda belum selesai menulis.
              </p>
            </div>
          </div>
          
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1 flex items-center gap-2">
            <FileText className="w-3.5 h-3.5" /> Isi Artikel *
          </label>
          <div className="relative">
            <textarea 
              required 
              maxLength={2000} 
              value={content} 
              onChange={(e) => setContent(e.target.value)} 
              rows={15} 
              className="w-full p-5 pb-8 rounded-2xl border border-white bg-white/70 focus:outline-none focus:ring-2 focus:ring-[#0066FF]/30 shadow-sm transition-all font-medium text-gray-800 leading-relaxed resize-y" 
              placeholder="Tulis materi edukasi medis Anda di sini..." 
            />
            <div className="absolute bottom-3 right-5 flex items-center gap-1 bg-white/60 backdrop-blur-md px-2 py-0.5 rounded-md border border-gray-100">
              <span className={`text-[10px] font-black font-mono tracking-tight ${getCounterColor()}`}>
                {content.length}
              </span>
              <span className="text-[10px] font-bold font-mono text-gray-300">/ 2000</span>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-gray-100 pt-6 mt-8">
          <button 
            type="submit" 
            disabled={isSubmitting || isLoadingCategories} 
            className="flex items-center gap-2 bg-[#0066FF] hover:bg-blue-700 text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
            {isSubmitting ? 'Menyimpan...' : 'Simpan Artikel'}
          </button>
        </div>

      </form>
    </div>
  );
}