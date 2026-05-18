import React from "react";
import DashboardSummary from "../../components/dashboard/summary/dashboard-summary";
import DashboardHeader from "@/components/dashboard/dashboard-header";
import TodayHabits from "@/components/dashboard/today-habits/today-habits";
import ConsistencyGrid from "@/components/dashboard/consistency-grid";
import { getAllHabits } from "@/lib/actions";
import MorningMotivation from "@/components/dashboard/morning-motivation";

const DashboardPage = async () => {
  const activeHabits = await getAllHabits({ status: "active" });

  return (
    <section>
      <DashboardHeader />
      <MorningMotivation habits={activeHabits} />
      <DashboardSummary habits={activeHabits} />
      <TodayHabits habits={activeHabits} />
      <ConsistencyGrid />
    </section>
  );
};

export default DashboardPage;
