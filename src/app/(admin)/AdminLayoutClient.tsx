'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  LogOut,
  Bell,
  Tags,
  Menu,
  PanelLeftClose,
  Home 
} from 'lucide-react';



export default function AdminLayout({ 
  children,
  currentUser //   Prop baru untuk menerima data dari database/session
}: { 
  children: React.ReactNode;
  currentUser?: { name: string; isStaff: boolean; role?: string } | null;
}) {
  const pathname = usePathname();
  const router = useRouter(); 
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleLogout = () => {
    document.cookie = "admin_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.push('/admin-login');
  };

  // ==========================================
  // 1. LOGIKA PROFIL DINAMIS
  // ==========================================
  const getInitials = (name?: string) => {
    if (!name) return 'U'; 
    const words = name.trim().split(' ');
    if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase();
    return name.substring(0, 2).toUpperCase();
  };

  const userName = currentUser?.name || "Memuat...";
  const userRole = currentUser?.role 
    ? currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)
    : "Pengguna Umum";
    
  const userInitials = getInitials(currentUser?.name);
  // ==========================================
  // 2. LOGIKA TOMBOL HOME DINAMIS (YANG SEMPAT HILANG)
  // ==========================================
  const pathSegments = pathname.split('/').filter(Boolean);
  const isSubPage = pathSegments.length > 2; 
  const parentPath = isSubPage ? `/${pathSegments[0]}/${pathSegments[1]}` : '/admin';

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
            const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/admin');
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
            
            {/* Inisial Dinamis */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#0066FF] to-cyan-400 flex items-center justify-center text-white text-sm font-bold shadow-md shrink-0">
              {userInitials}
            </div>
            
            <div className={`flex-1 min-w-0 whitespace-nowrap transition-all duration-300 ${isSidebarExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0 hidden'}`}>
              {/* Nama dan Role Dinamis */}
              <p className="text-sm font-bold text-gray-900 truncate">{userName}</p>
              <p className="text-xs font-medium text-gray-500 truncate">{userRole}</p>
            </div>
            
          </div>
          {isSidebarExpanded && (
            <button 
              onClick={() => setIsLogoutModalOpen(true)}
              className="text-gray-400 hover:text-red-500 transition-colors shrink-0 p-2"
              title="Keluar"
            >
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

        {/*   AREA FLOAT KANAN ATAS */}
        <div className="absolute top-6 right-6 md:right-8 z-50 flex flex-col gap-3 items-center">
          
          {/* Lonceng Notifikasi */}
          <button className="relative p-2.5 bg-white/70 backdrop-blur-xl border border-white shadow-sm text-gray-500 hover:text-[#0066FF] hover:bg-white rounded-xl transition-all">
            <Bell size={20} />
            <span className="absolute top-2 right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
          </button>

          {/* Tombol Home Dinamis */}
          {isSubPage && (
            <Link 
              href={parentPath}
              className="p-2.5 bg-white/70 backdrop-blur-xl border border-white shadow-sm text-gray-500 hover:text-[#0066FF] hover:bg-blue-50 rounded-xl transition-all group animate-in slide-in-from-top-2 fade-in duration-300"
              title="Kembali ke halaman utama menu ini"
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
      {/*   3. DESAIN POP-UP KONFIRMASI LOGOUT */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-[90%] max-w-sm animate-in zoom-in-95 duration-300">
            
            <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-500 mb-4">
              <LogOut size={24} strokeWidth={2.5} />
            </div>
            
            <h3 className="text-lg font-bold text-gray-900">Keluar dari Dasbor?</h3>
            <p className="text-sm text-gray-500 mt-2">
              Sesi Anda akan diakhiri dan Anda harus masuk kembali untuk mengakses panel admin.
            </p>
            
            <div className="flex items-center gap-3 mt-6">
              <button 
                onClick={() => setIsLogoutModalOpen(false)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
              >
                Batal
              </button>
              <button 
                onClick={handleLogout}
                className="flex-1 px-4 py-2.5 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 shadow-sm shadow-red-500/20 transition-all"
              >
                Ya, Keluar
              </button>
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
}