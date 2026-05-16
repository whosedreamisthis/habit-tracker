"use server";

import { mockHabits as initialMockHabits } from "@/lib/mock-data";
import { revalidatePath } from "next/cache";
import { Habit } from "@/lib/types";

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
  console.log(
    `Updating habit ${habitId} to completed: ${!targetCompletedState}`,
  );

  globalForHabits.localHabits = globalForHabits.localHabits!.map((habit) => {
    if (habit._id === habitId) {
      const nextStreak = targetCompletedState
        ? habit.activeStreak + 1
        : Math.max(0, habit.activeStreak - 1);

      return {
        ...habit,
        isCompletedToday: targetCompletedState,
        activeStreak: nextStreak,
        // Sync bestStreak if the active streak surpasses it
        bestStreak:
          nextStreak > habit.bestStreak ? nextStreak : habit.bestStreak,
        updatedAt: new Date().toISOString(), // Keep timestamps accurate
      };
    }
    return habit;
  });
  // 2. Refresh the cached data on the dashboard so the UI updates
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
  // Add a small delay to simulate network/db and ensure Next.js sees it as a fresh request
  await new Promise((resolve) => setTimeout(resolve, 10));

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
