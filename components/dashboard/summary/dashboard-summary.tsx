import React from "react";
import { SUMMARY } from "@/lib/constants";
import DashboardSummaryCard from "./dashboard-summary-card";

import { Habit } from "@/lib/types";

const DashboardSummary = async ({ habits }: { habits: Habit[] }) => {
  const totalHabits = habits.length;
  const activeStreaksCount = habits.filter((h) => h.activeStreak > 0).length;
  const bestStreak = Math.max(0, ...habits.map((h) => h.bestStreak));

  // For "This week", let's just count total completions for now or similar metric
  const thisWeek = habits.filter((h) => h.isCompletedToday).length;

  const stats = [totalHabits, activeStreaksCount, bestStreak, thisWeek];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 justify-between gap-3 mx-auto w-full">
      {SUMMARY.map((item, index) => (
        <DashboardSummaryCard key={index} {...item} value={stats[index]} />
      ))}
    </div>
  );
};

export default DashboardSummary;
