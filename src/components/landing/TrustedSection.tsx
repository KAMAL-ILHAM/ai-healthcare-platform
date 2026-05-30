'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { Bot, MapPin, Clock, Activity, Building2, ShieldPlus, HeartPulse, Stethoscope } from 'lucide-react';

// --- Animated Counter ---
function AnimatedNumber({ value, suffix = "", prefix = "", duration = 2.5 }: { value: number, suffix?: string, prefix?: string, duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (inView && ref.current) {
      const controls = animate(0, value, {
        duration: duration,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (v) => {
          if (ref.current) {
            const formatted = Math.floor(v).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            ref.current.textContent = `${prefix}${formatted}${suffix}`;
          }
        },
      });
      return () => controls.stop();
    }
  }, [inView, value, prefix, suffix, duration]);

  return <span ref={ref}>{prefix}0{suffix}</span>;
}

// Data Logo yang lebih realistis dengan ikon pendamping
const partners = [
  { name: "Kemenkes RI", icon: <ShieldPlus className="w-5 h-5" /> },
  { name: "Siloam Medika", icon: <Building2 className="w-5 h-5" /> },
  { name: "BioPharma", icon: <Activity className="w-5 h-5" /> },
  { name: "Apex Health", icon: <HeartPulse className="w-5 h-5" /> },
  { name: "Mitra Keluarga", icon: <Stethoscope className="w-5 h-5" /> },
];

const stats = [
  { 
    title: "Konsultasi AI", 
    value: 10000, 
    suffix: "+", 
    icon: <Bot className="w-6 h-6 text-primary" />,
    glowColor: "group-hover:border-primary/30 group-hover:shadow-[0_0_40px_rgba(79,70,229,0.15)]"
  },
  { 
    title: "Fasilitas Kesehatan", 
    value: 500, 
    suffix: "+", 
    icon: <MapPin className="w-6 h-6 text-cyan-500" />,
    glowColor: "group-hover:border-cyan-400/40 group-hover:shadow-[0_0_40px_rgba(6,182,212,0.15)]"
  },
  { 
    title: "AI Support", 
    value: 24, 
    suffix: "/7", 
    icon: <Clock className="w-6 h-6 text-indigo-500" />,
    glowColor: "group-hover:border-indigo-400/40 group-hover:shadow-[0_0_40px_rgba(99,102,241,0.15)]"
  },
];

export default function TrustedSection() {
  return (
    <section className="py-16 bg-white relative overflow-hidden z-20">
      
      {/* 1. Subtle Background Mesh (Agar Glassmorphism Terlihat) */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[300px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[300px] bg-cyan-400/5 rounded-full blur-[100px] pointer-events-none" />
      
      {/* Garis batas super tipis di atas */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-px bg-gradient-to-r from-transparent via-gray-100 to-transparent" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        
        {/* PART 1: SMOOTH INFINITE MARQUEE (Grayscale Logos) */}
        <div className="mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center mb-8"
          >
            <p className="text-[11px] font-bold tracking-[0.25em] text-gray-400 uppercase font-satoshi flex items-center gap-2">
              <Activity className="w-3.5 h-3.5 text-gray-300" /> 
              Dipercaya oleh institusi terkemuka
            </p>
          </motion.div>
          
          <div className="relative flex overflow-hidden w-full max-w-4xl mx-auto">
            {/* Efek fade out di sisi kiri & kanan agar logo muncul/hilang perlahan */}
            <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-white to-transparent z-10" />
            <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-white to-transparent z-10" />
            
            <motion.div 
              className="flex whitespace-nowrap items-center gap-12 md:gap-20"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ ease: "linear", duration: 25, repeat: Infinity }}
            >
              {[...partners, ...partners, ...partners].map((partner, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2.5 text-gray-400 hover:text-gray-900 transition-colors duration-500 grayscale hover:grayscale-0 cursor-pointer"
                >
                  {partner.icon}
                  <span className="text-xl font-bold font-satoshi tracking-tight">{partner.name}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* PART 2: COMPACT GLASS STATISTIC CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              transition={{ delay: index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className={`
                relative group flex flex-col items-center text-center p-8 
                bg-white/60 backdrop-blur-2xl rounded-[2rem] 
                border border-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] 
                transition-all duration-500 cursor-default
                ${stat.glowColor}
              `}
            >
              {/* Highlight atas kartu (Efek kilap kaca) */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              {/* Icon Container */}
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100/50 flex items-center justify-center mb-5 border border-gray-100 shadow-sm group-hover:scale-110 transition-transform duration-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-white/40 group-hover:opacity-0 transition-opacity" />
                {stat.icon}
              </div>
              
              {/* Animated Counter */}
              <div className="text-4xl md:text-[2.75rem] font-extrabold text-gray-900 font-satoshi tracking-tighter mb-2 leading-none">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              </div>
              
              {/* Label */}
              <div className="text-sm font-semibold text-gray-500 font-inter tracking-wide">
                {stat.title}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}