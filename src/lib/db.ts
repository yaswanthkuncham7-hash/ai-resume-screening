/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import { Pool } from "pg"

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// In-memory store for mock mode
const store: Record<string, any[]> = {
  jobDescription: [
    { id: "mock-job-1", title: "Senior Frontend Engineer", requiredSkills: ["React", "TypeScript"], experienceRequired: "5+ years", createdAt: new Date() },
    { id: "mock-job-2", title: "Product Manager", requiredSkills: ["Roadmap", "Strategy"], experienceRequired: "3+ years", createdAt: new Date() },
  ],
  candidateProfile: [
    { id: "c1", name: "Alice Smith", email: "alice@example.com", skills: ["React", "Node.js"], createdAt: new Date() },
    { id: "c2", name: "Bob Jones", email: "bob@example.com", skills: ["Python", "AWS"], createdAt: new Date() },
  ],
  employee: [
    { id: "e1", name: "Sarah Chen", role: "Senior Frontend Engineer", status: "Active", createdAt: new Date() },
    { id: "e2", name: "Michael Ross", role: "Product Manager", status: "Active", createdAt: new Date() },
    { id: "e3", name: "Jessica Day", role: "UX Designer", status: "Active", createdAt: new Date() },
  ],
  matchResult: [],
};

const mockDb = new Proxy({}, {
  get: (target, modelName: string) => {
    return {
      findMany: async (args?: any) => {
        let data = store[modelName] || [];
        
        // Handle includes (specifically for matchResult -> candidate)
        if (args?.include?.candidate && modelName === "matchResult") {
          data = data.map(item => ({
            ...item,
            candidate: store.candidateProfile.find(c => c.id === item.candidateId)
          }));
        }

        // Basic Filter Implementation for Mock Mode
        if (args?.where) {
          data = data.filter(item => {
            let matches = true;
            if (args.where.jobId) matches = matches && item.jobId === args.where.jobId;
            if (args.where.NOT) {
              const notConditions = args.where.NOT.OR || [];
              const isExcluded = notConditions.some((cond: any) => {
                return Object.entries(cond).every(([key, val]) => item[key] === val);
              });
              matches = matches && !isExcluded;
            }
            return matches;
          });
        }

        if (args?.orderBy?.createdAt === "desc") {
          data = [...data].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        }
        if (args?.take) {
          data = data.slice(0, args.take);
        }
        return data;
      },
      findUnique: async (args: any) => {
        const data = store[modelName] || [];
        return data.find(item => item.id === args.where.id) || null;
      },
      create: async (args: any) => {
        const newItem = {
          id: `mock-${Math.random().toString(36).substr(2, 9)}`,
          ...args.data,
          createdAt: new Date(),
        };
        if (!store[modelName]) store[modelName] = [];
        store[modelName].push(newItem);
        return newItem;
      },
      count: async () => (store[modelName] || []).length,
      update: async (args: any) => {
        const data = store[modelName] || [];
        const index = data.findIndex(item => {
          if (args.where.id) return item.id === args.where.id;
          if (args.where.jobId_candidateId) {
             return item.jobId === args.where.jobId_candidateId.jobId && 
                    item.candidateId === args.where.jobId_candidateId.candidateId;
          }
          return false;
        });
        if (index !== -1) {
          store[modelName][index] = { ...store[modelName][index], ...args.data };
          return store[modelName][index];
        }
        return null;
      },
      delete: async () => ({}),
    };
  }
}) as unknown as PrismaClient;

let prismaInstance: PrismaClient;

if (process.env.DATABASE_URL) {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const adapter = new PrismaPg(pool);
  prismaInstance = new PrismaClient({ adapter });
} else {
  prismaInstance = mockDb;
}

export const db = globalForPrisma.prisma ?? prismaInstance;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db
