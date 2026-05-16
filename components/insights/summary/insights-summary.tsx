import React from "react";
import InsightsSummaryCard from "./insights-summary-card";
import { Activity, TrendingUp, CalendarRange, Trophy } from "lucide-react";

import { Habit } from "@/lib/types";

const InsightsSummary = async ({ habits }: { habits: Habit[] }) => {
  const totalCompletions = habits.reduce(
    (acc, h) => acc + (h.isCompletedToday ? 1 : 0),
    0,
  );
  const completionRate =
    habits.length > 0
      ? Math.round((totalCompletions / habits.length) * 100)
      : 0;
  const topHabit = habits.sort((a, b) => b.activeStreak - a.activeStreak)[0];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <InsightsSummaryCard
        label="Completions"
        icon={Activity}
        description="Today"
      >
        <p className="text-2xl font-medium">{totalCompletions}</p>
      </InsightsSummaryCard>
      <InsightsSummaryCard
        label="Completion rate"
        description="Today"
        icon={TrendingUp}
      >
        <p className="text-2xl font-medium">{completionRate}%</p>
      </InsightsSummaryCard>
      <InsightsSummaryCard
        label="Best streak"
        description="Active"
        icon={CalendarRange}
      >
        <p className="text-2xl font-medium">
          {topHabit?.activeStreak || 0} days
        </p>
      </InsightsSummaryCard>
      <InsightsSummaryCard
        label="Top habit"
        description={`${topHabit?.activeStreak || 0} day streak`}
        icon={Trophy}
      >
        <p className="text-md font-medium line-clamp-1">
          {topHabit ? `${topHabit.icon} ${topHabit.name}` : "None"}
        </p>
      </InsightsSummaryCard>
    </div>
  );
};

export default InsightsSummary;
