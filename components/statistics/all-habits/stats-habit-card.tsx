import React from "react";
import HabitIcon from "../../common/habit-icon";
import StatsHabitCardStreaks from "@/components/statistics/all-habits/stats-habit-card-streaks";
import { Habit } from "@/lib/types";

const StatsHabitCard = ({ habit }: { habit: Habit }) => {
  const { category, name, icon, color } = habit;
  return (
    <div className="flex justify-between items-center shadow-sm rounded-md bg-white dark:bg-stone-800 p-4">
      <div className="flex gap-3 items-center">
        <HabitIcon icon={icon} color={color} size="large" />
        <div>
          <p className="font-semibold line-clamp-1">{name}</p>
          <p className="text-muted-foreground text-sm"> {category}</p>
        </div>
      </div>
      <StatsHabitCardStreaks habit={habit} />
    </div>
  );
};

export default StatsHabitCard;
