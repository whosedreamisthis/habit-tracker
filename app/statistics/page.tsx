import React from "react";
import StatsHeader from "@/components/statistics/stats-header";
import StatsSummary from "../../components/statistics/summary/stats-summary";
import StatsAllHabits from "../../components/statistics/all-habits/stats-all-habits";

import StatsCharts from "../../components/charts/stats-charts";

import { getAllHabits } from "@/lib/actions";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const StatsPage = async () => {
  const allHabits = await getAllHabits();
  const habits = allHabits.filter((h) => h.status === "active");

  return (
    <section>
      <StatsHeader />
      <StatsSummary habits={habits} />
      <StatsCharts />
      <StatsAllHabits habits={habits} />
    </section>
  );
};

export default StatsPage;
