const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  // List all jobs
  const jobs = await prisma.jobDescription.findMany({ select: { id: true, title: true } });
  console.log("All jobs:", JSON.stringify(jobs, null, 2));

  // List all match results with candidates
  const matches = await prisma.matchResult.findMany({
    include: { candidate: { select: { id: true, name: true, email: true } } },
    orderBy: { createdAt: "desc" },
    take: 10,
  });
  console.log("Recent matches:", JSON.stringify(matches, null, 2));
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
