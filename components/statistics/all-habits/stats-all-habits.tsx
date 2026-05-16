import React from "react";
import StatsHabitCard from "./stats-habit-card";
import { getAllHabits } from "@/lib/actions";

const StatsAllHabits = async () => {
  const habits = await getAllHabits({ status: "active" });

  return (
    <div>
      <p className="text-md pb-3 mt-5">All habits</p>
      <div className="flex flex-col gap-2">
        {habits.map((habit, index) => (
          <StatsHabitCard key={index} habit={habit} />
        ))}
      </div>
    </div>
  );
};

export default StatsAllHabits;
