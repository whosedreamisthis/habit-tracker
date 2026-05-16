import React from "react";

import CompletionChart from "./completion-chart";
import HistoryChart from "@/components/charts/history-chart";
import { getLast7DaysData } from "@/lib/date-utils";
import { getAllHabits } from "@/lib/actions";
import StatsTopHabits from "@/components/statistics/top-habits/stats-top-habits";
import CategoryChart from "@/components/charts/category-chart";
import { Habit } from "@/lib/types";

export const getCategoryData = (habits: Habit[]) => {
  const categoryCounts: Record<string, number> = {};

  habits.forEach((habit) => {
    // Assuming each habit has a 'category' and a 'completions' array
    // Or if you're just counting the habits themselves:
    const category = habit.category || "Uncategorized";
    const count = habit.completions?.length || 3;

    categoryCounts[category] = (categoryCounts[category] || 0) + count;
  });

  return Object.entries(categoryCounts).map(([name, value]) => ({
    name,
    value,
  }));
};

const StatsCharts = async () => {
  const habits = await getAllHabits({ status: "active" });

  const rolling7 = getLast7DaysData(habits);
  const categoryData = getCategoryData(habits);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <CompletionChart title="Rolling Activity (Last 7 Days)" data={rolling7} />
      <HistoryChart />
      <CategoryChart data={categoryData} />
      <StatsTopHabits habits={habits} />
    </div>
  );
};

export default StatsCharts;
