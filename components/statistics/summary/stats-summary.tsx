import React from "react";
import StatsSummaryCard from "./stats-summary-card";
import { Flame, Trophy, TrendingDown } from "lucide-react";

import { Habit } from "@/lib/types";

const Summary = async ({ habits }: { habits: Habit[] }) => {
  const bestStreakHabit = habits.sort(
    (a, b) => b.activeStreak - a.activeStreak,
  )[0];
  const longestEverHabit = habits.sort(
    (a, b) => b.bestStreak - a.bestStreak,
  )[0];
  const needsAttentionHabit = habits.sort(
    (a, b) => a.activeStreak - b.activeStreak,
  )[0];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-between gap-3 mx-auto w-full">
      <StatsSummaryCard
        description={`${bestStreakHabit?.activeStreak || 0} days running`}
        valueIcon={bestStreakHabit?.icon || "✨"}
        value={bestStreakHabit?.name || "No active habits"}
        title="BEST STREAK"
        titleIcon={Flame}
        titleColor="text-emerald-600"
      />
      <StatsSummaryCard
        description={`${longestEverHabit?.bestStreak || 0} day record`}
        valueIcon={longestEverHabit?.icon || "🏆"}
        value={longestEverHabit?.name || "No active habits"}
        title="LONGEST EVER"
        titleIcon={Trophy}
        titleColor="text-amber-600"
      />
      <StatsSummaryCard
        description={`${needsAttentionHabit?.activeStreak || 0} day streak`}
        valueIcon={needsAttentionHabit?.icon || "⚠️"}
        value={needsAttentionHabit?.name || "No active habits"}
        title="NEEDS ATTENTION"
        titleIcon={TrendingDown}
        titleColor="text-rose-600"
      />
    </div>
  );
};

export default Summary;
