'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: LucideIcon;
  colorClass: string;
  bgClass: string;
  delay?: number;
}

export default function StatsCard({ 
  title, value, subtitle, icon: Icon, colorClass, bgClass, delay = 0 
}: StatsCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ delay }}
      className="bg-white/60 backdrop-blur-xl border border-white/80 p-6 rounded-[28px] shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(79,70,229,0.08)] hover:-translate-y-1 transition-all duration-300 group"
    >
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-2xl ${bgClass} ${colorClass} transition-colors`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <div>
        <h3 className="text-3xl font-bold text-gray-900 tracking-tight">{value}</h3>
        <p className="text-sm font-semibold text-gray-500 mt-1">{title}</p>
        <p className="text-xs text-gray-400 mt-1">{subtitle}</p>
      </div>
    </motion.div>
  );
}