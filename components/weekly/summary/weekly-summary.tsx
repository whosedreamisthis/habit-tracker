"use client";

import React from "react";
import WeeklyStatsCard from "./weekly-summary-card";
import { Habit } from "@/lib/types";

const WeeklySummary = ({ habits }: { habits: Habit[] }) => {
  // 1. Calculate Today's Progress
  const completedToday = habits.filter((h) => h.isCompletedToday).length;
  const totalActiveHabits = habits.length;

  const todayProgressRate =
    totalActiveHabits > 0
      ? Math.round((completedToday / totalActiveHabits) * 100)
      : 0;

  // 2. FIX: Calculate Consistency Index (Average Streak)
  const totalStreakDays = habits.reduce((acc, h) => acc + h.activeStreak, 0);
  const rawAverage =
    totalActiveHabits > 0 ? totalStreakDays / totalActiveHabits : 0;

  // Clean up decimals: turns 4.3333 into "4.3", but keeps 5.0 as just "5"
  const averageStreak =
    rawAverage % 1 === 0 ? rawAverage.toString() : rawAverage.toFixed(1);

  // 3. Find the Global Best Record & Top Performer
  const bestAllTimeStreak = Math.max(0, ...habits.map((h) => h.bestStreak));
  const topHabit = habits.sort((a, b) => b.activeStreak - a.activeStreak)[0];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {/* CARD 1: Today's Progress */}
      <WeeklyStatsCard
        label="Today's Progress"
        description={`${completedToday} of ${totalActiveHabits} done`}
        value={`${todayProgressRate}%`}
      />

      {/* CARD 2: NEW Consistency Index */}
      <WeeklyStatsCard
        label="Average Streak"
        description="Across all habits"
        value={`${averageStreak} days`}
        className="text-md line-clamp-2"
      />

      {/* CARD 3: All-Time Record */}
      <WeeklyStatsCard
        label="Best Streak"
        description="All-time record"
        value={`${bestAllTimeStreak} days`}
        className="text-md line-clamp-2"
      />

      {/* CARD 4: Top Performing Habit */}
      <WeeklyStatsCard
        label="Top Habit"
        description={`${topHabit?.activeStreak || 0} day streak`}
        value={topHabit ? `${topHabit.icon} ${topHabit.name}` : "None active"}
        className="text-sm line-clamp-2"
      />
    </div>
  );
};

export default WeeklySummary;
