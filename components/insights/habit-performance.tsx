import React from "react";
import HabitLeaderboardRow from "@/components/common/habit-leaderboard-row";

import { Habit } from "@/lib/types";

const HabitPerformance = async ({ habits }: { habits: Habit[] }) => {
  return (
    <div className="h-full w-full flex flex-col gap-1 bg-white p-5 rounded-lg mt-5">
      <p className="text-sm font-bold text-slate-800 mb-2">Habit performance</p>
      {habits.map((habit) => (
        <HabitLeaderboardRow
          key={habit._id}
          habit={habit}
          currentValue={habit.isCompletedToday ? 1 : 0}
          total={1}
        />
      ))}
    </div>
  );
};

export default HabitPerformance;
