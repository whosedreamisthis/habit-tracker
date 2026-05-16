import React from "react";
import HabitLeaderboardRow from "@/components/common/habit-leaderboard-row";
import { getAllHabits } from "@/lib/actions";

const HabitPerformance = async () => {
  const habits = await getAllHabits({ status: "active" });

  return (
    <div className="h-full w-full flex flex-col gap-1 bg-white p-5 rounded-lg mt-5">
      <p className="text-sm font-bold text-slate-800 mb-2">Habit performance</p>
      {habits.map((habit) => (
        <HabitLeaderboardRow
          key={habit._id}
          habit={habit}
          currentValue={4}
          total={7}
        />
      ))}
    </div>
  );
};

export default HabitPerformance;
