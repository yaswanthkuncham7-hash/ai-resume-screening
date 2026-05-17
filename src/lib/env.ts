import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  OPENAI_API_KEY: z.string().optional(),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
});

type Env = z.infer<typeof envSchema>;

let _cachedEnv: Env | null = null;

/** Lazily validate and return environment variables. Safe during build time. */
export function getEnv(): Env {
  if (_cachedEnv) return _cachedEnv;

  const result = envSchema.safeParse(process.env);
  if (!result.success) {
    console.error("❌ Invalid environment variables:", result.error.format());
    throw new Error("Invalid environment variables");
  }
  _cachedEnv = result.data;
  return _cachedEnv;
}

/**
 * Backward-compatible `env` object.
 * Uses a Proxy to defer validation to first access (runtime),
 * preventing build-time crashes when env vars aren't available.
 */
export const env = new Proxy({} as Env, {
  get(_, prop: string) {
    return getEnv()[prop as keyof Env];
  },
});
