import React from "react";
import DashboardSummary from "../../components/dashboard/summary/dashboard-summary";
import DashboardHeader from "@/components/dashboard/dashboard-header";
import TodayHabits from "@/components/dashboard/today-habits/today-habits";
import ConsistencyGrid from "@/components/dashboard/consistency-grid";
import { getAllHabits, resetAllHabitsData } from "@/lib/actions";
import { Button } from "@/components/ui/button";

const DashboardPage = async () => {
  const habits = await getAllHabits();
  const activeHabits = habits.filter((h) => h.status === "active");

  return (
    <section>
      <DashboardHeader />
      <DashboardSummary habits={activeHabits} />
      <TodayHabits habits={activeHabits} />
      <ConsistencyGrid />
    </section>
  );
};

export default DashboardPage;
