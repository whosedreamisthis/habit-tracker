import React from "react";
import ConsistencyHeader from "@/components/dashboard/consistency-header";
import { getColor } from "@/lib/utils";
import { getAllHabits } from "@/lib/actions";
import { format, subDays } from "date-fns";

const ConsistencyGrid = async () => {
  const habits = await getAllHabits({ status: "active" });

  const days = Array.from({ length: 91 }).map((_, i) => {
    const dateStr = format(subDays(new Date(), 90 - i), "yyyy-MM-dd");

    // Count completions for this specific date across all active habits
    const count = habits.reduce((acc, habit) => {
      const hasCompletion = habit.completions?.some((c) => {
        const cDate =
          typeof c.date === "string" ? c.date : format(c.date, "yyyy-MM-dd");
        return cDate === dateStr;
      });
      return acc + (hasCompletion ? 1 : 0);
    }, 0);

    return count;
  });

  return (
    <div className="mt-5 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm w-full">
      {/* Labels & Legend omitted for brevity */}
      <ConsistencyHeader />
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
