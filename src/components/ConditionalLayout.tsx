'use client';

import { usePathname } from 'next/navigation';

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Cek apakah user sedang berada di halaman login atau register
  const isAuthPage = 
  pathname.startsWith('/login') ||
  pathname.startsWith('/register') ||
  pathname.startsWith('/dashboard');

  // Jika di halaman auth, JANGAN render apa pun (return null)
  if (isAuthPage) {
    return null;
  }

  // Jika di halaman lain (seperti landing page / dashboard), render elemennya
  return <>{children}</>;
}