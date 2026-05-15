import React from "react";
import { Habit } from "@/lib/types";
import TopHabit from "@/components/statistics/top-habits/top-habit";

const StatsTopHabits = ({ habits }: { habits: Habit[] }) => {
  const topHabits = habits.slice(0, 5);
  return (
    <div className="h-80 w-full flex flex-col gap-1 bg-white p-5 rounded-lg my-5">
      <h3 className="font-semibold">Top habits by completion (30d)</h3>
      {topHabits.map((habit) => (
        <TopHabit key={habit._id} {...habit} />
      ))}
    </div>
  );
};

export default StatsTopHabits;
