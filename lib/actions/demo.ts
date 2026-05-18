"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import connectDB from "@/lib/mongodb";
import { Habit } from "@/lib/models";
import { format, subDays } from "date-fns";
import { DEMO_USER_ID } from "@/lib/constants";
import { getUserId } from "./auth";
import { calculateStreaks } from "@/lib/utils/streaks";

export async function loginAsDemo() {
  const cookieStore = await cookies();
  cookieStore.set("demo_mode", "true", { path: "/", maxAge: 60 * 60 * 24 }); // 24 hours
  redirect("/dashboard");
}

export async function logoutDemo() {
  const cookieStore = await cookies();
  cookieStore.delete("demo_mode");
  redirect("/");
}

export async function resetAllHabitsData() {
  const userId = await getUserId();
  if (!userId) throw new Error("Unauthorized");

  // Safety check: Only allow re-seeding for the demo user
  if (userId !== DEMO_USER_ID) {
    throw new Error("Re-seeding is only allowed for the demo user.");
  }

  console.log(`Resetting data for user ${userId}...`);
  await connectDB();

  // Clear existing habits for this user
  await Habit.deleteMany({ userId });

  // Re-seed for this user
  const baseHabitsBlueprints = [
    {
      name: "Drink 2L of water",
      description: "Stay hydrated throughout the day.",
      category: "health",
      color: "#0ea5e9",
      icon: "💧",
      order: 0,
      status: "active",
      targetDays: 7,
      frequency: "daily",
      _streakProb: 0.95,
    },
    {
      name: "Morning run",
      description: "30-minute run before breakfast.",
      category: "fitness",
      targetDays: 7,
      color: "#ef4444",
      icon: "🏃",
      order: 1,
      status: "active",
      frequency: "daily",
      _streakProb: 0.7,
    },
    {
      name: "Read 20 minutes",
      description: "Fiction or non-fiction, no phone.",
      category: "learning",
      color: "#6366f1",
      icon: "📚",
      order: 2,
      status: "active",
      targetDays: 7,
      frequency: "daily",
      _streakProb: 0.82,
    },
    {
      name: "Journal",
      description: "Write 3 things I'm grateful for.",
      category: "mindfulness",
      targetDays: 7,
      color: "#ec4899",
      icon: "✍️",
      order: 4,
      status: "active",
      frequency: "daily",
      _streakProb: 0.75,
    },
    {
      name: "Strength training",
      description: "Push/pull/legs split.",
      category: "fitness",
      frequency: "weekly",
      targetDays: 3,
      color: "#f59e0b",
      icon: "💪",
      order: 5,
      status: "active",
      _streakProb: 0.55,
    },
  ];

  const today = new Date();
  const todayKey = format(today, "yyyy-MM-dd");

  for (const h of baseHabitsBlueprints) {
    const completions = [];
    for (let i = 0; i < 90; i++) {
      const d = subDays(today, i);
      const key = format(d, "yyyy-MM-dd");
      let p = h._streakProb;
      if (i < 14) p = Math.max(p, 0.85);
      const seed = Math.sin(i * 9301 + h.name.length * 49297) * 233280;
      const rnd = seed - Math.floor(seed);
      if (rnd < p) completions.push({ date: key });
    }

    const { activeStreak, bestStreak } = calculateStreaks(
      completions,
      h.targetDays,
    );
    const isCompletedToday = completions.some((c) => c.date === todayKey);

    await Habit.create({
      ...h,
      userId,
      completions,
      activeStreak,
      bestStreak,
      isCompletedToday,
    });
  }

  revalidatePath("/", "layout");
}
