import { PrismaClient } from '@prisma/client';

// Cache global agar Next.js tidak membuka terlalu banyak koneksi saat Anda menekan Save
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient({
  log: ['error', 'warn'], // Opsional: hanya menampilkan log jika ada error
});

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export default prisma;