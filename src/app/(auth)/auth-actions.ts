"use server";

import { redirect } from "next/navigation";
import { createSession, destroySession } from "@/lib/auth";

/**
 * Lightweight auth actions — isolated from heavy AI/PDF pipeline imports.
 * This ensures login/logout serverless functions have minimal cold start.
 */

export async function loginAction() {
  await createSession();
  redirect("/dashboard");
}

export async function logoutAction() {
  await destroySession();
  redirect("/login");
}
