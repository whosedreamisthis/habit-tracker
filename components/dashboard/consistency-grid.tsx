import React from "react";
import ConsistencyHeader from "@/components/dashboard/consistency-header";
import { getColor } from "@/lib/utils";
import {
  format,
  subDays,
  startOfWeek,
  addDays,
  eachDayOfInterval,
} from "date-fns";
import { Habit } from "@/lib/types";

const ConsistencyGrid = ({ habits }: { habits: Habit[] }) => {
  const today = new Date();
  // Start from a Monday approximately 90 days ago to ensure grid alignment
  const startDate = startOfWeek(subDays(today, 90), { weekStartsOn: 1 });
  const endDate = addDays(startDate, 97); // 14 full weeks (98 days)

  // Pre-calculate date range to avoid formatting in loops
  const dateInterval = eachDayOfInterval({ start: startDate, end: endDate });
  const dateStrings = dateInterval.map((d) => format(d, "yyyy-MM-dd"));

  // Pre-process habit completions into a Map for O(1) lookup
  const completionsByDate = new Map<string, number>();
  habits.forEach((habit: Habit) => {
    habit.completions?.forEach((c) => {
      const dateStr =
        typeof c.date === "string"
          ? c.date.slice(0, 10)
          : format(c.date, "yyyy-MM-dd");
      completionsByDate.set(dateStr, (completionsByDate.get(dateStr) || 0) + 1);
    });
  });

  const days = dateStrings.map(
    (dateStr) => completionsByDate.get(dateStr) || 0,
  );

  const startStr = dateStrings[0];
  const endStr = dateStrings[dateStrings.length - 1];

  const totalCompletions = habits.reduce((acc: number, habit: Habit) => {
    if (!habit.completions) return acc;
    let count = 0;
    for (const c of habit.completions) {
      const cDateStr =
        typeof c.date === "string"
          ? c.date.slice(0, 10)
          : format(c.date, "yyyy-MM-dd");
      if (cDateStr >= startStr && cDateStr <= endStr) {
        count++;
      }
    }
    return acc + count;
  }, 0);

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
