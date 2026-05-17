import React from "react";
import { Flame, Trophy, Target } from "lucide-react";
import { Habit } from "@/lib/types";
import { format, startOfWeek } from "date-fns";

const StatsHabitCardStreaks = ({ habit }: { habit: Habit }) => {
  // We show progress for the current calendar week (Mon-Sun)
  const start = startOfWeek(new Date(), { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return format(d, "yyyy-MM-dd");
  });

  const completionsThisWeek = (habit.completions || []).filter((c) => {
    const dateStr =
      typeof c.date === "string"
        ? c.date.slice(0, 10)
        : format(c.date, "yyyy-MM-dd");
    return weekDays.includes(dateStr);
  }).length;

  return (
    <div className="flex items-center gap-4">
      <div className="flex gap-1 items-center">
        <Flame className="w-5 h-5 text-brand-600 pb-1" />
        <p className="text-sm">{habit.activeStreak}</p>
      </div>
      <div className="flex gap-1 items-center">
        <Trophy className="w-5 h-5 text-brand-600 pb-1" />
        <p className="text-sm">{habit.bestStreak}</p>
      </div>

      <div className="flex gap-1 items-center" title="Weekly Goal Progress">
        <Target className="w-5 h-5 text-brand-600 pb-1" />
        <p className="text-sm">
          {completionsThisWeek}
          <span className="">/{habit.targetDays}</span>
        </p>
      </div>
    </div>
  );
};

export default StatsHabitCardStreaks;
