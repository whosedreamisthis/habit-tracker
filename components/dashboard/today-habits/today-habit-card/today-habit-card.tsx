"use client";
import React, { useOptimistic, useTransition } from "react";
import TodayHabitInfo from "./today-habit-info";
import HabitIcon from "../../../common/habit-icon";
import TodayHabitActions from "@/components/dashboard/today-habits/today-habit-card/today-habit-actions";
import { format, subDays, parseISO } from "date-fns";
import { Habit } from "@/lib/types";
import { toggleHabitCompletion } from "@/lib/actions";
import { useRouter } from "next/navigation";

type Props = {
  habit: Habit;
  completed: boolean;
};

const TodayHabitCard = ({ habit, completed }: Props) => {
  const { name, description, category, icon, color } = habit;
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [optimisticHabit, setOptimisticHabit] = useOptimistic(
    { completed, activeStreak: habit.activeStreak },
    (
      state,
      { newCompleted, newStreak }: { newCompleted: boolean; newStreak: number },
    ) => ({
      completed: newCompleted,
      activeStreak: newStreak,
    }),
  );

  const handleToggle = () => {
    startTransition(async () => {
      try {
        const nextCompleted = !completed;

        // Calculate next streak optimistically
        const today = new Date();
        const todayStr = format(today, "yyyy-MM-dd");
        const targetDays = habit.targetDays || 7;

        const updatedCompletions = [...(habit.completions || [])];
        if (nextCompleted) {
          updatedCompletions.push({ _id: "temp", date: todayStr });
        } else {
          const index = updatedCompletions.findIndex((c) => {
            const d =
              typeof c.date === "string"
                ? c.date
                : format(c.date, "yyyy-MM-dd");
            return d === todayStr;
          });
          if (index !== -1) updatedCompletions.splice(index, 1);
        }

        const sortedCompletions = updatedCompletions.sort(
          (a, b) =>
            new Date(
              typeof a.date === "string" ? a.date : a.date.toISOString(),
            ).getTime() -
            new Date(
              typeof b.date === "string" ? b.date : b.date.toISOString(),
            ).getTime(),
        );

        let nextStreak = 0;

        if (targetDays === 7) {
          // Daily Streak Logic
          let currentStreak = 0;
          const maxGap = 1;

          for (let i = 0; i < sortedCompletions.length; i++) {
            if (i === 0) {
              currentStreak = 1;
            } else {
              const prevDate = parseISO(
                typeof sortedCompletions[i - 1].date === "string"
                  ? (sortedCompletions[i - 1].date as string)
                  : (sortedCompletions[i - 1].date as Date).toISOString(),
              );
              const currDate = parseISO(
                typeof sortedCompletions[i].date === "string"
                  ? (sortedCompletions[i].date as string)
                  : (sortedCompletions[i].date as Date).toISOString(),
              );
              const diffTime = Math.abs(
                currDate.getTime() - prevDate.getTime(),
              );
              const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

              if (diffDays <= maxGap) {
                currentStreak++;
              } else {
                currentStreak = 1;
              }
            }
          }

          if (sortedCompletions.length > 0) {
            const lastC = sortedCompletions[sortedCompletions.length - 1];
            const lastDate = parseISO(
              typeof lastC.date === "string"
                ? (lastC.date as string)
                : (lastC.date as Date).toISOString(),
            );
            const diffTime = Math.abs(today.getTime() - lastDate.getTime());
            const diffDaysFromToday = Math.floor(
              diffTime / (1000 * 60 * 60 * 24),
            );

            if (diffDaysFromToday <= maxGap) {
              nextStreak = currentStreak;
            }
          }
        } else {
          // Weekly Streak Logic
          const dayOfWeek = today.getDay();
          const diffToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
          const currentWeekMonday = new Date(today);
          currentWeekMonday.setDate(today.getDate() - diffToMonday);
          currentWeekMonday.setHours(0, 0, 0, 0);

          const completionsByWeek: Record<string, number> = {};
          sortedCompletions.forEach((c) => {
            const dateStr =
              typeof c.date === "string"
                ? (c.date as string)
                : (c.date as Date).toISOString();
            const date = parseISO(dateStr);
            const dOW = date.getDay();
            const dTM = dOW === 0 ? 6 : dOW - 1;
            const monday = new Date(date);
            monday.setDate(date.getDate() - dTM);
            monday.setHours(0, 0, 0, 0);
            const weekKey = format(monday, "yyyy-MM-dd");
            completionsByWeek[weekKey] = (completionsByWeek[weekKey] || 0) + 1;
          });

          const sortedWeeks = Object.keys(completionsByWeek).sort();
          if (sortedWeeks.length > 0) {
            const firstWeek = parseISO(sortedWeeks[0]);
            const weeks: string[] = [];
            const iterWeek = new Date(firstWeek);
            while (iterWeek <= currentWeekMonday) {
              weeks.push(format(iterWeek, "yyyy-MM-dd"));
              iterWeek.setDate(iterWeek.getDate() + 7);
            }

            let currentWeeklyStreak = 0;
            for (const weekKey of weeks) {
              const count = completionsByWeek[weekKey] || 0;
              if (count >= targetDays) {
                currentWeeklyStreak++;
              } else {
                if (weekKey !== format(currentWeekMonday, "yyyy-MM-dd")) {
                  currentWeeklyStreak = 0;
                }
              }
            }

            const currentWeekKey = format(currentWeekMonday, "yyyy-MM-dd");
            const lastWeekMonday = new Date(currentWeekMonday);
            lastWeekMonday.setDate(lastWeekMonday.getDate() - 7);
            const lastWeekKey = format(lastWeekMonday, "yyyy-MM-dd");

            if ((completionsByWeek[currentWeekKey] || 0) >= targetDays) {
              nextStreak = currentWeeklyStreak;
            } else if ((completionsByWeek[lastWeekKey] || 0) >= targetDays) {
              nextStreak = currentWeeklyStreak;
            } else {
              nextStreak = 0;
            }
          }
        }

        setOptimisticHabit({
          newCompleted: nextCompleted,
          newStreak: nextStreak,
        });

        await toggleHabitCompletion(habit._id, completed);
        router.refresh();
      } catch (error) {
        console.error("Failed to update habit:", error);
      }
    });
  };

  return (
    <div
      className={`flex flex-col justify-center items-center gap-2 sm:flex-row sm:justify-between ${optimisticHabit.completed ? "bg-brand-50 dark:bg-stone-700" : "bg-white dark:bg-stone-900"} p-5 shadow-xs rounded-lg transition-colors duration-300`}
    >
      <div className="flex gap-3 items-center">
        <HabitIcon icon={icon} color={color} size="large" />
        <TodayHabitInfo
          name={name}
          description={description}
          category={category}
        />
      </div>

      <TodayHabitActions
        completed={optimisticHabit.completed}
        onToggle={handleToggle}
        isPending={isPending}
        activeStreak={optimisticHabit.activeStreak}
        habit={habit}
      />
    </div>
  );
};

export default TodayHabitCard;
