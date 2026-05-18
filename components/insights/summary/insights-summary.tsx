"use client";

import React from "react";
import InsightsSummaryCard from "./insights-summary-card";
import { Activity, TrendingUp, CalendarRange, Trophy } from "lucide-react";
import { format, subDays } from "date-fns";

import { Habit } from "@/lib/types";

const InsightsSummary = ({ habits }: { habits: Habit[] }) => {
  // 1. Total Completions (All-time)
  const allTimeCompletions = habits.reduce(
    (acc, h) => acc + (h.completions?.length || 0),
    0,
  );

  // 2. Weekly Average Rate (Last 7 days)
  const last7Days = Array.from({ length: 7 }).map((_, i) =>
    format(subDays(new Date(), i), "yyyy-MM-dd"),
  );

  const weeklyCompletions = habits.reduce((acc, h) => {
    const recent =
      h.completions?.filter((c) => {
        const cDate =
          typeof c.date === "string" ? c.date : format(c.date, "yyyy-MM-dd");
        return last7Days.includes(cDate);
      }).length || 0;
    return acc + recent;
  }, 0);

  const totalPossibleWeekly = habits.length * 7;
  const weeklyAverageRate =
    totalPossibleWeekly > 0
      ? Math.round((weeklyCompletions / totalPossibleWeekly) * 100)
      : 0;

  const topHabit = habits.sort((a, b) => b.activeStreak - a.activeStreak)[0];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <InsightsSummaryCard
        label="Total Efforts"
        icon={Activity}
        description="All-time completions"
      >
        <p className="text-2xl font-medium">{allTimeCompletions}</p>
      </InsightsSummaryCard>
      <InsightsSummaryCard
        label="Weekly Avg"
        description="Last 7 days"
        icon={TrendingUp}
      >
        <p className="text-2xl font-medium">{weeklyAverageRate}%</p>
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
