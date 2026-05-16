import React from "react";
import StatsHeader from "@/components/statistics/stats-header";
import StatsSummary from "../../components/statistics/summary/stats-summary";
import StatsAllHabits from "../../components/statistics/all-habits/stats-all-habits";

import StatsCharts from "../../components/charts/stats-charts";

const StatsPage = async () => {
  return (
    <section>
      <StatsHeader />
      <StatsSummary />
      <StatsCharts />
      <StatsAllHabits />
    </section>
  );
};

export default StatsPage;
