import prisma from '@/lib/prisma';
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
    
    prisma.article.findMany({
      take: 20, 
      orderBy: { createdAt: 'desc' },
      include: { category: true } 
    }),
    
    prisma.article.findMany({
      take: 20,
      orderBy: { updatedAt: 'desc' },
      select: { 
        title: true, 
        updatedAt: true,
        author: { select: { name: true } } 
      }
    }),

    prisma.category.findMany({
      take: 20,
      orderBy: { createdAt: 'desc' },
      select: { 
        name: true, 
        createdAt: true,
        creator: { select: { name: true } } // <-- Tambahkan tarikan ini (ganti 'user' jadi 'author' kalau di schema namanya author)
      }
    })
  ]);

  // GABUNGKAN RIWAYAT AKTIVITAS
  const rawActivities = [
    ...recentArticles.map(art => ({
      title: `Artikel "${art.title}" diperbarui`,
      updatedAt: art.updatedAt,
      authorName: art.author?.name || 'Admin', 
    })),
    ...recentCategories.map(cat => ({
      title: `Kategori baru "${cat.name}" ditambahkan`,
      updatedAt: cat.createdAt,
      authorName: cat.creator?.name || 'Admin',
    }))
  ];

  // PERBAIKAN: Pastikan updatedAt adalah Date object sebelum melakukan .getTime()
  const recentActivities = rawActivities
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
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