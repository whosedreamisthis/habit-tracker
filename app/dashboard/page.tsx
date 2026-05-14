import React from "react";
import Summary from "@/components/dashboard/summary/summary";
import DashboardHeader from "@/components/dashboard/dashboard-header";
import TodayHabits from "@/components/dashboard/today-habits/today-habits";
import HabitTrackerGrid from "../../components/habit-tracker-grid/habit-tracker-grid";

const DashboardPage = () => {
  return (
    <section>
      <DashboardHeader />
      <Summary />
      <TodayHabits />
      <HabitTrackerGrid />
    </section>
  );
};

export default DashboardPage;
