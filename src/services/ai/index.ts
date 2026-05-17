import OpenAI from "openai";

let _client: OpenAI | null = null;

/**
 * Lazily initialize and return OpenAI client.
 * Avoids module-level side effects that can crash builds.
 * Client is reused across requests within the same serverless instance.
 */
export function getAIClient(): OpenAI {
  if (!_client) {
    _client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY || "",
    });
  }
  return _client;
}
