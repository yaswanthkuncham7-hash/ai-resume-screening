import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient(): PrismaClient {
  const isProduction = process.env.NODE_ENV === "production";
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    max: isProduction ? 3 : 5, // Smaller pool for serverless
    idleTimeoutMillis: 20_000, // Close idle connections faster
    connectionTimeoutMillis: 10_000, // Fail fast if DB unreachable
    ssl: isProduction ? { rejectUnauthorized: false } : undefined, // Required for Supabase on Vercel
  });

  // Prevent pool from crashing the process on background errors
  pool.on("error", (err) => {
    console.error("Unexpected pg Pool error:", err);
  });

  const adapter = new PrismaPg(pool);
  return new PrismaClient({
    adapter,
    log: isProduction ? ["error"] : ["error", "warn"],
  });
}

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}
