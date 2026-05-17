import React from "react";
import HabitIcon from "@/components/common/habit-icon";
import { Flame } from "lucide-react";
import { Habit } from "@/lib/types";

const ActiveStreakCard = ({ habit }: { habit: Habit }) => {
  const { name, icon, color, activeStreak } = habit;
  return (
    <div className="flex items-center gap-2">
      <HabitIcon icon={icon} color={color} size="medium" />
      <div className="flex flex-col justify-start">
        <p className="text-sm line-clamp-1 dark:text-stone-300">{name}</p>
        <div className="flex gap-1 text-xs text-brand-600 dark:text-brand-400 ">
          <svg
            className="absolute w-0 h-0"
            aria-hidden="true"
            focusable="false"
          >
            <linearGradient
              id="amberGradient"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              {/* top: amber-600 (#d97706) */}
              <stop offset="0%" stopColor="#d97706" />
              {/* bottom: amber-300 (#fcd34d) */}
              <stop offset="100%" stopColor="#fcd34d" />
            </linearGradient>
          </svg>
          <Flame
            size={15}
            fill="url(#amberGradient)"
            // className="stroke-amber-600 stroke-0`" /* Optional: keeps the outline matching */
          />
          <p>{activeStreak} days</p>
        </div>
      </div>
    </div>
  );
};

export default ActiveStreakCard;
