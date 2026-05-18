import React from "react";
import TodayHabitHeader from "@/components/dashboard/today-habits/today-habit-header";
import TodayHabitCard from "./today-habit-card/today-habit-card";

import { Habit } from "@/lib/types";

const TodayHabits = ({ habits }: { habits: Habit[] }) => {
  return (
    <div className="flex flex-col gap-4 mt-5 bg-gray-100 dark:bg-stone-800 p-5 rounded-lg shadow-sm">
      <TodayHabitHeader habits={habits} />
      {habits.map((habit) => (
        <TodayHabitCard
          key={habit._id}
          habit={habit}
          completed={habit.isCompletedToday ?? false}
        />
      ))}
    </div>
  );
};

export default TodayHabits;
