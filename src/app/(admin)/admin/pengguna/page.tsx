import prisma from '@/lib/prisma';
import PenggunaClient from './PenggunaClient';

export default async function ManajemenPenggunaPage() {
  //   Server cukup mengambil data dari database
  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' }
  });

  //   Oper datanya ke Komponen Client agar bisa interaktif (buka modal dll)
  return <PenggunaClient users={users} />;
}