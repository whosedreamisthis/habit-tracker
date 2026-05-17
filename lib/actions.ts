"use server";

import { mockHabits as initialMockHabits } from "@/lib/mock-data";
import { revalidatePath } from "next/cache";
import { Completion, Habit } from "@/lib/types";
import { NewHabit } from "@/lib/schema";
import { nanoid } from "nanoid";
import { format } from "date-fns";

// --- FIX: Pin memory to globalThis so workers don't reset it on page switch ---
const globalForHabits = globalThis as unknown as {
  localHabits: Habit[] | undefined;
};

if (!globalForHabits.localHabits) {
  globalForHabits.localHabits = [...initialMockHabits];
}
// -----------------------------------------------------------------------------

// 1. Define the input parameters interface
interface GetHabitsFilters {
  status?: string;
  search?: string;
  category?: string;
}

export async function resetAllHabitsData() {
  console.log("Resetting application state back to default mock data...");

  // Re-clone to global storage
  globalForHabits.localHabits = [...initialMockHabits] as Habit[];

  // Clear the Next.js cache so the UI updates instantly everywhere
  revalidatePath("/", "layout");
}

export async function toggleHabitCompletion(
  habitId: string,
  currentCompletedState: boolean,
) {
  const targetCompletedState = !currentCompletedState;
  const todayStr = format(new Date(), "yyyy-MM-dd");

  console.log(
    `Updating habit ${habitId} to completed: ${targetCompletedState}`,
  );

  globalForHabits.localHabits = globalForHabits.localHabits!.map((habit) => {
    if (habit._id === habitId) {
      let updatedCompletions = [...(habit.completions || [])];

      if (targetCompletedState) {
        // Add completion if not already there
        if (!updatedCompletions.some((c) => c.date === todayStr)) {
          updatedCompletions.push({
            _id: nanoid(),
            date: todayStr,
          });
        }
      } else {
        // Remove completion for today
        updatedCompletions = updatedCompletions.filter(
          (c) => c.date !== todayStr,
        );
      }

      // Re-calculate streaks based on updated completions
      const nextStreak = targetCompletedState
        ? habit.activeStreak + 1
        : Math.max(0, habit.activeStreak - 1);

      return {
        ...habit,
        isCompletedToday: targetCompletedState,
        completions: updatedCompletions,
        activeStreak: nextStreak,
        // Sync bestStreak if the active streak surpasses it
        bestStreak:
          nextStreak > habit.bestStreak ? nextStreak : habit.bestStreak,
        updatedAt: new Date().toISOString(),
      };
    }
    return habit;
  });

  revalidatePath("/", "layout");
}

export async function archiveHabit(habitId: string) {
  console.log(`Archiving habit ${habitId}`);

  globalForHabits.localHabits = globalForHabits.localHabits!.map((habit) => {
    if (habit._id === habitId) {
      return {
        ...habit,
        status: "archived",
        updatedAt: new Date().toISOString(),
      };
    }
    return habit;
  });

  // Revalidate everything to ensure all pages are updated
  revalidatePath("/", "layout");
}

export async function editHabit(habitId: string, data: NewHabit) {
  console.log(`Editing habit ${data}`);

  globalForHabits.localHabits = globalForHabits.localHabits!.map((habit) => {
    if (habit._id === habitId) {
      return {
        ...habit,
        ...data,
        updatedAt: new Date().toISOString(),
      };
    }
    return habit;
  });

  // Revalidate everything to ensure all pages are updated
  revalidatePath("/", "layout");
}

export async function createHabit(data: NewHabit) {
  console.log(`Creating habit ${data}`);
  const newHabit = {
    ...data,
    _id: nanoid(),
    status: "active" as const,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    userId: "",
    targetDays: 7,
    order: 7,
    activeStreak: 0,
    bestStreak: 0,
    isCompletedToday: false,
    _streakProb: 0.82,
  };

  const currentHabits = globalForHabits.localHabits || [];
  globalForHabits.localHabits = [...currentHabits, newHabit];

  // Revalidate everything to ensure all pages are updated
  revalidatePath("/", "layout");
}

export async function deleteHabit(habitId: string) {
  console.log(`[SERVER] Deleting habit ${habitId}`);

  globalForHabits.localHabits = globalForHabits.localHabits!.filter(
    (habit) => habit._id !== habitId,
  );

  // Revalidate layout caches to drop the element everywhere instantly
  revalidatePath("/", "layout");
}

export async function restoreHabit(habitId: string) {
  console.log(`Restoring habit ${habitId}`);

  globalForHabits.localHabits = globalForHabits.localHabits!.map((habit) => {
    if (habit._id === habitId) {
      return {
        ...habit,
        status: "active",
        updatedAt: new Date().toISOString(),
      };
    }
    return habit;
  });

  // Revalidate everything to ensure all pages are updated
  revalidatePath("/", "layout");
}

export async function getAllHabits(filters?: GetHabitsFilters) {
  // Fallback to defaults if no filters object is passed
  const statusFilter = filters?.status;
  const searchFilter = filters?.search?.toLowerCase() || "";
  const categoryFilter = filters?.category;

  // 2. Filter the mock array down dynamically from global storage
  return globalForHabits.localHabits!.filter((habit) => {
    // Check Status Match (matches "active" or "archived")
    const matchesStatus = statusFilter ? habit.status === statusFilter : true;

    // Check Search Query Match (checks if title or description contains the string)
    const matchesSearch =
      habit.name.toLowerCase().includes(searchFilter) ||
      habit.description.toLowerCase().includes(searchFilter);

    const matchesCategory =
      !categoryFilter || categoryFilter === "All categories"
        ? true
        : habit.category === categoryFilter;

    return matchesStatus && matchesSearch && matchesCategory;
  });
}
