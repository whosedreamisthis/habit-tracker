import React from "react";
import StatsHabitCard from "@/components/statistics/stats-habit-card";
import { Habit } from "@/lib/types";

const StatsHabits = ({ habits }: { habits: Habit[] }) => {
  return (
    <div className="pt-5">
      <p className="text-md pb-3 ">All habits</p>
      <div className="flex flex-col gap-2">
        {habits.map((habit, index) => (
          <StatsHabitCard key={index} {...habit} />
        ))}
      </div>
    </div>
  );
};

export default StatsHabits;
