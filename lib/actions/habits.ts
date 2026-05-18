"use server";

import connectDB from "@/lib/mongodb";
import { Habit } from "@/lib/models";
import { Completion } from "@/lib/types";
import { revalidatePath, updateTag, unstable_cache } from "next/cache";
import { cache } from "react";
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

  let updatedCompletions = habit.completions.map((c: Completion) => ({
    date: typeof c.date === "string" ? c.date : format(c.date, "yyyy-MM-dd"),
  }));

  if (targetCompletedState) {
    if (!updatedCompletions.some((c: Completion) => c.date === todayStr)) {
      updatedCompletions.push({ date: todayStr } as Completion);
    }
  } else {
    updatedCompletions = updatedCompletions.filter(
      (c: Completion) => c.date !== todayStr,
    );
  }

  const { activeStreak, bestStreak } = calculateStreaks(
    updatedCompletions,
    habit.targetDays,
  );

  const isCompletedToday = updatedCompletions.some(
    (c: Completion) => c.date === todayStr,
  );

  const updatedHabit = await Habit.findOneAndUpdate(
    { _id: habitId, userId },
    {
      completions: updatedCompletions,
      activeStreak,
      bestStreak: Math.max(bestStreak, habit.bestStreak),
      isCompletedToday: isCompletedToday,
    },
    { new: true },
  );

  updateTag("habits");
  revalidatePath("/", "layout");
  return JSON.parse(JSON.stringify(updatedHabit));
}

export async function archiveHabit(habitId: string) {
  const userId = await getUserId();
  if (!userId) throw new Error("Unauthorized");

  await connectDB();
  await Habit.updateOne({ _id: habitId, userId }, { status: "archived" });
  updateTag("habits");
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
  const isCompletedToday = habit.completions.some((c: Completion) => {
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

  updateTag("habits");
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

  updateTag("habits");
  revalidatePath("/", "layout");
}

export async function deleteHabit(habitId: string) {
  const userId = await getUserId();
  if (!userId) throw new Error("Unauthorized");

  await connectDB();
  await Habit.deleteOne({ _id: habitId, userId });
  updateTag("habits");
  revalidatePath("/", "layout");
}

export async function restoreHabit(habitId: string) {
  const userId = await getUserId();
  if (!userId) throw new Error("Unauthorized");

  await connectDB();
  await Habit.updateOne({ _id: habitId, userId }, { status: "active" });
  updateTag("habits");
  revalidatePath("/", "layout");
}

const getCachedHabits = unstable_cache(
  async (userId: string) => {
    await connectDB();
    const habits = await Habit.find({ userId }).sort({
      order: 1,
      createdAt: -1,
    });
    return JSON.parse(JSON.stringify(habits));
  },
  ["habits-list"],
  { tags: ["habits"] },
);

export const getAllHabits = cache(
  async (filters?: { status?: string; search?: string; category?: string }) => {
    const userId = await getUserId();
    if (!userId) return [];

    const allHabits = await getCachedHabits(userId);

    let filteredHabits = allHabits;

    if (filters?.status) {
      filteredHabits = filteredHabits.filter(
        (h: any) => h.status === filters.status,
      );
    }

    if (filters?.category && filters.category !== "All categories") {
      filteredHabits = filteredHabits.filter(
        (h: any) => h.category === filters.category,
      );
    }

    if (filters?.search) {
      const search = filters.search.toLowerCase();
      filteredHabits = filteredHabits.filter(
        (h: any) =>
          h.name.toLowerCase().includes(search) ||
          (h.description && h.description.toLowerCase().includes(search)),
      );
    }

    const todayStr = format(new Date(), "yyyy-MM-dd");

    const habitsWithSync = filteredHabits.map((habit: any) => {
      const isCompletedToday = habit.completions.some((c: Completion) => {
        const cDate =
          typeof c.date === "string" ? c.date : format(c.date, "yyyy-MM-dd");
        return cDate === todayStr;
      });

      return {
        ...habit,
        isCompletedToday,
      };
    });

    return habitsWithSync;
  },
);
