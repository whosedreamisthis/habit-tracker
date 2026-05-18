import React from "react";
import { SUMMARY } from "@/lib/constants";
import DashboardSummaryCard from "./dashboard-summary-card";

import { Habit } from "@/lib/types";

import { format } from "date-fns";

const DashboardSummary = async ({ habits }: { habits: Habit[] }) => {
  const totalHabits = habits.length;
  const activeStreaksCount = habits.filter((h) => h.activeStreak > 0).length;
  const bestStreak = Math.max(0, ...habits.map((h) => h.bestStreak));

  // For "This week", let's just count total completions for now or similar metric
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const limitDateStr = sevenDaysAgo.toISOString().slice(0, 10); // "2026-05-09"

  // 2. Tally up the matching objects
  const thisWeek = habits.reduce((total, h) => {
    const completionCountThisWeek = (h.completions || []).filter((c) => {
      const cDate =
        typeof c.date === "string" ? c.date : format(c.date, "yyyy-MM-dd");
      return cDate >= limitDateStr;
    }).length;

    return total + completionCountThisWeek;
  }, 0);
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
