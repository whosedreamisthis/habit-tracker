import React from "react";
import StatsHabitCard from "./stats-habit-card";
import { Habit } from "@/lib/types";

const StatsAllHabits = ({ habits }: { habits: Habit[] }) => {
  return (
    <div>
      <p className="text-md pb-3 mt-5">All habits</p>
      <div className="flex flex-col gap-2">
        {habits.map((habit, index) => (
          <StatsHabitCard key={index} {...habit} />
        ))}
      </div>
    </div>
  );
};

export default StatsAllHabits;
