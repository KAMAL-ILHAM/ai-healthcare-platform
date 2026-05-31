import prisma from '@/lib/prisma'; // Menggunakan instance tunggal aman
import DashboardClient from './DashboardClient';

export default async function AdminOverviewPage() {
  
  const [
    totalArticles,
    publishedArticles,
    activeCategoriesCount,
    regularUsersCount,
    latestArticles,
    recentArticles, 
    recentCategories 
  ] = await Promise.all([
    prisma.article.count(),
    prisma.article.count({ where: { status: 'PUBLISHED' } }),
    prisma.category.count({ where: { status: 'Aktif' } }),
    prisma.user.count({ where: { isStaff: false } }),
    
    // Tarik data cadangan untuk Pop-up lengkap
    prisma.article.findMany({
      take: 20, 
      orderBy: { createdAt: 'desc' },
      include: { category: true }
    }),
    
    prisma.article.findMany({
      take: 20,
      orderBy: { updatedAt: 'desc' },
      select: { title: true, updatedAt: true }
    }),

    prisma.category.findMany({
      take: 20,
      orderBy: { createdAt: 'desc' },
      select: { name: true, createdAt: true }
    })
  ]);

  // Gabungkan Riwayat Aktivitas
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

  const recentActivities = rawActivities
    .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
    .slice(0, 20);

  return (
    <DashboardClient 
      stats={{
        totalArticles,
        publishedArticles,
        activeCategories: activeCategoriesCount,
        regularUsersCount
      }}
      latestArticles={latestArticles}
      recentActivities={recentActivities}
    />
  );
}