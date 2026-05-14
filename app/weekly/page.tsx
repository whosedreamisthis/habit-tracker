import React from "react";
import WeeklyHeader from "@/components/weekly/weekly-header";
import WeeklySummary from "../../components/weekly/summary/WeeklySummary";
import HabitTrackerGrid from "@/components/habit-tracker-grid/habit-tracker-grid";

const WeeklyPage = () => {
  return (
    <section>
      <WeeklyHeader />
      <WeeklySummary />
      <HabitTrackerGrid />
    </section>
  );
};

export default WeeklyPage;
