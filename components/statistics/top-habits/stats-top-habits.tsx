import React from "react";
import { Habit } from "@/lib/types";
import TopHabit from "@/components/statistics/top-habits/top-habit";

const StatsTopHabits = ({ habits }: { habits: Habit[] }) => {
  return (
    <div className="flex flex-col gap-3 bg-white p-5 rounded-lg my-5">
      <h3 className="font-semibold">Top habits by completion (30d)</h3>
      {habits.map((habit) => (
        <TopHabit key={habit._id} {...habit} />
      ))}
    </div>
  );
};

export default StatsTopHabits;
