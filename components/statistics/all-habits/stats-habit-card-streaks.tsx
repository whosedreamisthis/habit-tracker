import React from "react";
import { Flame, Trophy, Target } from "lucide-react";
import { Habit } from "@/lib/types";

const StatsHabitCardStreaks = ({ habit }: { habit: Habit }) => {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const limitDateStr = sevenDaysAgo.toISOString().slice(0, 10);

  const completionsThisWeek = (habit.completions || []).filter(
    (c) => c.date >= limitDateStr,
  ).length;

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
