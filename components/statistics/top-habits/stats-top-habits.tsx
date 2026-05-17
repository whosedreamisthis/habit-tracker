import React from "react";
import { Habit } from "@/lib/types";
import HabitLeaderboardRow from "../../common/habit-leaderboard-row";
import { subDays, isAfter, parseISO, startOfDay, format } from "date-fns";

const StatsTopHabits = ({ habits }: { habits: Habit[] }) => {
  const thirtyDaysAgo = startOfDay(subDays(new Date(), 30));

  const sortedHabits = [...habits]
    .map((habit) => {
      const completionsLast30Days = (habit.completions || []).filter(
        (completion) => {
          const dateStr =
            typeof completion.date === "string"
              ? completion.date
              : format(completion.date, "yyyy-MM-dd");
          const completionDate = parseISO(dateStr);
          return (
            isAfter(completionDate, thirtyDaysAgo) ||
            completionDate.getTime() === thirtyDaysAgo.getTime()
          );
        },
      ).length;

      return {
        ...habit,
        completionsLast30Days,
      };
    })
    .sort((a, b) => b.completionsLast30Days - a.completionsLast30Days);

  const topHabits = sortedHabits.slice(0, 5);

  return (
    <div className="h-80 w-full flex flex-col gap-1 bg-white p-5 rounded-lg">
      <p className="text-sm font-bold text-slate-800 mb-2">
        Top habits by completion (30d)
      </p>
      {topHabits.map((habit) => (
        <HabitLeaderboardRow
          key={habit._id}
          habit={habit}
          currentValue={habit.completionsLast30Days}
          total={30}
        />
      ))}
    </div>
  );
};

export default StatsTopHabits;
