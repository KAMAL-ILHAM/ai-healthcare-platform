'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: LucideIcon;
  colorClass: string;
  bgClass: string;
  delay?: number;
}

export default function StatsCard({ title, value, subtitle, icon: Icon, colorClass, bgClass, delay = 0 }: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="bg-white border border-slate-100 rounded-[24px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between"
    >
      <div className="flex justify-between items-start mb-1">
        <div>
          <h3 className="text-3xl font-black text-slate-900 tracking-tight mt-1">{value}</h3>
          <p className="text-sm font-bold text-slate-500 mt-2">{title}</p>
        </div>
        {/* Ikon dipindah ke sudut kanan atas */}
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${bgClass} ${colorClass}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <p className="text-xs font-semibold text-slate-400 mt-1">{subtitle}</p>
    </motion.div>
  );
}