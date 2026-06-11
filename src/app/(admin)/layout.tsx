import AdminLayoutClient from './AdminLayoutClient';
import { cookies } from 'next/headers';
import prisma from '@/lib/prisma';
import jwt from 'jsonwebtoken';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  
  //   PERBAIKAN: Ubah 'token' menjadi 'admin_session' sesuai log terminal!
  const token = cookieStore.get('admin_session')?.value; 
  
  let currentUser = null;

  if (token) {
    try {
      const secret = process.env.JWT_SECRET;
      
      if (!secret) {
        throw new Error("JWT_SECRET belum diatur di file .env!");
      }
      
      const decoded = jwt.verify(token, secret) as { id?: string, userId?: string };
      // Mengambil ID (berdasarkan payload JWT kamu, namanya adalah 'id')
      const userId = decoded.id || decoded.userId;

      if (userId) {
        const user = await prisma.user.findUnique({
          where: { id: userId }, 
          select: { name: true, isStaff: true, role: true }
        });

        if (user) {
          currentUser = {
            name: user.name || "Pengguna Tanpa Nama",
            isStaff: user.isStaff,
            role: user.role //   Lempar data role ini ke Client
          };
        }
      }
    } catch (error) {
      console.error("Gagal memverifikasi token:", error);
    }
  }

  return (
    <AdminLayoutClient currentUser={currentUser}>
      {children}
    </AdminLayoutClient>
  );
}