import React from "react";

import CompletionChart from "@/components/common/completion-chart";
import HistoryChart from "@/components/common/history-chart";
import { getLast7DaysData } from "@/lib/date-utils";
import { getAllHabits } from "@/lib/actions";

const StatsCharts = async () => {
  const habits = await getAllHabits();

  const rolling7 = getLast7DaysData(habits);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-5">
      <CompletionChart title="Rolling Activity (Last 7 Days)" data={rolling7} />
      <HistoryChart />
    </div>
  );
};

export default StatsCharts;
