import React from "react";
import InsightsHeader from "@/components/insights/insights-header";
import CompletionChart from "../../components/charts/completion-chart";
import { getThisWeekData } from "@/lib/date-utils";
import { getAllHabits } from "@/lib/actions";
import InsightsSummary from "@/components/insights/summary/insights-summary";
const InsightsPage = async () => {
  const habits = await getAllHabits();

  const thisWeek = getThisWeekData(habits);

  return (
    <section>
      <InsightsHeader />

      <InsightsSummary />
      <CompletionChart title="Completion by day" data={thisWeek} />
    </section>
  );
};

export default InsightsPage;
