import React from "react";
import HabitCardIcon from "@/components/helpers/habit-card-icon";
import StatsHabitCardStreaks from "@/components/statistics/stats-habit-card-streaks";

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
        <HabitCardIcon icon={icon} color={color} />
        <div>
          <p className="font-semibold">{name}</p>
          <p className="text-muted-foreground text-sm"> {category}</p>
        </div>
      </div>
      <StatsHabitCardStreaks />
    </div>
  );
};

export default StatsHabitCard;
