import React from "react";
import TodayHabitInfo from "./today-habit-info";
import HabitCardIcon from "@/components/helpers/habit-card-icon";
import TodayHabitActions from "@/components/dashboard/today-habits/today-habit-card/today-habit-actions";

type Props = {
  name: string;
  description: string;
  category: string;
  icon: string;
  color: string;
  completed: boolean;
};

const TodayHabitCard = ({
  name,
  description,
  category,
  icon,
  color,
  completed,
}: Props) => {
  return (
    <div
      className={`flex items-center justify-between ${completed ? "bg-brand-50" : "bg-white"} p-5 shadow-xs rounded-lg`}
    >
      <div className="flex gap-3 items-center">
        <HabitCardIcon icon={icon} color={color} />
        <TodayHabitInfo
          name={name}
          description={description}
          category={category}
        />
      </div>

      <TodayHabitActions completed={false} />
    </div>
  );
};

export default TodayHabitCard;
