import React from "react";
import TodayHabitInfo from "./today-habit-info";
import HabitIcon from "../../../common/habit-icon";
import TodayHabitActions from "@/components/dashboard/today-habits/today-habit-card/today-habit-actions";
import { Habit } from "@/lib/types";

type Props = {
  habit: Habit;
  completed: boolean;
};

const TodayHabitCard = ({ habit, completed }: Props) => {
  const { name, description, category, icon, color } = habit;
  return (
    <div
      className={`flex flex-col justify-center items-center gap-2 sm:flex-row sm:justify-between ${completed ? "bg-brand-50" : "bg-white"} p-5 shadow-xs rounded-lg`}
    >
      <div className="flex gap-3 items-center">
        <HabitIcon icon={icon} color={color} size="large" />
        <TodayHabitInfo
          name={name}
          description={description}
          category={category}
        />
      </div>

      <TodayHabitActions
        completed={completed}
        activeStreak={habit.activeStreak}
        habit={habit}
      />
    </div>
  );
};

export default TodayHabitCard;
