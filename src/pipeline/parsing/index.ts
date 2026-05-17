import { z } from "zod";
import { zodResponseFormat } from "openai/helpers/zod";
import { getAIClient } from "@/services/ai";
import { logger } from "@/lib/logger";

const JobDescriptionSchema = z.object({
  title: z.string().describe("The job title"),
  requiredSkills: z.array(z.string()).describe("List of mandatory skills"),
  preferredSkills: z.array(z.string()).describe("List of nice-to-have skills"),
  experienceRequired: z.string().describe("Required experience in years or a brief description"),
});

const CandidateProfileSchema = z.object({
  name: z.string().describe("Candidate's full name"),
  email: z.string().nullable().describe("Candidate's email address"),
  phone: z.string().nullable().describe("Candidate's phone number"),
  skills: z.array(z.string()).describe("List of all extracted skills"),
  experience: z.array(z.object({
    role: z.string(),
    company: z.string(),
    duration: z.string(),
  })).describe("List of past work experiences"),
  education: z.array(z.object({
    degree: z.string(),
    institution: z.string(),
    year: z.string().nullable(),
  })).describe("List of educational qualifications"),
});

export async function parseJobDescriptionStep(rawText: string) {
  if (!process.env.OPENAI_API_KEY) {
    logger.warn("No OPENAI_API_KEY provided for parseJobDescriptionStep.");
    throw new Error("Missing AI configuration");
  }

  const openai = getAIClient();
  const completion = await openai.chat.completions.parse({
    model: "gpt-4o-2024-08-06",
    messages: [
      { role: "system", content: "You are an expert technical recruiter. Extract structured job description data from the provided text." },
      { role: "user", content: rawText },
    ],
    response_format: zodResponseFormat(JobDescriptionSchema, "job_description"),
  });

  return completion.choices[0].message.parsed;
}

export async function parseResumeStep(rawText: string) {
  if (!process.env.OPENAI_API_KEY) {
    logger.warn("No OPENAI_API_KEY provided for parseResumeStep.");
    throw new Error("Missing AI configuration");
  }

  const openai = getAIClient();
  const completion = await openai.chat.completions.parse({
    model: "gpt-4o-2024-08-06",
    messages: [
      { role: "system", content: "You are an expert technical recruiter. Extract structured candidate data from the provided resume text." },
      { role: "user", content: rawText },
    ],
    response_format: zodResponseFormat(CandidateProfileSchema, "candidate_profile"),
  });

  return completion.choices[0].message.parsed;
}
