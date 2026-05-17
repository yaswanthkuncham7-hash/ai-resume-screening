/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
import OpenAI from "openai";
import { z } from "zod";
import { zodResponseFormat } from "openai/helpers/zod";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "dummy",
});

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

const MatchResultSchema = z.object({
  score: z.number().describe("Match score from 0 to 100"),
  rationale: z.string().describe("Explanation for the score, max 2-3 sentences"),
});

export async function parseJobDescription(rawText: string) {
  if (!process.env.OPENAI_API_KEY) {
    console.warn("No OPENAI_API_KEY, returning mock JD");
    return {
      title: "Software Engineer",
      requiredSkills: ["React", "Node.js", "TypeScript"],
      preferredSkills: ["Next.js", "PostgreSQL"],
      experienceRequired: "3+ years",
    };
  }

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

export async function parseResume(rawText: string) {
  if (!process.env.OPENAI_API_KEY) {
    console.warn("No OPENAI_API_KEY, returning mock Resume");
    return {
      name: "John Doe",
      email: "john@example.com",
      phone: "123-456-7890",
      skills: ["React", "JavaScript", "HTML", "CSS"],
      experience: [{ role: "Frontend Dev", company: "Tech Inc", duration: "2020-2023" }],
      education: [{ degree: "BSc Computer Science", institution: "University", year: "2020" }],
    };
  }

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

export async function evaluateCandidate(candidate: any, jobDescription: any) {
  if (!process.env.OPENAI_API_KEY) {
    return {
      score: Math.floor(Math.random() * 40) + 60, // random 60-99
      rationale: "Mock rationale: The candidate has some matching skills but lacks deep backend experience.",
    };
  }

  const completion = await openai.chat.completions.parse({
    model: "gpt-4o-2024-08-06",
    messages: [
      { role: "system", content: "You are an expert technical recruiter evaluating a candidate against a job description. Provide a score from 0 to 100 based on their fit, and a brief rationale explaining why." },
      { role: "user", content: `Job Description:\n${JSON.stringify(jobDescription, null, 2)}\n\nCandidate Profile:\n${JSON.stringify(candidate, null, 2)}` },
    ],
    response_format: zodResponseFormat(MatchResultSchema, "match_result"),
  });

  return completion.choices[0].message.parsed;
}
