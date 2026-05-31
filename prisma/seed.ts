import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";
import "dotenv/config";

// Setup Adapter Database untuk Prisma 7
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const rootEmail = process.env.ROOT_ADMIN_EMAIL;
  const rootPassword = process.env.ROOT_ADMIN_PASSWORD;

  if (!rootEmail || !rootPassword) {
    throw new Error("❌ SEEDING GAGAL: ROOT_ADMIN_EMAIL dan ROOT_ADMIN_PASSWORD belum diatur di file .env");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(rootPassword, salt);

  console.log("Menyiapkan Otoritas Super Admin EIOHealth...");

  const rootAdmin = await prisma.user.upsert({
    where: { email: rootEmail },
    update: {}, 
    create: {
      email: rootEmail,
      name: "Apoteker Kamal", 
      passwordHash: hashedPassword,
      role: "superadmin", 
      isStaff: true,      
    },
  });

  console.log(`✅ Otoritas berhasil diamankan untuk: ${rootAdmin.email}`);
  console.log("🔒 Pintu masuk admin publik telah ditutup.");
}

main()
  .catch((error) => {
    console.error("❌ Terjadi kesalahan sistem saat proses seed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end(); // Tutup koneksi pool
  });