import { db } from "@/lib/db";
import { logger } from "@/lib/logger";

export async function saveJobDescription(parsedData: any, rawText: string) {
  logger.info("Saving Job Description to database");
  return await db.jobDescription.create({
    data: {
      title: parsedData.title,
      requiredSkills: parsedData.requiredSkills,
      preferredSkills: parsedData.preferredSkills,
      experienceRequired: parsedData.experienceRequired,
      rawText: rawText,
    },
  });
}

export async function getJobDescription(jobId: string) {
  return await db.jobDescription.findUnique({ where: { id: jobId } });
}

export async function saveCandidate(parsedCandidate: any, rawText: string, manualName: string) {
  logger.info("Saving Candidate Profile to database");
  return await db.candidateProfile.create({
    data: {
      name: manualName || parsedCandidate.name || "Unknown Candidate",
      email: parsedCandidate.email,
      phone: parsedCandidate.phone,
      skills: parsedCandidate.skills ?? [],
      experience: parsedCandidate.experience ?? [],
      education: parsedCandidate.education ?? [],
      parsedText: rawText,
    },
  });
}

export async function upsertMatchResult(jobId: string, candidateId: string, matchResult: any) {
  logger.info(`Upserting Match Result for Job ${jobId} and Candidate ${candidateId}`);
  return await db.matchResult.upsert({
    where: { jobId_candidateId: { jobId, candidateId } },
    create: {
      jobId,
      candidateId,
      score: matchResult.score,
      rationale: matchResult.rationale,
    },
    update: {
      score: matchResult.score,
      rationale: matchResult.rationale,
      status: null,
    },
  });
}

export async function getCandidate(candidateId: string) {
  return await db.candidateProfile.findUnique({ where: { id: candidateId } });
}

export async function createEmployeeFromCandidate(candidate: any, role: string) {
  return await db.employee.create({
    data: {
      name: candidate.name,
      role: role,
      status: "Active"
    }
  });
}

export async function updateMatchStatus(jobId: string, candidateId: string, status: string) {
  return await db.matchResult.update({
    where: { jobId_candidateId: { jobId, candidateId } },
    data: { status }
  });
}

export async function deactivateEmployeeRecord(employeeId: string) {
  return await db.employee.update({
    where: { id: employeeId },
    data: { status: "Deactive" }
  });
}

export async function getEmployee(employeeId: string) {
  return await db.employee.findUnique({ where: { id: employeeId } });
}
