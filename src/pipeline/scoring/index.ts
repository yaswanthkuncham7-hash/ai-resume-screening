import { z } from "zod";
import { zodResponseFormat } from "openai/helpers/zod";
import { getAIClient } from "@/services/ai";
import { env } from "@/lib/env";
import { logger } from "@/lib/logger";

const MatchResultSchema = z.object({
  score: z.number().describe("Match score from 0 to 100"),
  rationale: z.string().describe("Explanation for the score, max 2-3 sentences"),
});

export async function evaluateCandidateStep(candidate: any, jobDescription: any) {
  if (!env.OPENAI_API_KEY) {
    logger.warn("No OPENAI_API_KEY provided for evaluateCandidateStep.");
    throw new Error("Missing AI configuration");
  }

  const openai = getAIClient();
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
