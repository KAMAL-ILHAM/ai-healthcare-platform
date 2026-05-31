import { PrismaClient } from '@prisma/client';
import DashboardClient from './DashboardClient';

const prisma = new PrismaClient();

export default async function AdminOverviewPage() {
  
  // 1. Tarik Data Metrik Utama & Artikel Terbaru
  const [
    totalArticles,
    publishedArticles,
    activeCategoriesCount,
    regularUsersCount,
    latestArticles,
    recentArticles, // Tarik riwayat artikel terpisah
    recentCategories // Tarik riwayat kategori terpisah
  ] = await Promise.all([
    prisma.article.count(),
    prisma.article.count({ where: { status: 'PUBLISHED' } }),
    prisma.category.count({ where: { status: 'Aktif' } }),
    prisma.user.count({ where: { isStaff: false } }),
    
    // Listing Artikel Terbaru (Untuk tabel)
    prisma.article.findMany({
      take: 4,
      orderBy: { createdAt: 'desc' },
      include: { category: true }
    }),
    
    // Riwayat Artikel Terakhir Diedit/Dibuat
    prisma.article.findMany({
      take: 4,
      orderBy: { updatedAt: 'desc' },
      select: { title: true, updatedAt: true }
    }),

    // Riwayat Kategori Terakhir Dibuat
    prisma.category.findMany({
      take: 4,
      orderBy: { createdAt: 'desc' },
      select: { name: true, createdAt: true }
    })
  ]);

  // 2. KECERDASAN BUATAN: Gabungkan Riwayat Artikel & Kategori
  const rawActivities = [
    ...recentArticles.map(art => ({
      title: `Artikel "${art.title}" diperbarui`,
      updatedAt: art.updatedAt,
    })),
    ...recentCategories.map(cat => ({
      title: `Kategori baru "${cat.name}" ditambahkan`,
      updatedAt: cat.createdAt,
    }))
  ];

  // 3. Urutkan berdasarkan waktu paling baru, dan ambil 4 teratas
  const recentActivities = rawActivities
    .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
    .slice(0, 3);

  return (
    <DashboardClient 
      stats={{
        totalArticles,
        publishedArticles,
        activeCategories: activeCategoriesCount,
        regularUsersCount
      }}
      latestArticles={latestArticles}
      recentActivities={recentActivities} // Kirim data gabungan ke Client
    />
  );
}