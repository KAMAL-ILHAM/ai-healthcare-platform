import prisma from "@/lib/prisma";
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  let userName = "Pengguna";

  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (token) {
      const decoded = jwt.decode(token) as any;
      
      let identifier = null;
      if (typeof decoded === 'string') {
        identifier = decoded;
      } else if (decoded) {
        identifier = decoded.id || decoded.userId || decoded.email || decoded.sub;
      }

      if (identifier) {
        const user = await prisma.user.findFirst({
          where: {
            OR: [
              { id: identifier },
              { email: identifier }
            ]
          },
          select: { name: true }
        });
        
        if (user?.name) userName = user.name;
      }
    }
  } catch (error) {
    console.error("Gagal membaca token di Layout:", error);
  }

  return (
    <div className="flex h-screen bg-[#FAFAFA] overflow-hidden font-satoshi selection:bg-cyan-100 selection:text-cyan-900">
      
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-cyan-400/20 blur-[120px] rounded-full mix-blend-multiply" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full mix-blend-multiply" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 relative z-10 h-screen overflow-hidden">
        <Header userName={userName} />
        {/* 🌟 PERBAIKAN MOBILE: Padding px-4 untuk HP, pb-24 agar tidak tertutup Bottom Nav */}
        <div className="flex-1 overflow-y-auto px-4 md:px-8 pb-24 md:pb-8 no-scrollbar">
          <div className="max-w-7xl mx-auto space-y-4 md:space-y-6">
            {children}
          </div>
        </div>
      </div>
      
    </div>
  );
}