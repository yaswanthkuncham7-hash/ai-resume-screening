const isProd = process.env.NODE_ENV === "production";

export const logger = {
  info: (message: string, meta?: unknown) => {
    console.log(`[INFO] ${message}`, meta ?? "");
  },
  warn: (message: string, meta?: unknown) => {
    console.warn(`[WARN] ${message}`, meta ?? "");
  },
  error: (message: string, error?: unknown) => {
    console.error(`[ERROR] ${message}`, error ?? "");
  },
  // Complete no-op in production — zero overhead
  debug: isProd
    ? (_message: string, _meta?: unknown) => {}
    : (message: string, meta?: unknown) => {
        console.log(`[DEBUG] ${message}`, meta ?? "");
      },
};
