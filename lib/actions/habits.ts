"use server";

import connectDB from "@/lib/mongodb";
import { Habit } from "@/lib/models";
import { revalidatePath } from "next/cache";
import { NewHabit } from "@/lib/schema";
import { format } from "date-fns";
import { getUserId } from "./auth";
import { calculateStreaks } from "@/lib/utils/streaks";

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
