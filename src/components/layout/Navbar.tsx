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
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4 md:p-6 pointer-events-none">
      <motion.nav
        initial={{ width: '80%', opacity: 0, y: -20 }}
        animate={{ width: '95%', opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
        className={`
            pointer-events-auto flex items-center justify-between px-8 
            transition-all duration-300 ease-in-out
            rounded-[2rem] border
            ${isScrolled ? 'h-16' : 'h-20'} 
            ${isScrolled 
              ? 'bg-white/70 backdrop-blur-2xl border-white/80 shadow-[0_8px_30px_rgba(0,0,0,0.06)]' 
              : 'bg-white/40 backdrop-blur-xl border-white/60 shadow-sm ring-1 ring-black/5'
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

        {/* Desktop Navigation */}
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
                className={`relative px-4 py-2 text-sm font-semibold transition-colors ${isActive || isHovered ? 'text-primary' : 'text-gray-600 hover:text-primary'}`}
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
                    className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary rounded-full"
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
            <button className={`flex items-center gap-1 px-4 py-2 text-sm font-semibold transition-colors ${isDropdownOpen ? 'text-primary' : 'text-gray-600 hover:text-primary'}`}>
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
                  className="absolute top-full right-0 mt-4 w-56 bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-100 p-2 flex flex-col gap-1 origin-top-right"
                >
                  {dropdownLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={(e) => handleScrollToSection(e, link.href)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-primary hover:bg-indigo-50/50 rounded-xl transition-colors"
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

        {/* Action Button */}
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

        <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </motion.nav>
    </header>
  );
}