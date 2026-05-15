import React from "react";
import InsightsHeader from "@/components/insights/insights-header";
import CompletionChart from "../../components/charts/completion-chart";
import { getThisWeekData } from "@/lib/date-utils";
import { getAllHabits } from "@/lib/actions";
const InsightsPage = async () => {
  const habits = await getAllHabits();

  const thisWeek = getThisWeekData(habits);

  return (
    <section>
      <InsightsHeader />
      {/*<CompletionChart title="Completions by day" />*/}
      <CompletionChart title="This Week (Mon-Sun)" data={thisWeek} />
    </section>
  );
};

export default InsightsPage;
