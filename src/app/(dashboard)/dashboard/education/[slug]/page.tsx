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
    // Mempersempit area bungkus dengan menambahkan padding px-4 md:px-8
    <div className="w-full pb-24 pt-6 px-4 md:px-8">
      
      {/* Mengubah max-w-4xl menjadi max-w-3xl agar card lebih ramping */}
      <div className="max-w-1x3 mx-auto">
        
        {/* Kotak Artikel Utama diberi class 'relative' agar ikon Home bisa diletakkan di sudutnya */}
        <article className="relative bg-white/70 backdrop-blur-md p-8 md:p-12 rounded-[32px] border border-slate-200/60 shadow-sm">
          
          {/* Tombol Home di Sudut Kanan Atas Card */}
          <Link 
            href="/dashboard/education" 
            className="absolute top-6 right-6 md:top-8 md:right-8 flex items-center justify-center w-10 h-10 bg-white border border-slate-200 text-slate-500 hover:text-indigo-600 hover:bg-slate-50 hover:shadow-md rounded-full shadow-sm transition-all duration-300"
            title="Kembali ke Halaman Edukasi"
          >
            <Home className="w-4 h-4" />
          </Link>

          <header className="mb-10">
            <div className="flex flex-wrap items-center gap-4 mb-6 text-sm font-semibold text-slate-500 pr-12">
              <span className="px-3.5 py-1.5 bg-indigo-50 text-indigo-700 rounded-full border border-indigo-100/50">
                {article.category.name}
              </span>
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {formattedDate}</span>
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> 5 min read</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-[1.2] mb-8 tracking-tight pr-8">
              {article.title}
            </h1>

            <div className="flex items-center gap-4 pt-6 border-t border-slate-100">
              <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-white font-bold text-lg shadow-inner">
                {article.author?.name ? article.author.name.substring(0, 2).toUpperCase() : 'AD'}
              </div>
              <div>
                <p className="text-slate-900 font-bold leading-none mb-1.5">{article.author?.name || 'Tim Medis'}</p>
                <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Apoteker & Edukator</p>
              </div>
            </div>
          </header>

          {article.thumbnail && (
            <div className="w-full aspect-[21/9] rounded-3xl overflow-hidden mb-12 shadow-sm bg-slate-100">
              <img 
                src={article.thumbnail} 
                alt={article.title} 
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div 
            className="prose prose-slate prose-lg max-w-none 
              prose-headings:font-black prose-headings:text-slate-900 prose-headings:tracking-tight 
              prose-p:text-slate-700 prose-p:leading-[1.8] prose-p:text-justify prose-p:mb-6
              prose-a:text-indigo-600 prose-a:font-bold hover:prose-a:text-indigo-500
              prose-img:rounded-3xl prose-img:shadow-sm"
            dangerouslySetInnerHTML={{ __html: formattedContent }}
          />

          <div className="mt-16 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-600 font-medium">Apakah edukasi medis ini membantu Anda?</p>
            <button className="flex items-center gap-2 px-6 py-3 bg-rose-50 border border-rose-100 text-rose-600 hover:bg-rose-100 hover:border-rose-200 font-bold rounded-full transition-all shadow-sm group text-sm">
              <Heart className="w-5 h-5 group-hover:fill-rose-200 transition-colors" /> Suka Artikel
            </button>
          </div>

        </article>
      </div>
    </div>
  );
}