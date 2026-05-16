import React from "react";
import InsightsHeader from "@/components/insights/insights-header";
import CompletionChart from "../../components/charts/completion-chart";
import { getThisWeekData } from "@/lib/date-utils";
import { getAllHabits } from "@/lib/actions";
import InsightsSummary from "@/components/insights/summary/insights-summary";
import WeeklyComparisonChart from "@/components/charts/weekly-comparison-chart";
import HabitPerformance from "@/components/insights/habit-performance";
import ActiveStreaks from "@/components/insights/active-streaks";

const InsightsPage = async () => {
  const habits = await getAllHabits({ status: "active" });

  const thisWeek = getThisWeekData(habits);

  return (
    <section>
      <InsightsHeader />

      <InsightsSummary />
      <CompletionChart title="Completion by day" data={thisWeek} />
      <WeeklyComparisonChart />
      <HabitPerformance />
      <ActiveStreaks />
    </section>
  );
};

export default InsightsPage;
