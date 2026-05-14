import React from "react";
import StatsHeader from "@/components/statistics/stats-header";
import StatsSummary from "../../components/statistics/summary/stats-summary";
import { getAllHabits } from "@/lib/actions";
import StatsHabits from "@/components/statistics/stats-habits";

const StatsPage = async () => {
  const habits = await getAllHabits();

  return (
    <section>
      <StatsHeader />
      <StatsSummary />
      <StatsHabits habits={habits} />
    </section>
  );
};

export default StatsPage;
