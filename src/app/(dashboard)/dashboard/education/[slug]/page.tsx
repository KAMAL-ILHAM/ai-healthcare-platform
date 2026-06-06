import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Home, Calendar, Clock, Heart } from 'lucide-react';

export default async function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const articleSlug = resolvedParams.slug;

  const article = await prisma.article.findUnique({
    where: { slug: articleSlug },
    include: {
      category: true,
      author: true,
    }
  });

  if (!article || article.status !== 'PUBLISHED') {
    notFound();
  }

  const formattedDate = new Intl.DateTimeFormat('id-ID', {
    dateStyle: 'long',
  }).format(article.createdAt);

  const formattedContent = article.content.includes('<p>') 
    ? article.content 
    : article.content
        .split(/\r?\n+/) 
        .filter((paragraph) => paragraph.trim() !== '')
        .map((paragraph) => `<p>${paragraph.trim()}</p>`)
        .join('');

  return (
    // 🌟 PERBAIKAN MOBILE: Padding luar di HP disesuaikan agar tidak terlalu menjorok
    <div className="w-full pb-28 md:pb-24 pt-4 md:pt-6 px-3 sm:px-4 md:px-8">
      
      <div className="max-w-3xl mx-auto">
        
        {/* 🌟 PERBAIKAN MOBILE: Padding kotak artikel dikecilkan di HP (p-5), membesar di tablet (sm:p-8) dan laptop (md:p-12) */}
        <article className="relative bg-white/70 backdrop-blur-md p-5 sm:p-8 md:p-12 rounded-[24px] sm:rounded-[32px] border border-slate-200/60 shadow-sm">
          
          {/* Tombol Home di Sudut Kanan Atas Card */}
          {/* 🌟 PERBAIKAN MOBILE: Ukuran dan posisi tombol disesuaikan di layar HP */}
          <Link 
            href="/dashboard/education" 
            className="absolute top-4 right-4 md:top-8 md:right-8 flex items-center justify-center w-8 h-8 md:w-10 md:h-10 bg-white border border-slate-200 text-slate-500 hover:text-indigo-600 hover:bg-slate-50 hover:shadow-md rounded-full shadow-sm transition-all duration-300 z-10"
            title="Kembali ke Halaman Edukasi"
          >
            <Home className="w-3.5 h-3.5 md:w-4 md:h-4" />
          </Link>

          <header className="mb-8 md:mb-10">
            {/* 🌟 PERBAIKAN MOBILE: Font size metadata dikecilkan di HP (text-xs) */}
            <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-4 md:mb-6 text-xs md:text-sm font-semibold text-slate-500 pr-10">
              <span className="px-3 py-1 md:px-3.5 md:py-1.5 bg-indigo-50 text-indigo-700 rounded-full border border-indigo-100/50">
                {article.category.name}
              </span>
              <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 md:w-4 md:h-4" /> {formattedDate}</span>
              <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 md:w-4 md:h-4" /> 5 min read</span>
            </div>
            
            {/* 🌟 PERBAIKAN MOBILE: Judul diperkecil di HP (text-2xl / 3xl) */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 leading-[1.3] md:leading-[1.2] mb-6 md:mb-8 tracking-tight pr-4 md:pr-8">
              {article.title}
            </h1>

            <div className="flex items-center gap-3 md:gap-4 pt-5 md:pt-6 border-t border-slate-100">
              {/* 🌟 PERBAIKAN MOBILE: Ukuran avatar penulis disesuaikan */}
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-800 flex items-center justify-center text-white font-bold text-base md:text-lg shadow-inner shrink-0">
                {article.author?.name ? article.author.name.substring(0, 2).toUpperCase() : 'AD'}
              </div>
              <div>
                <p className="text-slate-900 text-sm md:text-base font-bold leading-none mb-1 md:mb-1.5">{article.author?.name || 'Tim Medis'}</p>
                <p className="text-slate-500 text-[10px] md:text-xs font-semibold uppercase tracking-wider">Apoteker & Edukator</p>
              </div>
            </div>
          </header>

          {article.thumbnail && (
            <div className="w-full aspect-video md:aspect-[21/9] rounded-[20px] md:rounded-3xl overflow-hidden mb-8 md:mb-12 shadow-sm bg-slate-100">
              <img 
                src={article.thumbnail} 
                alt={article.title} 
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* 🌟 PERBAIKAN MOBILE: Menggunakan prose-base untuk HP agar teks tidak kebesaran, prose-lg untuk laptop */}
          <div 
            className="prose prose-slate prose-base md:prose-lg max-w-none 
              prose-headings:font-black prose-headings:text-slate-900 prose-headings:tracking-tight 
              prose-p:text-slate-700 prose-p:leading-[1.7] md:prose-p:leading-[1.8] prose-p:text-left sm:prose-p:text-justify prose-p:mb-5 md:prose-p:mb-6
              prose-a:text-indigo-600 prose-a:font-bold hover:prose-a:text-indigo-500
              prose-img:rounded-2xl md:prose-img:rounded-3xl prose-img:shadow-sm"
            dangerouslySetInnerHTML={{ __html: formattedContent }}
          />

          <div className="mt-12 md:mt-16 pt-6 md:pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 md:gap-4 text-center sm:text-left">
            <p className="text-sm text-slate-600 font-medium">Apakah edukasi medis ini membantu Anda?</p>
            <button className="flex items-center justify-center gap-2 px-6 py-3 w-full sm:w-auto bg-rose-50 border border-rose-100 text-rose-600 hover:bg-rose-100 hover:border-rose-200 font-bold rounded-full transition-all shadow-sm group text-sm">
              <Heart className="w-5 h-5 group-hover:fill-rose-200 transition-colors" /> Suka Artikel
            </button>
          </div>

        </article>
      </div>
    </div>
  );
}