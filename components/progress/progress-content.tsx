"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Habit } from "@/lib/types";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { getThisWeekData, getWeeklyComparisonData } from "@/lib/date-utils";

const WeeklyReport = dynamic(() => import("../weekly/weekly-report"), {
  ssr: false,
});
const CompletionChart = dynamic(() => import("../charts/completion-chart"), {
  ssr: false,
});
const WeeklyComparisonChart = dynamic(
  () => import("../charts/weekly-comparison-chart"),
  { ssr: false },
);
const InsightsSummary = dynamic(
  () => import("@/components/insights/summary/insights-summary"),
  { ssr: false },
);
const HabitPerformance = dynamic(
  () => import("@/components/insights/habit-performance"),
  { ssr: false },
);
const ActiveStreaks = dynamic(
  () => import("@/components/insights/active-streaks"),
  { ssr: false },
);
const WeeklySummary = dynamic(
  () => import("@/components/weekly/summary/weekly-summary"),
  { ssr: false },
);
const HabitTrackerGrid = dynamic(
  () => import("@/components/habit-tracker-grid/habit-tracker-grid"),
  { ssr: false },
);
const StatsSummary = dynamic(
  () => import("@/components/statistics/summary/stats-summary"),
  { ssr: false },
);
const StatsCharts = dynamic(() => import("@/components/charts/stats-charts"), {
  ssr: false,
});
const StatsAllHabits = dynamic(
  () => import("@/components/statistics/all-habits/stats-all-habits"),
  { ssr: false },
);

interface ProgressContentProps {
  activeTab: string;
  habits: Habit[];
  userId: string | null | undefined;
}

const ProgressContent = ({
  activeTab,
  habits,
  userId,
}: ProgressContentProps) => {
  return (
    <div className="mt-2">
      {activeTab === "weekly" && (
        <div className="flex flex-col gap-6">
          <WeeklyReport habits={habits} userId={userId} />
          <WeeklySummary habits={habits} />
          <HabitTrackerGrid habits={habits} />
        </div>
      )}

      {activeTab === "insights" && (
        <div className="flex flex-col gap-6">
          <InsightsSummary habits={habits} />
          <CompletionChart
            title="Completion by day"
            data={getThisWeekData(habits)}
          />
          <WeeklyComparisonChart data={getWeeklyComparisonData(habits)} />
          <HabitPerformance habits={habits} />
          <ActiveStreaks habits={habits} />
        </div>
      )}

      {activeTab === "statistics" && (
        <div className="flex flex-col gap-6">
          <StatsSummary habits={habits} />
          <StatsCharts habits={habits} />
          <StatsAllHabits habits={habits} />
        </div>
      )}
    </div>
  );
};

export default ProgressContent;
