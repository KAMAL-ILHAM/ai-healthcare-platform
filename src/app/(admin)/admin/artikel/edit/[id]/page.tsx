'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Save, ArrowLeft, Type, Link2, FileText, ToggleLeft, Loader2, User, UploadCloud, Image as ImageIcon, Edit2 } from 'lucide-react';
// Import fungsi yang baru kita buat
import { updateArticle, getArticleById } from '../../action'; 
import { getCategories } from '../../../kategori/action';

export default function EditArtikelPage() {
  const router = useRouter();
  const params = useParams();
  const articleId = params.id as string;
  
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
  const [isLoadingData, setIsLoadingData] = useState(true);

  // Tarik Data Kategori & Data Artikel yang mau diedit
  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoadingData(true);
      
      // 1. Tarik Kategori
      const catResult = await getCategories();
      if (catResult.success && catResult.data) {
        // Tampilkan semua kategori, supaya jika artikel ini pakai kategori lama, tetap terpilih
        setCategories(catResult.data);
      }

      // 2. Tarik Data Artikel Asli
      if (articleId) {
        const articleResult = await getArticleById(articleId);
        if (articleResult.success && articleResult.data) {
          const data = articleResult.data;
          setTitle(data.title);
          setSlug(data.slug);
          setCategoryId(data.categoryId);
          setStatus(data.status);
          setImagePreview(data.thumbnail || null);
          
          // Kecerdasan Buatan: Pisahkan Penulis dari Konten
          let rawContent = data.content;
          const authorMatch = rawContent.match(/^\*Ditulis oleh: (.*?)\*\n\n/);
          
          if (authorMatch) {
            setAuthorName(authorMatch[1]); // Set nama penulis
            rawContent = rawContent.replace(/^\*Ditulis oleh: (.*?)\*\n\n/, ''); // Hapus tulisan penulis dari textarea
          }
          setContent(rawContent);
        }
      }
      
      setIsLoadingData(false);
    };
    
    fetchInitialData();
  }, [articleId]);

  // Handler Gambar
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
    
    const uploadedThumbnailUrl = imagePreview || "";

    // Trik Sulap: Sisipkan kembali nama penulis sebelum dikirim ke database
    let finalContent = content;
    if (authorName.trim() !== '') {
      finalContent = `*Ditulis oleh: ${authorName}*\n\n${content}`;
    }

    const result = await updateArticle(articleId, { 
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

  if (isLoadingData) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <Loader2 className="w-10 h-10 text-amber-500 animate-spin mb-4" />
        <p className="text-gray-500 font-bold animate-pulse">Memuat data artikel...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-500 pb-20 pt-2">
      
      <button 
        onClick={() => router.back()} 
        className="flex items-center text-gray-500 hover:text-amber-500 font-bold text-sm transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" /> Batal & Kembali
      </button>

      {/* TEMA KUNING (AMBER) UNTUK FORM EDIT */}
      <form onSubmit={handleSubmit} className="bg-white/60 backdrop-blur-xl border border-white/80 shadow-sm rounded-3xl p-6 md:p-8 space-y-8 relative overflow-hidden">
        
        {/* Latar Belakang Gradien Kuning Tipis */}
        <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-amber-400/10 blur-3xl rounded-full pointer-events-none" />

        <div className="border-b border-gray-100 pb-4 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-lg shadow-amber-500/20">
              <Edit2 size={20} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-gray-900 tracking-tight">Edit Artikel</h2>
              <p className="text-sm font-medium text-gray-500 mt-1">Perbarui judul, isi materi, atau status publikasi artikel.</p>
            </div>
          </div>
        </div>

        {/* --- BARIS 1: JUDUL & KATEGORI --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Judul Artikel *</label>
            <div className="relative flex items-center">
              <Type className="w-4 h-4 absolute left-4 text-gray-400" />
              <input 
                type="text" 
                required 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-white bg-white/70 focus:outline-none focus:ring-2 focus:ring-amber-500/30 shadow-sm transition-all font-semibold text-gray-800" 
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Kategori *</label>
            <select 
              required 
              value={categoryId} 
              onChange={(e) => setCategoryId(e.target.value)} 
              className="w-full px-4 py-3 rounded-xl border border-white bg-white/70 focus:outline-none focus:ring-2 focus:ring-amber-500/30 shadow-sm transition-all font-semibold text-gray-800 cursor-pointer appearance-none"
            >
              <option value="" disabled>Pilih Kategori...</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* --- BARIS 2: SLUG & PENULIS --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Slug URL *</label>
            <div className="relative flex items-center">
              <Link2 className="w-4 h-4 absolute left-4 text-gray-400" />
              <input 
                type="text" 
                required 
                value={slug} 
                onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))} 
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-white bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-amber-500/20 shadow-inner text-sm font-medium text-gray-600" 
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
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-white bg-white/70 focus:outline-none focus:ring-2 focus:ring-amber-500/30 shadow-sm transition-all font-semibold text-gray-800" 
                placeholder="Masukkan nama penulis..."
              />
            </div>
          </div>
        </div>

        {/* --- BARIS 3: UPLOAD GAMBAR & STATUS --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start relative z-10">
          
          <div className="lg:col-span-2 space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Thumbnail Gambar (Opsional)</label>
            <div className="flex items-center justify-center w-full">
              <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-44 border-2 border-dashed border-gray-300 hover:border-amber-500 rounded-2xl cursor-pointer bg-white/50 hover:bg-white/80 transition-all overflow-hidden group">
                
                {imagePreview ? (
                  <div className="relative w-full h-full group">
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-white font-bold text-sm flex items-center gap-2"><ImageIcon className="w-4 h-4"/> Ubah Gambar</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <div className="w-12 h-12 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <UploadCloud className="w-6 h-6" />
                    </div>
                    <p className="mb-1 text-sm text-gray-600 font-medium"><span className="font-bold text-amber-500">Klik untuk upload</span> atau drag and drop</p>
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
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-white bg-white/70 focus:outline-none focus:ring-2 focus:ring-amber-500/30 shadow-sm transition-all font-bold text-gray-800 cursor-pointer appearance-none"
              >
                <option value="DRAFT">DRAFT (Simpan sementara)</option>
                <option value="PUBLISHED">PUBLISHED (Terbitkan)</option>
              </select>
            </div>
            
            <div className="mt-4 p-4 bg-amber-50/50 border border-amber-100 rounded-xl">
              <h4 className="text-xs font-bold text-amber-800 uppercase mb-1">Informasi</h4>
              <p className="text-[11px] font-medium text-amber-700/80 leading-relaxed">
                Ubah status menjadi <strong>PUBLISHED</strong> jika artikel ini siap dibaca oleh pengguna aplikasi EIOHealth.
              </p>
            </div>
          </div>
          
        </div>

        {/* --- BARIS 4: KONTEN ARTIKEL --- */}
        <div className="space-y-2 relative z-10">
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
              className="w-full p-5 pb-8 rounded-2xl border border-white bg-white/70 focus:outline-none focus:ring-2 focus:ring-amber-500/30 shadow-sm transition-all font-medium text-gray-800 leading-relaxed resize-y" 
            />
            <div className="absolute bottom-3 right-5 flex items-center gap-1 bg-white/60 backdrop-blur-md px-2 py-0.5 rounded-md border border-gray-100">
              <span className={`text-[10px] font-black font-mono tracking-tight ${getCounterColor()}`}>
                {content.length}
              </span>
              <span className="text-[10px] font-bold font-mono text-gray-300">/ 2000</span>
            </div>
          </div>
        </div>

        {/* --- TOMBOL SUBMIT --- */}
        <div className="flex justify-end gap-3 border-t border-gray-100 pt-6 mt-8 relative z-10">
          <button 
            type="submit" 
            disabled={isSubmitting} 
            className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-lg shadow-amber-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
            {isSubmitting ? 'Memperbarui...' : 'Simpan Perubahan'}
          </button>
        </div>

      </form>
    </div>
  );
}