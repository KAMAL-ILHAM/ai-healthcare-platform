'use client';

import { BookOpen, Activity, MapPin } from 'lucide-react';
import StatsCard from '@/components/dashboard/StatsCard';

export default function DashboardStats({ totalArticles, totalCategories }: { totalArticles: string, totalCategories: string }) {
  return (
    <div className="flex overflow-x-auto md:grid md:grid-cols-3 gap-4 md:gap-5 pb-2 md:pb-0 snap-x snap-mandatory no-scrollbar">
      
      <div className="min-w-[240px] md:min-w-0 snap-center shrink-0">
        <StatsCard 
          title="Total Artikel Edukasi" value={totalArticles} subtitle="Siap dibaca" 
          icon={BookOpen} colorClass="text-emerald-600" bgClass="bg-emerald-50" delay={0.1} 
        />
      </div>

      <div className="min-w-[240px] md:min-w-0 snap-center shrink-0">
        <StatsCard 
          title="Kategori Pembahasan" value={totalCategories} subtitle="Topik kesehatan" 
          icon={Activity} colorClass="text-rose-500" bgClass="bg-rose-50" delay={0.2} 
        />
      </div>

      <div className="min-w-[240px] md:min-w-0 snap-center shrink-0">
        <StatsCard 
          title="Cari Fasilitas Medis" value="Peta" subtitle="Temukan apotek & klinik terdekat." 
          icon={MapPin} colorClass="text-cyan-600" bgClass="bg-cyan-50" delay={0.3} 
        />
      </div>

    </div>
  );
}