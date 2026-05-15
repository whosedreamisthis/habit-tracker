"use server";

import { mockHabits } from "@/lib/mock-data";
// Inside your actions file (e.g., @/lib/actions.ts)
import { NewHabit } from "./schema";
import { cache } from "react";

// Extend your data type to include structural fields like id and status
export interface Habit extends NewHabit {
  id: string;
  status: "active" | "archived";
}

// 1. Define the input parameters interface
interface GetHabitsFilters {
  status?: string;
  search?: string;
  category?: string;
}

export const getAllHabits = cache(async (filters?: GetHabitsFilters) => {
  // Fallback to defaults if no filters object is passed
  const statusFilter = filters?.status;
  const searchFilter = filters?.search?.toLowerCase() || "";
  const categoryFilter = filters?.category;


  // 2. Filter the mock array down dynamically
  return mockHabits.filter((habit) => {
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
