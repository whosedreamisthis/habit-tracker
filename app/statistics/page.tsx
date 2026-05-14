import React from "react";
import StatsHeader from "@/components/statistics/stats-header";
import StatsSummary from "../../components/statistics/summary/stats-summary";
import { getAllHabits } from "@/lib/actions";
import StatsAllHabits from "../../components/statistics/all-habits/stats-all-habits";
import StatsTopHabits from "@/components/statistics/top-habits/stats-top-habits";

const StatsPage = async () => {
  const habits = await getAllHabits();

  return (
    <section>
      <StatsHeader />
      <StatsSummary />
      <StatsTopHabits habits={habits} />
      <StatsAllHabits habits={habits} />
    </section>
  );
};

export default StatsPage;
