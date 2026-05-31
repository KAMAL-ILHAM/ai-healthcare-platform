import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Resep penawar Turbopack: Biarkan library ini berjalan murni di sistem Node.js
  serverExternalPackages: ['@prisma/client', '@prisma/adapter-pg', 'pg', 'bcryptjs'],
};

export default nextConfig;