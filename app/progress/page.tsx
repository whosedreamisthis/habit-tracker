import React from "react";
import { getAllHabits } from "@/lib/actions";
import SectionHeader from "@/components/common/section-header";
import { format, startOfWeek, endOfWeek } from "date-fns";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Weekly Components
import WeeklySummary from "@/components/weekly/summary/weekly-summary";
import HabitTrackerGrid from "@/components/habit-tracker-grid/habit-tracker-grid";

// Insights Components
import InsightsSummary from "@/components/insights/summary/insights-summary";
import CompletionChart from "@/components/charts/completion-chart";
import WeeklyComparisonChart from "@/components/charts/weekly-comparison-chart";
import HabitPerformance from "@/components/insights/habit-performance";
import ActiveStreaks from "@/components/insights/active-streaks";
import { getThisWeekData, getWeeklyComparisonData } from "@/lib/date-utils";

// Statistics Components
import StatsSummary from "@/components/statistics/summary/stats-summary";
import StatsCharts from "@/components/charts/stats-charts";
import StatsAllHabits from "@/components/statistics/all-habits/stats-all-habits";
import WeeklyReport from "@/components/weekly/weekly-reports";

interface PageProps {
  searchParams: Promise<{ tab?: string }>;
}

const ProgressPage = async ({ searchParams }: PageProps) => {
  const params = await searchParams;
  const activeTab = params.tab || "weekly";

  const allHabits = await getAllHabits();
  const habits = allHabits.filter((h) => h.status === "active");

  const start = startOfWeek(new Date(), { weekStartsOn: 1 });
  const end = endOfWeek(new Date(), { weekStartsOn: 1 });
  const range = `${format(start, "MMM d")} — ${format(end, "MMM d, yyyy")}`;

  const tabs = [
    { id: "weekly", label: "Weekly" },
    { id: "insights", label: "Insights" },
    { id: "statistics", label: "Statistics" },
  ];

  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <SectionHeader title="Progress & Insights" description={range} />

        <div className="flex bg-slate-100 dark:bg-stone-800 p-1 rounded-lg">
          {tabs.map((tab) => (
            <Link
              key={tab.id}
              href={`/progress?tab=${tab.id}`}
              className={cn(
                "px-4 py-1.5 rounded-md text-sm font-medium transition-all",
                activeTab === tab.id
                  ? "bg-white dark:bg-stone-700 text-brand-700 dark:text-brand-400 shadow-sm"
                  : "text-slate-500 dark:text-stone-400 hover:text-slate-700 dark:hover:text-stone-200",
              )}
            >
              {tab.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-2">
        {activeTab === "weekly" && (
          <div className="flex flex-col gap-6">
            <WeeklyReport />
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
    </section>
  );
};

export default ProgressPage;
