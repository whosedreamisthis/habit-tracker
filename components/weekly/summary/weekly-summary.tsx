import React from "react";
import WeeklyStatsCard from "./weekly-summary-card";

import { Habit } from "@/lib/types";

const WeeklySummary = async ({ habits }: { habits: Habit[] }) => {
  const totalPossibleCompletions = habits.length * 7;
  // This is a mock implementation since we don't have full weekly data yet
  // but we can simulate it with existing properties
  const totalCompletions = habits.reduce(
    (acc, h) => acc + (h.isCompletedToday ? 1 : 0),
    0,
  );
  const weekRate =
    totalPossibleCompletions > 0
      ? Math.round((totalCompletions / totalPossibleCompletions) * 100)
      : 0;

  const topHabit = habits.sort((a, b) => b.activeStreak - a.activeStreak)[0];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <WeeklyStatsCard
        label="Week rate"
        description={`${totalCompletions} of ${totalPossibleCompletions}`}
        value={`${weekRate}%`}
      />
      <WeeklyStatsCard
        label="Total completions"
        description="this week"
        value={totalCompletions.toString()}
      />
      <WeeklyStatsCard
        label="Best day"
        description="Daily average"
        value={(totalCompletions / (habits.length || 1)).toFixed(1)}
      />
      <WeeklyStatsCard
        label="Top habit"
        description={`${topHabit?.activeStreak || 0} day streak`}
        value={
          topHabit ? `${topHabit.icon} ${topHabit.name}` : "No active habits"
        }
      />
    </div>
  );
};

export default WeeklySummary;
