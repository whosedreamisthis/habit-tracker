import React from "react";
import InsightsHeader from "@/components/insights/insights-header";
import CompletionChart from "../../components/charts/completion-chart";
import { getThisWeekData, getWeeklyComparisonData } from "@/lib/date-utils";
import { getAllHabits } from "@/lib/actions";
import InsightsSummary from "@/components/insights/summary/insights-summary";
import WeeklyComparisonChart from "@/components/charts/weekly-comparison-chart";
import HabitPerformance from "@/components/insights/habit-performance";
import ActiveStreaks from "@/components/insights/active-streaks";

const InsightsPage = async () => {
  const allHabits = await getAllHabits();
  const habits = allHabits.filter((h) => h.status === "active");
  const thisWeek = getThisWeekData(habits);
  const comparisonData = getWeeklyComparisonData(habits);

  return (
    <section>
      <InsightsHeader />

      <InsightsSummary habits={habits} />
      <CompletionChart title="Completion by day" data={thisWeek} />
      <WeeklyComparisonChart data={comparisonData} />
      <HabitPerformance habits={habits} />
      <ActiveStreaks habits={habits} />
    </section>
  );
};

export default InsightsPage;
