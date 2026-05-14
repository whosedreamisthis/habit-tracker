import React from "react";
import StatsHeader from "@/components/statistics/stats-header";
import StatsSummary from "../../components/statistics/summary/stats-summary";
import { getAllHabits } from "@/lib/actions";
import StatsAllHabits from "../../components/statistics/all-habits/stats-all-habits";
import StatsTopHabits from "@/components/statistics/top-habits/stats-top-habits";
import CompletionChart from "@/components/common/completion-chart";
import { getLast7DaysData } from "@/lib/date-utils";

const StatsPage = async () => {
  const habits = await getAllHabits();
  const rolling7 = getLast7DaysData(habits);

  return (
    <section>
      <StatsHeader />
      <StatsSummary />
      <CompletionChart title="Rolling Activity (Last 7 Days)" data={rolling7} />
      <StatsTopHabits habits={habits} />
      <StatsAllHabits habits={habits} />
    </section>
  );
};

export default StatsPage;
