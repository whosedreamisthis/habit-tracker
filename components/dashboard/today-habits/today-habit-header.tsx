import React from "react";
import CircularProgress from "./circular-progress";
import { Habit } from "@/lib/types";

const TodayHabitHeader = ({ habits }: { habits: Habit[] }) => {
  const completedHabits = habits.filter((h) => h.isCompletedToday).length;
  const totalHabits = habits.length;
  const percentage = (completedHabits / totalHabits) * 100;
  const formattedPercentage = Number(percentage.toFixed(0));
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-md dark:text-stone-100">Today&apos;s habits</p>
        <p className="text-sm text-muted-foreground dark:text-stone-400">
          4 of 7 complete
        </p>
      </div>
      <CircularProgress
        percentage={formattedPercentage}
        size={55}
        strokeWidth={6}
      />
    </div>
  );
};

export default TodayHabitHeader;
