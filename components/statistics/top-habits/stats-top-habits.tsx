import React from "react";
import { Habit } from "@/lib/types";
import HabitLeaderboardRow from "../../common/habit-leaderboard-row";

const StatsTopHabits = ({ habits }: { habits: Habit[] }) => {
  const topHabits = habits.slice(0, 5);
  return (
    <div className="h-80 w-full flex flex-col gap-1 bg-white p-5 rounded-lg">
      <p className="text-sm font-bold text-slate-800 mb-2">
        Top habits by completion (30d)
      </p>
      {topHabits.map((habit) => (
        <HabitLeaderboardRow
          key={habit._id}
          habit={habit}
          currentValue={27}
          total={30}
        />
      ))}
    </div>
  );
};

export default StatsTopHabits;
