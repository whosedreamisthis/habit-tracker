"use server";

import { auth } from "@clerk/nextjs/server";
import { cookies } from "next/headers";
import { DEMO_USER_ID } from "@/lib/constants";

export async function getUserId() {
  const { userId } = await auth();
  if (userId) return userId;

  const cookieStore = await cookies();
  if (cookieStore.get("demo_mode")?.value === "true") {
    return DEMO_USER_ID;
  }

  return null;
}
