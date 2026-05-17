import React from "react";
import WeeklyHeader from "@/components/weekly/weekly-header";
import WeeklySummary from "../../components/weekly/summary/weekly-summary";
import HabitTrackerGrid from "@/components/habit-tracker-grid/habit-tracker-grid";

import { getAllHabits } from "@/lib/actions";

const WeeklyPage = async () => {
  const allHabits = await getAllHabits();
  const habits = allHabits.filter((h) => h.status === "active");

  return (
    <section>
      <WeeklyHeader />
      <WeeklySummary habits={habits} />
      <HabitTrackerGrid habits={habits} />
    </section>
  );
};

export default WeeklyPage;
