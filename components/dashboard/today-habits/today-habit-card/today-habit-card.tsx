"use client";
import React, { useOptimistic, useTransition } from "react";
import TodayHabitInfo from "./today-habit-info";
import HabitIcon from "../../../common/habit-icon";
import TodayHabitActions from "@/components/dashboard/today-habits/today-habit-card/today-habit-actions";
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

  const [optimisticCompleted, setOptimisticCompleted] = useOptimistic(
    completed,
    (state, newCompletedValue: boolean) => newCompletedValue,
  );

  const handleToggle = () => {
    startTransition(async () => {
      try {
        setOptimisticCompleted(!completed);
        await toggleHabitCompletion(habit._id, completed);
        router.refresh();
      } catch (error) {
        console.error("Failed to update habit:", error);
      }
    });
  };

  return (
    <div
      className={`flex flex-col justify-center items-center gap-2 sm:flex-row sm:justify-between ${optimisticCompleted ? "bg-brand-50 dark:bg-stone-700" : "bg-white dark:bg-stone-900"} p-5 shadow-xs rounded-lg transition-colors duration-300`}
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
        completed={optimisticCompleted}
        onToggle={handleToggle}
        isPending={isPending}
        activeStreak={habit.activeStreak}
        habit={habit}
      />
    </div>
  );
};

export default TodayHabitCard;
