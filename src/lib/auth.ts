import { cookies } from "next/headers";

const SESSION_COOKIE = "hirelens_session";

// Demo user for MVP — replace with real auth provider (Clerk, NextAuth) later
const DEMO_USER = {
  id: "recruiter_001",
  name: "Jane Doe",
  email: "jane@hirelens.ai",
  role: "RECRUITER" as const,
};

/**
 * Get the current user session from the cookie.
 * Returns null if no session exists.
 */
export async function getSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE);
  if (!session?.value) return null;

  try {
    return { user: JSON.parse(session.value) };
  } catch {
    return null;
  }
}

/**
 * Create a new session for the demo user.
 * Sets an httpOnly cookie with 7-day expiry.
 */
export async function createSession() {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, JSON.stringify(DEMO_USER), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
  return { user: DEMO_USER };
}

/**
 * Destroy the current session by deleting the cookie.
 */
export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}
