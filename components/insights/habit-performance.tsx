import React from "react";
import HabitLeaderboardRow from "@/components/common/habit-leaderboard-row";

import { Habit } from "@/lib/types";
import { format, startOfWeek, endOfWeek, isWithinInterval } from "date-fns";

const HabitPerformance = async ({ habits }: { habits: Habit[] }) => {
  const start = startOfWeek(new Date(), { weekStartsOn: 1 });
  const end = endOfWeek(new Date(), { weekStartsOn: 1 });

  // Generate all date strings for the current week (Mon-Sun)
  const weekDays = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return format(d, "yyyy-MM-dd");
  });

  return (
    <div className="h-full w-full flex flex-col gap-1 bg-white dark:bg-stone-800 p-5 rounded-lg mt-5">
      <p className="text-sm font-bold text-slate-800 dark:text-stone-200 mb-2">
        Habit performance
      </p>
      {habits.map((habit) => {
        const completionsThisWeek =
          habit.completions?.filter((completion) => {
            const dateStr =
              typeof completion.date === "string"
                ? completion.date.slice(0, 10)
                : format(completion.date, "yyyy-MM-dd");
            return weekDays.includes(dateStr);
          }).length || 0;

        return (
          <HabitLeaderboardRow
            key={habit._id}
            habit={habit}
            currentValue={completionsThisWeek}
            total={habit.targetDays || 7}
          />
        );
      })}
    </div>
  );
};

export default HabitPerformance;
