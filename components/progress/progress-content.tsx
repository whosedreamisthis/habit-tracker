"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Habit } from "@/lib/types";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { getThisWeekData, getWeeklyComparisonData } from "@/lib/date-utils";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ActiveStreaksSkeleton,
  ChartSkeleton,
  HabitPerformanceSkeleton,
  HabitTrackerGridSkeleton,
  StatsSummarySkeleton,
  SummarySkeleton,
  WeeklyReportSkeleton,
} from "./progress-skeletons";

const WeeklyReport = dynamic(() => import("../weekly/weekly-report"), {
  ssr: false,
  loading: () => <WeeklyReportSkeleton />,
});
const CompletionChart = dynamic(() => import("../charts/completion-chart"), {
  ssr: false,
  loading: () => <ChartSkeleton />,
});
const WeeklyComparisonChart = dynamic(
  () => import("../charts/weekly-comparison-chart"),
  {
    ssr: false,
    loading: () => <ChartSkeleton />,
  },
);
const InsightsSummary = dynamic(
  () => import("@/components/insights/summary/insights-summary"),
  {
    ssr: false,
    loading: () => <SummarySkeleton />,
  },
);
const HabitPerformance = dynamic(
  () => import("@/components/insights/habit-performance"),
  {
    ssr: false,
    loading: () => <HabitPerformanceSkeleton />,
  },
);
const ActiveStreaks = dynamic(
  () => import("@/components/insights/active-streaks"),
  {
    ssr: false,
    loading: () => <ActiveStreaksSkeleton />,
  },
);
const WeeklySummary = dynamic(
  () => import("@/components/weekly/summary/weekly-summary"),
  {
    ssr: false,
    loading: () => <SummarySkeleton />,
  },
);
const HabitTrackerGrid = dynamic(
  () => import("@/components/habit-tracker-grid/habit-tracker-grid"),
  {
    ssr: false,
    loading: () => <HabitTrackerGridSkeleton />,
  },
);
const StatsSummary = dynamic(
  () => import("@/components/statistics/summary/stats-summary"),
  {
    ssr: false,
    loading: () => <StatsSummarySkeleton />,
  },
);
const StatsCharts = dynamic(() => import("@/components/charts/stats-charts"), {
  ssr: false,
  loading: () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <ChartSkeleton />
      <ChartSkeleton />
      <ChartSkeleton />
      <Skeleton className="h-[200px] w-full" />
    </div>
  ),
});
const StatsAllHabits = dynamic(
  () => import("@/components/statistics/all-habits/stats-all-habits"),
  {
    ssr: false,
    loading: () => (
      <div className="space-y-4 mt-5">
        <Skeleton className="h-5 w-32" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    ),
  },
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
