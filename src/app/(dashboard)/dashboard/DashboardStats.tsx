'use client';

import { BookOpen, Activity, MapPin } from 'lucide-react';
import StatsCard from '@/components/dashboard/StatsCard';

export default function DashboardStats({ totalArticles, totalCategories }: { totalArticles: string, totalCategories: string }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <StatsCard 
        title="Total Artikel Edukasi" value={totalArticles} subtitle="Siap dibaca" 
        icon={BookOpen} colorClass="text-emerald-600" bgClass="bg-emerald-50" delay={0.1} 
      />
      <StatsCard 
        title="Kategori Pembahasan" value={totalCategories} subtitle="Topik kesehatan" 
        icon={Activity} colorClass="text-rose-500" bgClass="bg-rose-50" delay={0.2} 
      />
      {/* 🌟 Kartu ketiga diubah menjadi Fasilitas Medis */}
      <StatsCard 
        title="Cari Fasilitas Medis" value="Peta" subtitle="Temukan apotek & klinik terdekat." 
        icon={MapPin} colorClass="text-cyan-600" bgClass="bg-cyan-50" delay={0.3} 
      />
    </div>
  );
}