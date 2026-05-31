import "dotenv/config";

const config = {
  migrations: {
    seed: 'npx tsx ./prisma/seed.ts',
  },
  datasource: {
    url: process.env.DATABASE_URL,
  }
};

export default config;