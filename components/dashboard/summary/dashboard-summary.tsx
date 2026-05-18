import React from "react";
import { ListChecks, Flame, Trophy, TrendingUp } from "lucide-react";
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
    if (!h.completions) return total;
    let count = 0;
    for (const c of h.completions) {
      const cDate =
        typeof c.date === "string"
          ? c.date.slice(0, 10)
          : format(c.date, "yyyy-MM-dd");
      if (cDate >= limitDateStr) {
        count++;
      }
    }
    return total + count;
  }, 0);
  const stats = [totalHabits, activeStreaksCount, bestStreak, thisWeek];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 justify-between gap-3 mx-auto w-full">
      {SUMMARY.map((item, index) => {
        const Icon =
          item.icon === "ListChecks"
            ? ListChecks
            : item.icon === "Flame"
              ? Flame
              : item.icon === "Trophy"
                ? Trophy
                : TrendingUp;
        return (
          <DashboardSummaryCard
            key={index}
            {...item}
            icon={Icon}
            value={stats[index]}
          />
        );
      })}
    </div>
  );
};

export default DashboardSummary;
