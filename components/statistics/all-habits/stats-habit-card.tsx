import React from "react";
import HabitIcon from "../../helpers/habit-icon";
import StatsHabitCardStreaks from "@/components/statistics/all-habits/stats-habit-card-streaks";

type Props = {
  category: string;
  name: string;
  icon: string;
  color: string;
};

const StatsHabitCard = ({ category, name, icon, color }: Props) => {
  return (
    <div className="flex justify-between items-center shadow-sm rounded-md bg-white p-4">
      <div className="flex gap-3 items-center">
        <HabitIcon icon={icon} color={color} />
        <div>
          <p className="font-semibold line-clamp-1">{name}</p>
          <p className="text-muted-foreground text-sm"> {category}</p>
        </div>
      </div>
      <StatsHabitCardStreaks />
    </div>
  );
};

export default StatsHabitCard;
