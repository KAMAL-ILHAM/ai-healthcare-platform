// src/lib/prisma.ts
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

// Ambil URL dari environment
const connectionString = process.env.DATABASE_URL;

// Siapkan Adapter (Sesuai aturan ketat Prisma 7)
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

// TypeScript trick agar tidak terjadi "too many connections" saat Next.js hot-reload di mode Dev
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;