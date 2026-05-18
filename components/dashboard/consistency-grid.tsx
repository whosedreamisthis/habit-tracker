import React from "react";
import ConsistencyHeader from "@/components/dashboard/consistency-header";
import { getColor } from "@/lib/utils";
import { getAllHabits } from "@/lib/actions";
import { format, subDays } from "date-fns";
import { Habit } from "@/lib/types";

const ConsistencyGrid = async () => {
  const habits = await getAllHabits({ status: "active" });

  const days = Array.from({ length: 91 }).map((_, i) => {
    const dateStr = format(subDays(new Date(), 90 - i), "yyyy-MM-dd");

    // Count completions for this specific date across all active habits
    return habits.reduce((acc: number, habit: Habit) => {
      const hasCompletion = habit.completions?.some((c) => {
        const cDate =
          typeof c.date === "string" ? c.date : format(c.date, "yyyy-MM-dd");
        return cDate === dateStr;
      });
      return acc + (hasCompletion ? 1 : 0);
    }, 0);
  });

  const totalCompletions = habits.reduce(
    (acc: number, habit: Habit) => acc + (habit.completions?.length || 0),
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
