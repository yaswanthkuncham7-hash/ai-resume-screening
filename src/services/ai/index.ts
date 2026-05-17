import OpenAI from "openai";
import { env } from "@/lib/env";

// Ensure AI client is instantiated lazily or conditionally
// so it doesn't break if env vars are missing during build.
const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY || "dummy",
});

export const getAIClient = () => openai;
