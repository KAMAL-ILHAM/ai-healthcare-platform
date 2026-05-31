'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';

export default function NavbarWrapper() {
  const pathname = usePathname();

  // Jika bukan di halaman utama (landing page), jangan tampilkan Navbar
  if (pathname !== '/') {
    return null;
  }

  // Jika di halaman utama, tampilkan Navbar
  return <Navbar />;
}