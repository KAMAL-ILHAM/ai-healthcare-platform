import { PrismaClient } from '@prisma/client';
console.log("DEBUG: Mencoba koneksi ke:", process.env.DATABASE_URL); // TAMBAHKAN BARIS INI
const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Kita gunakan 'export const prisma' agar cocok dengan import { prisma }
export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}