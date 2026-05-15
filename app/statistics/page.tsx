import React from "react";
import StatsHeader from "@/components/statistics/stats-header";
import StatsSummary from "../../components/statistics/summary/stats-summary";
import { getAllHabits } from "@/lib/actions";
import StatsAllHabits from "../../components/statistics/all-habits/stats-all-habits";

import StatsCharts from "../../components/charts/stats-charts";

const StatsPage = async () => {
  const habits = await getAllHabits();

  return (
    <section>
      <StatsHeader />
      <StatsSummary />
      <StatsCharts />
      <StatsAllHabits habits={habits} />
    </section>
  );
};

export default StatsPage;
