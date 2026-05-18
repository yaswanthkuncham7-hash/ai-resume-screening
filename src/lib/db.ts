import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import dns from "node:dns";

// ─── CRITICAL FIX: Force IPv4 DNS resolution ────────────────────
// Vercel serverless functions do NOT support IPv6 outbound connections.
// Supabase direct connections resolve to IPv6, causing ENETUNREACH errors.
// This forces Node.js to prefer IPv4 addresses when DNS resolves both.
dns.setDefaultResultOrder("ipv4first");

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient(): PrismaClient {
  const isProduction = process.env.NODE_ENV === "production";
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL environment variable is not set");
  }

  const pool = new Pool({
    connectionString,
    max: isProduction ? 3 : 5,           // Smaller pool for serverless
    idleTimeoutMillis: 20_000,            // Close idle connections faster
    connectionTimeoutMillis: 10_000,       // Fail fast if DB unreachable
    ssl: isProduction ? { rejectUnauthorized: false } : undefined,
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
