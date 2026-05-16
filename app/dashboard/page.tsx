import React from "react";
import Summary from "@/components/dashboard/summary/summary";
import DashboardHeader from "@/components/dashboard/dashboard-header";
import TodayHabits from "@/components/dashboard/today-habits/today-habits";
import HabitTrackerGrid from "../../components/habit-tracker-grid/habit-tracker-grid";
import ConsistencyGrid from "@/components/dashboard/consistency-grid";

const DashboardPage = async () => {
  return (
    <section>
      <DashboardHeader />
      <Summary />
      <TodayHabits />
      <HabitTrackerGrid />
      <ConsistencyGrid />
    </section>
  );
};

export default DashboardPage;
