import prisma from '@/lib/prisma';
import EducationClient from './EducationClient';

export default async function EducationPage() {
  // 1. Tarik Data dari Database Lokal (Prisma)
  // Menarik artikel berstatus PUBLISHED beserta data pembuat dan kategorinya
  const dbArticlesRaw = await prisma.article.findMany({
    where: { status: 'PUBLISHED' },
    include: { 
      category: true, 
      author: true 
    },
    orderBy: { createdAt: 'desc' },
  });

  // Seragamkan format data database agar sesuai dengan kebutuhan Client
  const dbArticles = dbArticlesRaw.map((article) => ({
    id: article.id,
    title: article.title,
    excerpt: article.content ? article.content.substring(0, 120) + '...' : 'Baca artikel lengkapnya di sini.', 
    category: article.category.name,
    readTime: "5 min", 
    likes: Math.floor(Math.random() * 500) + 100, // Dummy view/likes khusus UI
    author: article.author?.name || 'Tenaga Medis',
    image: article.thumbnail || 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800',
    url: `/dashboard/education/${article.slug}`,
    isApi: false,
  }));

  // 2. Tarik Data dari API Eksternal (NewsAPI)
  let apiArticles: any[] = [];
  try {
    const apiKey = process.env.NEWS_API_KEY;

    if (!apiKey) {
      console.error("PERINGATAN: NEWS_API_KEY belum diatur di file .env!");
    } else {
      //   PERBAIKAN 1: Kata kunci dibuat sangat spesifik untuk Edukasi & Penyakit
      const query = 'penyakit OR gejala OR pengobatan OR pencegahan OR "edukasi kesehatan" OR "tips sehat" OR nutrisi';
      const encodedQuery = encodeURIComponent(query); // Mengamankan spasi dan tanda kutip untuk URL

      //   PERBAIKAN 2: Ubah sortBy menjadi 'relevancy' (Paling Relevan)
      const res = await fetch(
        `https://newsapi.org/v2/everything?q=${encodedQuery}&language=id&sortBy=relevancy&apiKey=${apiKey}`,
        { 
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
          },
          next: { revalidate: 3600 } 
        }
      );
      
      const data = await res.json();

      if (data.articles) {
        apiArticles = data.articles
          .filter((a: any) => a.title && a.urlToImage) 
          .map((article: any, index: number) => ({
            id: `api-${index}`,
            title: article.title,
            excerpt: article.description || 'Baca selengkapnya mengenai edukasi medis ini langsung di portal aslinya.',
            category: 'Edukasi Medis', //   Nama kategorinya kita ubah biar lebih pas
            readTime: "Luar",
            likes: Math.floor(Math.random() * 300) + 50,
            author: article.author || article.source?.name || 'Portal Kesehatan',
            image: article.urlToImage,
            url: article.url, 
            isApi: true,
          }));
      }
    }
  } catch (error) {
    console.error("Gagal menarik API Eksternal:", error);
  }

  // 3. Gabungkan Data (Prioritaskan artikel lokal dari DB di urutan teratas)
  const allArticles = [...dbArticles, ...apiArticles];

  // 4. Pisahkan untuk UI (Hero vs Grid biasa)
  const featuredArticle = allArticles.length > 0 ? allArticles[0] : null;
  const regularArticles = allArticles.length > 1 ? allArticles.slice(1) : [];

  // 5. Ekstrak nama kategori secara dinamis (tanpa duplikat)
  const uniqueCategories = Array.from(new Set(allArticles.map(a => a.category)));
  const categories = ['Semua Topik', ...uniqueCategories];

  // 6. Buat Trending Topics (Ambil 3 artikel dengan likes/views tertinggi)
  const trendingTopics = [...allArticles]
    .sort((a, b) => b.likes - a.likes)
    .slice(0, 3)
    .map((article, index) => ({
      rank: `0${index + 1}`,
      title: article.title,
      views: `${(article.likes * 12.5 / 1000).toFixed(1)}k`,
      url: article.url,
      isApi: article.isApi
    }));

  return (
    <EducationClient 
      initialCategories={categories}
      featuredArticle={featuredArticle}
      articles={regularArticles}
      trendingTopics={trendingTopics}
    />
  );
}