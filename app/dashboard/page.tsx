import React from "react";
import DashboardSummary from "../../components/dashboard/summary/dashboard-summary";
import DashboardHeader from "@/components/dashboard/dashboard-header";
import TodayHabits from "@/components/dashboard/today-habits/today-habits";
import HabitTrackerGrid from "../../components/habit-tracker-grid/habit-tracker-grid";
import ConsistencyGrid from "@/components/dashboard/consistency-grid";
import { getAllHabits } from "@/lib/actions";

const DashboardPage = async () => {
  const habits = await getAllHabits();
  const activeHabits = habits.filter((h) => h.status === "active");

  return (
    <section>
      <DashboardHeader />
      <DashboardSummary habits={activeHabits} />
      <TodayHabits habits={activeHabits} />
      <HabitTrackerGrid habits={activeHabits} />
      <ConsistencyGrid />
    </section>
  );
};

export default DashboardPage;
