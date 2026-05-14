import React from "react";
import HabitIcon from "../../helpers/habit-icon";
import HabitCardInfo from "./habit-card-info";
import HabitCardStreaksAndButtons from "@/components/habits/habit-card/habit-card-streaks-and-buttons";

type HabitCardProps = {
  description: string;
  frequency: "daily" | "weekly" | "monthly";
  targetDays: number;
  isArchived: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
  category: string;
  name: string;
  icon: string;
  color: string;
};

const HabitCard = ({
  description,
  frequency,
  targetDays,
  isArchived,
  order,
  category,
  color,
  icon,
  name,
}: HabitCardProps) => {
  return (
    <div className=" w-full bg-white border-none p-4 rounded-xl shadow-sm">
      <div className="flex flex-col sm:flex-row justify-between items-center w-full">
        <div className="flex  items-center gap-4">
          <HabitIcon icon={icon} color={color} />
          <HabitCardInfo
            description={description}
            frequency={frequency}
            targetDays={targetDays}
            isArchived={isArchived}
            order={order}
            name={name}
            category={category}
          />
        </div>
        <HabitCardStreaksAndButtons />
      </div>
    </div>
  );
};

export default HabitCard;
