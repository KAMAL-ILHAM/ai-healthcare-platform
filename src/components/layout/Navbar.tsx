'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, ArrowRight, Activity, Bot, MapPin, 
  BookOpen, LayoutDashboard, Home, Layers, ChevronDown, Route, Star 
} from 'lucide-react';
import Link from 'next/link';

// 4 Menu Utama
const mainLinks = [
  { name: 'Beranda', href: '#hero', icon: Home },
  { name: 'Layanan', href: '#layanan', icon: Layers },
  { name: 'AI Health', href: '#ai-health', icon: Bot },
  { name: 'Dashboard', href: '#dashboard', icon: LayoutDashboard },
];

// Menu Dropdown "Lainnya"
const dropdownLinks = [
  { name: 'Alur Penggunaan', href: '#how-it-works', icon: Route },
  { name: 'Integrasi Lokasi', href: '#location', icon: MapPin },
  { name: 'Pusat Edukasi', href: '#education', icon: BookOpen },
  { name: 'Ulasan Pengguna', href: '#testimonials', icon: Star },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>('#hero');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Logika "Scroll Spy" untuk mendeteksi section mana yang sedang aktif di layar
      const allLinks = [...mainLinks, ...dropdownLinks];
      for (const link of allLinks) {
        const sectionId = link.href.replace('#', '');
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Jika elemen berada di area pandang atas
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(link.href);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fungsi khusus untuk smooth scroll agar tidak tertutup Navbar
  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const elem = document.getElementById(targetId);
    
    if (elem) {
      const navbarHeight = 80; // Tinggi navbar kamu
      const elemPosition = elem.getBoundingClientRect().top;
      const offsetPosition = elemPosition + window.scrollY - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      setActiveSection(href);
      setMobileMenuOpen(false); // Tutup menu di mobile setelah klik
      setIsDropdownOpen(false); // Tutup dropdown
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex flex-col items-center p-4 md:p-6 pointer-events-none">
      {/*   KAPSUL NAVBAR UTAMA */}
      <motion.nav
        initial={{ width: '80%', opacity: 0, y: -20 }}
        animate={{ width: '95%', opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
        className={`
            pointer-events-auto flex items-center justify-between px-6 md:px-8 
            transition-all duration-300 ease-in-out
            rounded-[2rem] border
            ${isScrolled ? 'h-16' : 'h-20'} 
            ${isScrolled 
              ? 'bg-white/80 backdrop-blur-2xl border-white/80 shadow-[0_8px_30px_rgba(0,0,0,0.06)]' 
              : 'bg-white/60 backdrop-blur-xl border-white/60 shadow-sm ring-1 ring-black/5'
            }
        `}
      >
        <Link href="/" className="flex items-center gap-3 shrink-0" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-600 to-cyan-500 flex items-center justify-center shrink-0 shadow-lg shadow-indigo-500/20">
            <Activity className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900 whitespace-nowrap">
            EIO<span className="font-light text-gradient-cyan-indigo"> Health</span>
          </span>
        </Link>

        {/*   DESKTOP NAVIGATION */}
        <div className="hidden md:flex items-center gap-1">
          {/* Loop Menu Utama */}
          {mainLinks.map((link) => {
            const isActive = activeSection === link.href;
            const isHovered = hoveredLink === link.name;
            const shouldShowLine = isHovered || (isActive && !hoveredLink);

            return (
              <a 
                key={link.name} 
                href={link.href}
                onClick={(e) => handleScrollToSection(e, link.href)}
                onMouseEnter={() => setHoveredLink(link.name)}
                onMouseLeave={() => setHoveredLink(null)}
                className={`relative px-4 py-2 text-sm font-semibold transition-colors ${isActive || isHovered ? 'text-indigo-600' : 'text-gray-600 hover:text-indigo-600'}`}
              >
                <div className="flex items-center gap-2">
                    <link.icon className="w-4 h-4" />
                    {link.name}
                </div>
                
                {shouldShowLine && (
                  <motion.div
                    layoutId="activeTab"
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    exit={{ opacity: 0, scaleX: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25, duration: 0.3 }}
                    className="absolute bottom-0 left-4 right-4 h-0.5 bg-indigo-600 rounded-full"
                  />
                )}
              </a>
            );
          })}

          {/* Dropdown "Lainnya" */}
          <div 
            className="relative"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <button className={`flex items-center gap-1 px-4 py-2 text-sm font-semibold transition-colors ${isDropdownOpen ? 'text-indigo-600' : 'text-gray-600 hover:text-indigo-600'}`}>
              Lainnya
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Isi Dropdown */}
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full right-0 mt-4 w-56 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-100 p-2 flex flex-col gap-1 origin-top-right"
                >
                  {dropdownLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={(e) => handleScrollToSection(e, link.href)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-indigo-600 hover:bg-indigo-50/50 rounded-xl transition-colors"
                    >
                      <link.icon className="w-4 h-4" />
                      {link.name}
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/*   ACTION BUTTONS (DESKTOP) */}
        <div className="hidden md:flex items-center gap-4 shrink-0">
          <Link href="/login" className="text-sm font-bold text-gray-600 hover:text-gray-900 transition-colors">
            Masuk
          </Link>
          
          <Link href="/register">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2.5 rounded-full text-white text-sm font-semibold flex items-center gap-2 transition-all duration-300 bg-gray-900 hover:bg-gradient-to-r hover:from-cyan-400 hover:to-blue-600 hover:shadow-lg hover:shadow-cyan-500/30 cursor-pointer"
            >
              Buat Akun
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </Link>
        </div>

        {/*   TOMBOL HAMBURGER (MOBILE) */}
        <button 
          className="md:hidden p-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100/50 rounded-full transition-colors" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </motion.nav>

      {/*   MENU DROPDOWN SELULER (MOBILE MENU) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto absolute top-[90px] w-[92%] max-h-[80vh] overflow-y-auto bg-white/95 backdrop-blur-2xl rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-gray-100 p-5 flex flex-col gap-4 md:hidden scrollbar-thin"
          >
            {/* Navigasi Utama */}
            <div className="flex flex-col gap-1">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-3">Menu Utama</p>
              {mainLinks.map((link) => {
                const isActive = activeSection === link.href;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleScrollToSection(e, link.href)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${isActive ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
                  >
                    <link.icon className="w-5 h-5" />
                    {link.name}
                  </a>
                );
              })}
            </div>

            <hr className="border-gray-100 my-1" />

            {/* Navigasi Lainnya */}
            <div className="flex flex-col gap-1">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-3">Lainnya</p>
              {dropdownLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleScrollToSection(e, link.href)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                >
                  <link.icon className="w-5 h-5 text-gray-400" />
                  {link.name}
                </a>
              ))}
            </div>

            <hr className="border-gray-100 my-1" />

            {/* Auth Buttons */}
            <div className="flex flex-col gap-3 mt-2">
              <Link 
                href="/login" 
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3.5 text-center text-sm font-bold text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors"
              >
                Masuk
              </Link>
              <Link 
                href="/register" 
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3.5 text-center text-sm font-bold text-white bg-gray-900 hover:bg-gray-800 rounded-xl transition-colors shadow-md flex items-center justify-center gap-2"
              >
                Buat Akun Baru
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}