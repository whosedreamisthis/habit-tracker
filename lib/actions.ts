"use server";

import { mockHabits as initialMockHabits } from "@/lib/mock-data";
import { revalidatePath } from "next/cache";
import { Habit } from "@/lib/types";
import { NewHabit } from "@/lib/schema";
import { nanoid } from "nanoid";
import { format, parseISO } from "date-fns";

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
      const today = new Date();

      // Sort completions to find the most recent ones
      const sortedCompletions = [...updatedCompletions].sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
      );

      // --- RE-CALCULATE STREAK ---
      const targetDays = habit.targetDays || 7;
      let nextStreak = 0;

      if (targetDays === 7) {
        // Daily Streak Logic
        let currentStreak = 0;
        const maxGap = 1;

        for (let i = 0; i < sortedCompletions.length; i++) {
          if (i === 0) {
            currentStreak = 1;
          } else {
            const prevDate = parseISO(sortedCompletions[i - 1].date);
            const currDate = parseISO(sortedCompletions[i].date);
            const diffTime = Math.abs(currDate.getTime() - prevDate.getTime());
            const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays <= maxGap) {
              currentStreak++;
            } else {
              currentStreak = 1;
            }
          }
        }

        if (sortedCompletions.length > 0) {
          const lastCompletionDate =
            sortedCompletions[sortedCompletions.length - 1].date;
          const lastDate = parseISO(lastCompletionDate);
          const diffTime = Math.abs(today.getTime() - lastDate.getTime());
          const diffDaysFromToday = Math.floor(
            diffTime / (1000 * 60 * 60 * 24),
          );

          if (diffDaysFromToday <= maxGap) {
            nextStreak = currentStreak;
          }
        }
      } else {
        // Weekly Streak Logic
        const dayOfWeek = today.getDay();
        const diffToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
        const currentWeekMonday = new Date(today);
        currentWeekMonday.setDate(today.getDate() - diffToMonday);
        currentWeekMonday.setHours(0, 0, 0, 0);

        const completionsByWeek: Record<string, number> = {};
        sortedCompletions.forEach((c) => {
          const date = parseISO(c.date as string);
          const dOW = date.getDay();
          const dTM = dOW === 0 ? 6 : dOW - 1;
          const monday = new Date(date);
          monday.setDate(date.getDate() - dTM);
          monday.setHours(0, 0, 0, 0);
          const weekKey = format(monday, "yyyy-MM-dd");
          completionsByWeek[weekKey] = (completionsByWeek[weekKey] || 0) + 1;
        });

        const sortedWeeks = Object.keys(completionsByWeek).sort();
        if (sortedWeeks.length > 0) {
          const firstWeek = parseISO(sortedWeeks[0]);
          const weeks: string[] = [];
          const iterWeek = new Date(firstWeek);
          while (iterWeek <= currentWeekMonday) {
            weeks.push(format(iterWeek, "yyyy-MM-dd"));
            iterWeek.setDate(iterWeek.getDate() + 7);
          }

          let currentWeeklyStreak = 0;
          for (const weekKey of weeks) {
            const count = completionsByWeek[weekKey] || 0;
            if (count >= targetDays) {
              currentWeeklyStreak++;
            } else {
              if (weekKey !== format(currentWeekMonday, "yyyy-MM-dd")) {
                currentWeeklyStreak = 0;
              }
            }
          }

          const currentWeekKey = format(currentWeekMonday, "yyyy-MM-dd");
          const lastWeekMonday = new Date(currentWeekMonday);
          lastWeekMonday.setDate(lastWeekMonday.getDate() - 7);
          const lastWeekKey = format(lastWeekMonday, "yyyy-MM-dd");

          if ((completionsByWeek[currentWeekKey] || 0) >= targetDays) {
            nextStreak = currentWeeklyStreak;
          } else if ((completionsByWeek[lastWeekKey] || 0) >= targetDays) {
            nextStreak = currentWeeklyStreak;
          } else {
            nextStreak = 0;
          }
        }
      }

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
