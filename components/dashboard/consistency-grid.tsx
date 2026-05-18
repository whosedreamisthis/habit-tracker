import React from "react";
import ConsistencyHeader from "@/components/dashboard/consistency-header";
import { getColor } from "@/lib/utils";
import { format, subDays, startOfWeek, addDays } from "date-fns";
import { Habit } from "@/lib/types";

const ConsistencyGrid = ({ habits }: { habits: Habit[] }) => {
  const today = new Date();
  // Start from a Monday approximately 90 days ago to ensure grid alignment
  const startDate = startOfWeek(subDays(today, 90), { weekStartsOn: 1 });
  const endDate = addDays(startDate, 97); // 14 full weeks (98 days)
  const totalDays = 98;

  // Pre-process habit completions into a Map for O(1) lookup
  const completionsByDate = new Map<string, number>();
  habits.forEach((habit: Habit) => {
    habit.completions?.forEach((c) => {
      const dateStr =
        typeof c.date === "string" ? c.date : format(c.date, "yyyy-MM-dd");
      completionsByDate.set(dateStr, (completionsByDate.get(dateStr) || 0) + 1);
    });
  });

  const days = Array.from({ length: totalDays }).map((_, i) => {
    const dateStr = format(addDays(startDate, i), "yyyy-MM-dd");
    return completionsByDate.get(dateStr) || 0;
  });

  const totalCompletions = habits.reduce(
    (acc: number, habit: Habit) =>
      acc +
      (habit.completions?.filter((c) => {
        const cDateStr =
          typeof c.date === "string" ? c.date : format(c.date, "yyyy-MM-dd");
        return (
          cDateStr >= format(startDate, "yyyy-MM-dd") &&
          cDateStr <= format(endDate, "yyyy-MM-dd")
        );
      }).length || 0),
    0,
  );

  return (
    <div className="mt-5 bg-white dark:bg-stone-800 p-6 rounded-2xl border border-slate-100 dark:border-stone-700 shadow-sm w-full">
      {/* Labels & Legend omitted for brevity */}
      <ConsistencyHeader totalCompletions={totalCompletions} />
      <div className="grid grid-flow-col grid-rows-7 gap-1 w-fit">
        {days.map((count, i) => (
          <div
            key={i}
            className={`w-3.5 h-3.5 rounded-lg ${getColor(count)}`}
            title={`Completions: ${count}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ConsistencyGrid;
