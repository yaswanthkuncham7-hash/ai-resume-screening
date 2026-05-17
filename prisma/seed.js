const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const { Pool } = require("pg");
require("dotenv").config();

async function main() {
  console.log("Seeding database...");

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set in environment variables");
  }

  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  try {
    // 1. Clean existing records for a fresh demo
    console.log("Clearing existing data...");
    await prisma.matchResult.deleteMany({});
    await prisma.candidateProfile.deleteMany({});
    await prisma.jobDescription.deleteMany({});
    await prisma.employee.deleteMany({});

    // 2. Create Active Employees
    console.log("Creating active employees...");
    const employees = [
      { name: "Sarah Chen", role: "Senior Frontend Engineer", status: "Active" },
      { name: "Michael Ross", role: "Product Manager", status: "Active" },
      { name: "Jessica Day", role: "UI/UX Designer", status: "Active" },
      { name: "David Kim", role: "Senior Backend Engineer", status: "Active" },
      { name: "Elena Rostova", role: "QA Automation Engineer", status: "Active" },
    ];

    for (const emp of employees) {
      await prisma.employee.create({ data: emp });
    }

    // 3. Create Job Descriptions
    console.log("Creating job descriptions...");
    const jobs = [
      {
        title: "Senior Full-Stack Developer (Next.js & Node.js)",
        requiredSkills: ["React", "Next.js", "Node.js", "TypeScript", "PostgreSQL"],
        preferredSkills: ["GraphQL", "TailwindCSS", "Docker"],
        experienceRequired: "5+ years",
        rawText: "We are looking for a Senior Full-Stack Developer to lead our tech stack transition. The ideal candidate will have 5+ years of experience with React, Next.js, and Node.js. Experience with database design in PostgreSQL and schema migrations using Prisma is required."
      },
      {
        title: "AI/ML Engineer (LLMs & RAG)",
        requiredSkills: ["Python", "PyTorch", "OpenAI API", "Vector Databases", "LangChain"],
        preferredSkills: ["FastAPI", "Docker", "AWS"],
        experienceRequired: "3+ years",
        rawText: "Join our core AI team to build state of the art Retrieval-Augmented Generation (RAG) pipelines and fine-tune large language models. The ideal candidate has 3+ years of experience with Python, PyTorch, OpenAI's API, and vector stores such as Pinecone or pgvector."
      },
      {
        title: "UI/UX Designer & Developer",
        requiredSkills: ["Figma", "CSS", "Tailwind", "React", "Framer Motion"],
        preferredSkills: ["Design Systems", "Prototyping", "Next.js"],
        experienceRequired: "2+ years",
        rawText: "We are seeking a hybrid UI/UX Designer who can not only design stunning, premium dark-mode interfaces in Figma but also build and animate them using React, CSS, and Framer Motion. 2+ years of experience is required."
      },
      {
        title: "QA Automation Engineer",
        requiredSkills: ["Playwright", "TypeScript", "Jest", "CI/CD", "API Testing"],
        preferredSkills: ["Cypress", "GitHub Actions", "Docker"],
        experienceRequired: "3+ years",
        rawText: "Looking for a QA Automation Engineer to design end-to-end test suites using Playwright and TypeScript. You will be responsible for integrating these tests into our GitHub Actions CI/CD pipelines to ensure continuous quality of our SaaS platform."
      }
    ];

    for (const job of jobs) {
      await prisma.jobDescription.create({ data: job });
    }

    console.log("Seeding completed successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

main();
