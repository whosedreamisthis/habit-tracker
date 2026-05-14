import React from "react";
import Summary from "@/components/dashboard/summary/summary";
import DashboardHeader from "@/components/dashboard/dashboard-header";
import TodayHabits from "@/components/dashboard/today-habits/today-habits";

const DashboardPage = () => {
  return (
    <section>
      <DashboardHeader />
      <Summary />
      <TodayHabits />
    </section>
  );
};

export default DashboardPage;
