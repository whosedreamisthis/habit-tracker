import React from "react";
import HabitIcon from "../../common/habit-icon";
import HabitCardInfo from "./habit-card-info";
import HabitCardStreaksAndButtons from "@/components/habits/habit-card/habit-card-streaks-and-buttons";
import { Habit } from "@/lib/types";

const HabitCard = ({ habit }: { habit: Habit }) => {
  const { icon, color } = habit;
  return (
    <div className=" w-full bg-white border-none p-4 rounded-xl shadow-sm">
      <div className="flex flex-col sm:flex-row justify-between items-center w-full">
        <div className="flex  items-center gap-4">
          <HabitIcon icon={icon} color={color} size="large" />
          <HabitCardInfo habit={habit} />
        </div>
        <HabitCardStreaksAndButtons habit={habit} />
      </div>
    </div>
  );
};

export default HabitCard;
