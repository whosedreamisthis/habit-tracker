import React from "react";
import StatsHeader from "@/components/statistics/stats-header";
import StatsSummary from "../../components/statistics/summary/stats-summary";

const StatsPage = () => {
  return (
    <section>
      <StatsHeader />
      <StatsSummary />
    </section>
  );
};

export default StatsPage;
