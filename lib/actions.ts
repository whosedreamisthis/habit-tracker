"use server";

import connectDB from "@/lib/mongodb";
import { Habit } from "@/lib/models";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NewHabit } from "@/lib/schema";
import { format, parseISO, subDays } from "date-fns";
import { DEMO_USER_ID } from "@/lib/constants";

// --- UTILITY: Calculate Streaks ---
const calculateStreaks = (
  completions: { date: string | Date }[],
  targetDays: number = 7,
) => {
  const completedDates = completions
    .map((c) =>
      typeof c.date === "string" ? c.date : format(c.date, "yyyy-MM-dd"),
    )
    .sort();

  if (completedDates.length === 0) return { activeStreak: 0, bestStreak: 0 };

  if (targetDays === 7) {
    let currentStreak = 0;
    let bestStreak = 0;
    let activeStreak = 0;
    const maxGap = 1;

    for (let i = 0; i < completedDates.length; i++) {
      if (i === 0) {
        currentStreak = 1;
      } else {
        const prevDate = parseISO(completedDates[i - 1]);
        const currDate = parseISO(completedDates[i]);
        const diffTime = Math.abs(currDate.getTime() - prevDate.getTime());
        const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays <= maxGap) {
          currentStreak++;
        } else {
          if (currentStreak > bestStreak) bestStreak = currentStreak;
          currentStreak = 1;
        }
      }
    }
    if (currentStreak > bestStreak) bestStreak = currentStreak;

    const lastCompletion = parseISO(completedDates[completedDates.length - 1]);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - lastCompletion.getTime());
    const diffDaysFromToday = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDaysFromToday <= maxGap) {
      activeStreak = currentStreak;
    }

    return { activeStreak, bestStreak };
  } else {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const diffToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    const currentWeekMonday = new Date(today);
    currentWeekMonday.setDate(today.getDate() - diffToMonday);
    currentWeekMonday.setHours(0, 0, 0, 0);

    const completionsByWeek: Record<string, number> = {};
    completedDates.forEach((dateStr) => {
      const date = parseISO(dateStr);
      const dOW = date.getDay();
      const dTM = dOW === 0 ? 6 : dOW - 1;
      const monday = new Date(date);
      monday.setDate(date.getDate() - dTM);
      monday.setHours(0, 0, 0, 0);
      const weekKey = format(monday, "yyyy-MM-dd");
      completionsByWeek[weekKey] = (completionsByWeek[weekKey] || 0) + 1;
    });

    const sortedWeeks = Object.keys(completionsByWeek).sort();
    if (sortedWeeks.length === 0) return { activeStreak: 0, bestStreak: 0 };

    let currentWeeklyStreak = 0;
    let bestWeeklyStreak = 0;
    let activeWeeklyStreak = 0;

    const firstWeek = parseISO(sortedWeeks[0]);
    const weeks: string[] = [];
    const iterWeek = new Date(firstWeek);
    while (iterWeek <= currentWeekMonday) {
      weeks.push(format(iterWeek, "yyyy-MM-dd"));
      iterWeek.setDate(iterWeek.getDate() + 7);
    }

    for (const weekKey of weeks) {
      const count = completionsByWeek[weekKey] || 0;
      if (count >= targetDays) {
        currentWeeklyStreak++;
      } else {
        if (weekKey !== format(currentWeekMonday, "yyyy-MM-dd")) {
          if (currentWeeklyStreak > bestWeeklyStreak)
            bestWeeklyStreak = currentWeeklyStreak;
          currentWeeklyStreak = 0;
        }
      }
    }
    if (currentWeeklyStreak > bestWeeklyStreak)
      bestWeeklyStreak = currentWeeklyStreak;

    const currentWeekKey = format(currentWeekMonday, "yyyy-MM-dd");
    const lastWeekMonday = new Date(currentWeekMonday);
    lastWeekMonday.setDate(lastWeekMonday.getDate() - 7);
    const lastWeekKey = format(lastWeekMonday, "yyyy-MM-dd");

    if ((completionsByWeek[currentWeekKey] || 0) >= targetDays) {
      activeWeeklyStreak = currentWeeklyStreak;
    } else {
      if ((completionsByWeek[lastWeekKey] || 0) >= targetDays) {
        activeWeeklyStreak = currentWeeklyStreak;
      } else {
        activeWeeklyStreak = 0;
      }
    }

    return { activeStreak: activeWeeklyStreak, bestStreak: bestWeeklyStreak };
  }
};

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

async function getUserId() {
  const { userId } = await auth();
  if (userId) return userId;

  const cookieStore = await cookies();
  if (cookieStore.get("demo_mode")?.value === "true") {
    return DEMO_USER_ID;
  }

  return null;
}

// --- DATABASE ACTIONS ---

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

export async function toggleHabitCompletion(
  habitId: string,
  currentCompletedState: boolean,
) {
  const userId = await getUserId();
  if (!userId) throw new Error("Unauthorized");

  await connectDB();
  const habit = await Habit.findOne({ _id: habitId, userId });
  if (!habit) throw new Error("Habit not found");

  const todayStr = format(new Date(), "yyyy-MM-dd");
  const targetCompletedState = !currentCompletedState;

  let updatedCompletions = habit.completions.map((c: any) => ({
    date: typeof c.date === "string" ? c.date : format(c.date, "yyyy-MM-dd"),
  }));

  if (targetCompletedState) {
    if (!updatedCompletions.some((c: any) => c.date === todayStr)) {
      updatedCompletions.push({ date: todayStr });
    }
  } else {
    updatedCompletions = updatedCompletions.filter(
      (c: any) => c.date !== todayStr,
    );
  }

  const { activeStreak, bestStreak } = calculateStreaks(
    updatedCompletions,
    habit.targetDays,
  );

  const isCompletedToday = updatedCompletions.some(
    (c: any) => c.date === todayStr,
  );

  await Habit.updateOne(
    { _id: habitId, userId },
    {
      completions: updatedCompletions,
      activeStreak,
      bestStreak: Math.max(bestStreak, habit.bestStreak),
      isCompletedToday: isCompletedToday,
    },
  );

  revalidatePath("/", "layout");
}

export async function archiveHabit(habitId: string) {
  const userId = await getUserId();
  if (!userId) throw new Error("Unauthorized");

  await connectDB();
  await Habit.updateOne({ _id: habitId, userId }, { status: "archived" });
  revalidatePath("/", "layout");
}

export async function editHabit(habitId: string, data: NewHabit) {
  const userId = await getUserId();
  if (!userId) throw new Error("Unauthorized");

  await connectDB();
  const habit = await Habit.findOne({ _id: habitId, userId });
  if (!habit) throw new Error("Habit not found");

  const { activeStreak, bestStreak } = calculateStreaks(
    habit.completions,
    data.targetDays,
  );

  const todayStr = format(new Date(), "yyyy-MM-dd");
  const isCompletedToday = habit.completions.some((c: any) => {
    const cDate =
      typeof c.date === "string" ? c.date : format(c.date, "yyyy-MM-dd");
    return cDate === todayStr;
  });

  await Habit.updateOne(
    { _id: habitId, userId },
    {
      ...data,
      activeStreak,
      bestStreak: Math.max(bestStreak, habit.bestStreak),
      isCompletedToday,
    },
  );

  revalidatePath("/", "layout");
}

export async function createHabit(data: NewHabit) {
  const userId = await getUserId();
  if (!userId) throw new Error("Unauthorized");

  await connectDB();
  await Habit.create({
    ...data,
    userId,
    status: "active",
    activeStreak: 0,
    bestStreak: 0,
    isCompletedToday: false,
    order: 0,
    completions: [],
  });

  revalidatePath("/", "layout");
}

export async function deleteHabit(habitId: string) {
  const userId = await getUserId();
  if (!userId) throw new Error("Unauthorized");

  await connectDB();
  await Habit.deleteOne({ _id: habitId, userId });
  revalidatePath("/", "layout");
}

export async function restoreHabit(habitId: string) {
  const userId = await getUserId();
  if (!userId) throw new Error("Unauthorized");

  await connectDB();
  await Habit.updateOne({ _id: habitId, userId }, { status: "active" });
  revalidatePath("/", "layout");
}

export async function getAllHabits(filters?: {
  status?: string;
  search?: string;
  category?: string;
}) {
  const userId = await getUserId();
  if (!userId) return [];

  await connectDB();

  const query: any = { userId };
  if (filters?.status) query.status = filters.status;
  if (filters?.category && filters.category !== "All categories")
    query.category = filters.category;
  if (filters?.search) {
    query.$or = [
      { name: { $regex: filters.search, $options: "i" } },
      { description: { $regex: filters.search, $options: "i" } },
    ];
  }

  const habits = await Habit.find(query).sort({ order: 1, createdAt: -1 });
  const todayStr = format(new Date(), "yyyy-MM-dd");

  const habitsWithSync = habits.map((habit) => {
    const habitObj = habit.toObject();
    const isCompletedToday = habitObj.completions.some((c: any) => {
      const cDate =
        typeof c.date === "string" ? c.date : format(c.date, "yyyy-MM-dd");
      return cDate === todayStr;
    });

    return {
      ...habitObj,
      isCompletedToday,
    };
  });

  return JSON.parse(JSON.stringify(habitsWithSync));
}
