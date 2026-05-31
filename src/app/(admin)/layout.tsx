'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  FileText, 
  Hospital, 
  Users, 
  LogOut,
  Bell,
  Tags,
  Menu,
  PanelLeftClose,
  Home // 🌟 Tambahkan ikon Home di sini
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Kategori', href: '/admin/kategori', icon: Tags },
    { name: 'Artikel', href: '/admin/artikel', icon: FileText },
    { name: 'Pengguna', href: '/admin/pengguna', icon: Users },
  ];

  return (
    <div className="flex h-screen bg-[#FBFBFD] font-sans text-gray-900 overflow-hidden">
      
      {/* SIDEBAR */}
      <aside 
        className={`bg-white/80 backdrop-blur-2xl border-r border-white/60 shadow-[4px_0_24px_rgba(0,0,0,0.02)] flex flex-col z-20 shrink-0 transition-all duration-300 ease-in-out ${
          isSidebarExpanded ? 'w-64' : 'w-[80px]'
        }`}
      >
        <div className={`h-20 flex items-center border-b border-white/50 transition-all duration-300 ${isSidebarExpanded ? 'px-6 justify-between' : 'justify-center'}`}>
          {isSidebarExpanded ? (
            <>
              <h1 className="text-xl font-bold tracking-tight whitespace-nowrap overflow-hidden">
                <span className="text-[#0066FF]">EIO</span>Health
              </h1>
              <button 
                onClick={() => setIsSidebarExpanded(false)}
                className="p-1.5 text-gray-400 hover:text-[#0066FF] hover:bg-blue-50/50 rounded-lg transition-colors shrink-0"
              >
                <PanelLeftClose size={20} />
              </button>
            </>
          ) : (
            <button 
              onClick={() => setIsSidebarExpanded(true)}
              className="w-11 h-11 rounded-xl bg-white/40 backdrop-blur-md border border-white/80 flex items-center justify-center text-gray-600 hover:text-[#0066FF] hover:bg-white/80 transition-all shadow-sm"
            >
              <Menu size={22} strokeWidth={2.5} />
            </button>
          )}
        </div>

        <div className="flex flex-col flex-1 py-6 px-3 gap-2 overflow-y-auto no-scrollbar">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link 
                key={item.name} 
                href={item.href} 
                className={`flex items-center rounded-xl transition-all duration-200 group ${
                  isSidebarExpanded ? 'px-4 py-3' : 'justify-center p-3 mx-auto w-12 h-12'
                } ${isActive ? 'bg-blue-50/70 text-[#0066FF] shadow-sm border border-blue-100/50' : 'text-gray-500 hover:bg-white/60 hover:text-gray-900 border border-transparent'}`}
                title={!isSidebarExpanded ? item.name : ""}
              >
                <Icon size={20} className={`shrink-0 ${isActive ? "text-[#0066FF]" : "text-gray-400 group-hover:text-gray-700"}`} />
                <span className={`font-semibold text-sm whitespace-nowrap overflow-hidden transition-all duration-300 ${isSidebarExpanded ? 'w-auto opacity-100 ml-3' : 'w-0 opacity-0 ml-0'}`}>
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>

        <div className={`p-4 border-t border-white/50 mt-auto flex items-center transition-all duration-300 ${isSidebarExpanded ? 'justify-between' : 'justify-center'}`}>
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#0066FF] to-cyan-400 flex items-center justify-center text-white text-sm font-bold shadow-md shrink-0">
              KI
            </div>
            <div className={`flex-1 min-w-0 whitespace-nowrap transition-all duration-300 ${isSidebarExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0 hidden'}`}>
              <p className="text-sm font-bold text-gray-900 truncate">Apoteker Kamal</p>
              <p className="text-xs font-medium text-gray-500 truncate">Superadmin</p>
            </div>
          </div>
          {isSidebarExpanded && (
            <button className="text-gray-400 hover:text-red-500 transition-colors shrink-0 p-2">
              <LogOut size={18} />
            </button>
          )}
        </div>
      </aside>

      {/* AREA KONTEN UTAMA */}
      <main className="flex-1 flex flex-col relative overflow-hidden bg-[#FAFAFA] transition-all duration-300">
        
        {/* Background Blob */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-cyan-400/20 blur-[100px] rounded-full mix-blend-multiply" />
          <div className="absolute bottom-[-10%] right-[-5%] w-[35%] h-[35%] bg-indigo-500/10 blur-[100px] rounded-full mix-blend-multiply" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />
        </div>

        {/* 🌟 AREA FLOAT KANAN ATAS (Lonceng & Tombol Home) */}
        <div className="absolute top-6 right-6 md:right-8 z-50 flex flex-col gap-3 items-center">
          
          {/* 1. Lonceng Notifikasi (Selalu Muncul) */}
          <button className="relative p-2.5 bg-white/70 backdrop-blur-xl border border-white shadow-sm text-gray-500 hover:text-[#0066FF] hover:bg-white rounded-xl transition-all">
            <Bell size={20} />
            <span className="absolute top-2 right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
          </button>

          {/* 2. Tombol Home (HANYA Muncul di halaman Tambah Artikel) */}
          {pathname === '/admin/artikel/tambah' && (
            <Link 
              href="/admin/artikel"
              className="p-2.5 bg-white/70 backdrop-blur-xl border border-white shadow-sm text-gray-500 hover:text-[#0066FF] hover:bg-blue-50 rounded-xl transition-all group animate-in slide-in-from-top-2 fade-in duration-300"
              title="Kembali ke Manajemen Artikel"
            >
              <Home size={20} className="group-hover:scale-110 transition-transform" />
            </Link>
          )}

        </div>

        {/* Render Halaman Dinamis */}
        <div className="flex-1 overflow-y-auto px-4 md:px-8 pt-8 pb-8 z-10 relative">
          {children}
        </div>
      </main>
    </div>
  );
}