'use client';

import Link from 'next/link';
import {
    Activity,
    Twitter,
    Instagram,
    Linkedin,
    Mail,
    MapPin,
    Phone,
    ShieldAlert
  } from 'lucide-react';

export default function FooterSection() {
  return (
    <footer className="bg-white border-t border-gray-100 pt-20 pb-10 relative overflow-hidden z-10">
      
      {/* Subtle Top Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[150px] bg-primary/5 rounded-b-full blur-[80px] pointer-events-none" />
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">

          {/* COLUMN 1: BRAND & MEDICAL DISCLAIMER (col-span-4) */}
          <div className="lg:col-span-4 pr-0 lg:pr-8">
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-cyan-500 rounded-lg flex items-center justify-center shadow-sm">
                <Activity className="text-white w-4 h-4" />
              </div>
              <span className="text-xl font-bold tracking-tight text-gray-900 font-satoshi">EIOHealth</span>
            </div>
            <p className="text-gray-500 font-inter text-sm leading-relaxed mb-6">
              Ekosistem kesehatan digital berbasis AI yang menghubungkan triase pintar, edukasi medis, dan fasilitas farmasi dalam satu platform seamless.
            </p>

            {/* Medical Disclaimer Box */}
            <div className="bg-amber-50/80 border border-amber-100 rounded-xl p-4 flex items-start gap-3 mb-8 shadow-sm">
              <ShieldAlert className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <p className="text-[11px] text-amber-700 font-inter leading-relaxed">
                <strong className="font-bold block mb-0.5">Medical Disclaimer:</strong> 
                AI tidak menggantikan diagnosis dokter profesional. Selalu konsultasikan kondisi Anda dengan tenaga kesehatan atau apoteker berlisensi.
              </p>
            </div>

            {/* Social Media Icons */}
            <div className="flex items-center gap-4">
              {[Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all shadow-sm hover:shadow-md">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* COLUMNS 2, 3, 4: NAVIGATION LINKS (col-span-8) */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
            
            {/* Platform Nav */}
            <div>
              <h4 className="font-bold text-gray-900 font-satoshi mb-6">Platform</h4>
              <ul className="space-y-4">
                {["Konsultasi AI", "Cari Apotek", "Jurnal Edukasi", "Sistem Antrean", "Integrasi Apotek"].map((item, i) => (
                  <li key={i}>
                    <Link href="#" className="text-gray-500 hover:text-primary text-sm font-inter transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Perusahaan Nav */}
            <div>
              <h4 className="font-bold text-gray-900 font-satoshi mb-6">Perusahaan</h4>
              <ul className="space-y-4">
                {["Tentang Kami", "Karier", "Blog", "Pusat Bantuan", "Hubungan Mitra"].map((item, i) => (
                  <li key={i}>
                    <Link href="#" className="text-gray-500 hover:text-primary text-sm font-inter transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Kontak Nav */}
            <div>
              <h4 className="font-bold text-gray-900 font-satoshi mb-6">Kontak</h4>
              <ul className="space-y-4">
                <li>
                  <div className="flex items-start gap-3 text-sm text-gray-500 font-inter">
                    <MapPin className="w-4 h-4 shrink-0 text-gray-400 mt-0.5" />
                    <span>Samarinda, East Kalimantan<br/>Indonesia</span>
                  </div>
                </li>
                <li>
                  <a href="mailto:hello@eiohealth.com" className="flex items-center gap-3 text-sm text-gray-500 hover:text-primary font-inter transition-colors">
                    <Mail className="w-4 h-4 shrink-0 text-gray-400" />
                    hello@eiohealth.com
                  </a>
                </li>
                <li>
                  <a href="tel:+628112345678" className="flex items-center gap-3 text-sm text-gray-500 hover:text-primary font-inter transition-colors">
                    <Phone className="w-4 h-4 shrink-0 text-gray-400" />
                    +62 811 2345 678
                  </a>
                </li>
              </ul>
            </div>
          </div>

        </div>

        {/* BOTTOM BAR: Copyright & Legal */}
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400 font-inter">
            © 2026 EIOHealth by Apt. Kamal Ilham. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-xs text-gray-400 hover:text-gray-900 font-inter transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-xs text-gray-400 hover:text-gray-900 font-inter transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="text-xs text-gray-400 hover:text-gray-900 font-inter transition-colors">
              Medical Guidelines
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}