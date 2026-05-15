import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { countCompletionsForDayRange } from "./date-utils";
import { Habit } from "@/lib/types";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getColor = (count: number) => {
  if (count === 0) return "bg-slate-100";
  if (count === 1) return "bg-amber-200";
  if (count === 2) return "bg-amber-400";
  if (count === 3) return "bg-orange-500";
  return "bg-orange-700";
};

export const getComparisonData = (habits: Partial<Habit>[]) => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return days.map((day, idx) => {
    // 1. Calculate historical completions matching current day index
    // 2. Separate them out by matching range constraints
    return {
      day,
      lastWeek: countCompletionsForDayRange(habits, idx, "lastWeek"),
      thisWeek: countCompletionsForDayRange(habits, idx, "thisWeek"),
    };
  });
};
