import React from "react";
import { Habit } from "@/lib/types";

type Props = {
  currentValue: number;
  total: number;
  habit: Habit;
};

const HabitLeaderboardRow = ({ habit, total, currentValue }: Props) => {
  const { name, icon, color } = habit;
  const percentage = total > 0 ? Math.round((currentValue / total) * 100) : 0;

  return (
    <div className=" flex flex-col items-center justify-center p-1 rounded-md  w-full gap-2">
      <div className="flex justify-between items-center w-full">
        <div className="flex gap-3 items-center">
          <p>{icon}</p>
          <p>{name}</p>
        </div>
        <p className="text-muted-foreground text-sm">
          {currentValue}/{total} · {percentage}%
        </p>
      </div>
      <div className="relative w-full h-2">
        <div className="absolute inset-0 bg-slate-200/80 rounded-full"></div>
        <div
          className={`absolute inset-0 rounded-full`}
          style={{
            backgroundColor: color,
            width: `${Math.min(percentage, 100)}%`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default HabitLeaderboardRow;
