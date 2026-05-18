"use client";
import React, { useOptimistic, useTransition } from "react";
import TodayHabitInfo from "./today-habit-info";
import HabitIcon from "../../../common/habit-icon";
import TodayHabitActions from "@/components/dashboard/today-habits/today-habit-card/today-habit-actions";
import { Habit } from "@/lib/types";
import { toggleHabitCompletion } from "@/lib/actions";
import { useRouter } from "next/navigation";
// import confetti from "canvas-confetti"; // Moved to dynamic import inside handleToggle

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
        const nextCompleted = !optimisticHabit.completed;

        // Simplified optimistic streak update
        // If it's a daily habit (targetDays === 7), we can easily guess the next streak
        // If it's weekly, we just keep the current streak for simplicity in the optimistic UI
        let nextStreak = optimisticHabit.activeStreak;
        if (habit.targetDays === 7) {
          nextStreak = nextCompleted
            ? nextStreak + 1
            : Math.max(0, nextStreak - 1);
        }

        if (nextCompleted) {
          const confetti = (await import("canvas-confetti")).default;
          confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ["#f59e0b", "#fbbf24", "#d97706", "#b45309"],
          });
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
      className={`flex flex-col justify-center items-center gap-2 sm:flex-row sm:justify-between ${optimisticHabit.completed ? "bg-brand-50 dark:bg-stone-700" : "bg-white dark:bg-stone-900"} p-5 shadow-xs rounded-lg`}
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
