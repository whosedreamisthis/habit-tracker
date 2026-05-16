import React from "react";
import TodayHabitHeader from "@/components/dashboard/today-habits/today-habit-header";
import { getAllHabits } from "@/lib/actions";
import TodayHabitCard from "./today-habit-card/today-habit-card";

const TodayHabits = async () => {
  const habits = await getAllHabits({ status: "active" });

  return (
    <div className="flex flex-col gap-4 mt-5 bg-gray-100 p-5 rounded-lg shadow-sm">
      <TodayHabitHeader />
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
