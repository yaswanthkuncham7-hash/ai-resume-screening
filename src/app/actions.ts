"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { logger } from "@/lib/logger";
import { extractTextFromFile } from "@/pipeline/extraction";
import { parseJobDescriptionStep, parseResumeStep } from "@/pipeline/parsing";
import { evaluateCandidateStep } from "@/pipeline/scoring";
import { 
  saveJobDescription, 
  getJobDescription,
  saveCandidate, 
  upsertMatchResult,
  getCandidate,
  createEmployeeFromCandidate,
  updateMatchStatus,
  getEmployee,
  deactivateEmployeeRecord
} from "@/pipeline/storage";

// ─── Job Description Actions ──────────────────────────────────

export async function createJobDescription(formData: FormData) {
  const text = formData.get("text") as string;
  if (!text) {
    throw new Error("Job description text is required");
  }

  logger.info("Starting createJobDescription pipeline");
  
  try {
    const parsedData = await parseJobDescriptionStep(text);
    if (!parsedData) {
      throw new Error("Failed to parse Job Description");
    }

    const job = await saveJobDescription(parsedData, text);

    revalidatePath("/jobs");
    redirect(`/jobs/${job.id}`);
  } catch (err) {
    logger.error("Failed createJobDescription pipeline", err);
    throw err;
  }
}

// ─── Resume Upload ────────────────────────────────────────────

export async function uploadResume(jobId: string, formData: FormData) {
  const file = formData.get("file") as File;
  const manualName = formData.get("name") as string;

  logger.info(`Starting uploadResume pipeline for job: ${jobId}`, { fileName: file?.name });
  
  if (!file) {
    logger.error("Upload failed: No file provided");
    throw new Error("No file uploaded");
  }

  try {
    // 1. Extraction
    logger.info("Extracting text from file...");
    const text = await extractTextFromFile(file);

    // 2. Parsing
    logger.info("Parsing resume with AI...");
    const parsedCandidate = await parseResumeStep(text);
    if (!parsedCandidate) {
      throw new Error("Failed to parse resume");
    }

    // 3. Scoring
    logger.info("Fetching Job Description for evaluation...");
    const jobDesc = await getJobDescription(jobId);
    if (!jobDesc) {
      throw new Error("Job description not found");
    }

    logger.info("Evaluating candidate match...");
    const matchResult = await evaluateCandidateStep(parsedCandidate, jobDesc);
    if (!matchResult) {
      throw new Error("Failed to evaluate candidate match");
    }

    // 4. Storage
    logger.info("Saving Candidate and Match to database...");
    const candidate = await saveCandidate(parsedCandidate, text, manualName);
    await upsertMatchResult(jobId, candidate.id, matchResult);

    logger.info("UploadResume pipeline complete", { candidateId: candidate.id });
    revalidatePath(`/jobs/${jobId}`);
    revalidatePath("/candidates");
    revalidatePath("/dashboard");
    return { success: true, candidateId: candidate.id };

  } catch (err) {
    logger.error("UploadResume pipeline failed", err);
    revalidatePath(`/jobs/${jobId}`);
    return { success: false, error: String(err) };
  }
}

// ─── Employee Actions ─────────────────────────────────────────

export async function deactivateEmployee(employeeId: string) {
  try {
    const employee = await getEmployee(employeeId);
    if (!employee) throw new Error("Employee not found");

    await deactivateEmployeeRecord(employeeId);

    // Automatically create a new Job Description for this role
    await saveJobDescription({
      title: `Replacement: ${employee.role}`,
      requiredSkills: ["Skill 1", "Skill 2"], // Placeholder skills for the auto-created job
      experienceRequired: "3+ years"
    }, `Looking for a replacement for the ${employee.role} position.`);

    revalidatePath("/dashboard");
    revalidatePath("/employees");
    revalidatePath("/jobs");
    
    return { success: true };
  } catch (err) {
    logger.warn("Failed to deactivate employee", err);
    return { success: false };
  }
}

// ─── Candidate Actions ────────────────────────────────────────

export async function hireCandidate(candidateId: string, jobId: string) {
  try {
    const candidate = await getCandidate(candidateId);
    const job = await getJobDescription(jobId);
    
    if (!candidate || !job) throw new Error("Data not found");

    await createEmployeeFromCandidate(candidate, job.title);
    await updateMatchStatus(jobId, candidateId, "Hired");

    revalidatePath("/employees");
    revalidatePath("/dashboard");
    revalidatePath(`/jobs/${jobId}`);
    
    return { success: true };
  } catch (err) {
    logger.warn("Failed to hire candidate", err);
    return { success: false };
  }
}

export async function rejectCandidate(candidateId: string, jobId: string) {
  try {
    await updateMatchStatus(jobId, candidateId, "Rejected");
    revalidatePath(`/jobs/${jobId}`);
    return { success: true };
  } catch (err) {
    logger.warn("Failed to reject candidate", err);
    return { success: false };
  }
}
