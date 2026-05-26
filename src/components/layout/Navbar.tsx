'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, Activity, BrainCircuit } from 'lucide-react';
import Link from 'next/link';

const navLinks = [
  { name: 'AI Chat', href: '/chat' },
  { name: 'Fasilitas Terdekat', href: '/nearby' },
  { name: 'Edukasi', href: '/education' },
  { name: 'Dashboard', href: '/dashboard' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4 md:p-6 pointer-events-none">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`
            w-full max-w-7xl pointer-events-auto
            flex items-center justify-between px-6 py-3
            rounded-[2.5rem] md:rounded-full transition-all duration-500
            border /* Ini yang membuat garis bordernya muncul */
            ${isScrolled 
              ? 'bg-white/70 backdrop-blur-2xl border-white/80 shadow-[0_8px_30px_rgba(0,0,0,0.06)]' 
              : 'bg-white/40 backdrop-blur-xl border-white/60 shadow-sm ring-1 ring-black/5'
            }
          `}
      >
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-premium group-hover:scale-105 transition-transform duration-300">
            <Activity className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900 font-satoshi">
            EIO<span className="text-primary">Health</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className="text-sm font-semibold text-gray-600 hover:text-primary transition-colors font-inter"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Action Button */}
        <div className="hidden md:flex items-center gap-5">
          <Link href="/login" className="text-sm font-bold text-gray-600 hover:text-gray-900 transition-colors font-inter">
            Masuk
          </Link>
          <Link 
            href="/register" 
            className="px-5 py-2.5 rounded-full bg-primary text-white text-sm font-semibold flex items-center gap-2 hover:shadow-glow-cyan hover:shadow-cyan transition-all duration-300 font-inter"
          >
            Mulai Sekarang
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2 text-gray-900 hover:text-primary transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </motion.nav>
    </header>
  );
}