"use server";

import { mockHabits as initialMockHabits } from "@/lib/mock-data"; // Inside your actions file (e.g., @/lib/actions.ts)
// import { NewHabit } from "./schema";
import { cache } from "react";
import { revalidatePath } from "next/cache";
import { Habit } from "@/lib/types";

let localHabits: Habit[] = [...initialMockHabits];

// 1. Define the input parameters interface
interface GetHabitsFilters {
  status?: string;
  search?: string;
  category?: string;
}

export async function resetAllHabitsData() {
  console.log("Resetting application state back to default mock data...");

  // Re-clone the original baseline mock data
  localHabits = [...initialMockHabits] as Habit[];

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

  localHabits = localHabits.map((habit) => {
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
  revalidatePath("/dashboard");
}

export const getAllHabits = cache(async (filters?: GetHabitsFilters) => {
  // Fallback to defaults if no filters object is passed
  const statusFilter = filters?.status;
  const searchFilter = filters?.search?.toLowerCase() || "";
  const categoryFilter = filters?.category;

  // 2. Filter the mock array down dynamically
  return localHabits.filter((habit) => {
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
});

// --- Mock Data Sample Setup for Reference ---
