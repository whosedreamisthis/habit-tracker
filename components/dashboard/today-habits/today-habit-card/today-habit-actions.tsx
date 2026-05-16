"use client";
import { Ellipsis, Flame, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useTransition, useOptimistic } from "react";
import { toggleHabitCompletion } from "@/lib/actions";

const TodayHabitActions = ({
  habitId,
  completed,
  activeStreak,
}: {
  habitId: string;
  completed: boolean;
  activeStreak: number;
}) => {
  const [isPending, startTransition] = useTransition();
  const [optimisticCompleted, setOptimisticCompleted] = useOptimistic(
    completed,
    (state, newCompletedValue: boolean) => newCompletedValue,
  );
  useState(completed);

  const handleToggle = () => {
    startTransition(async () => {
      try {
        // 2. Instantly flip the state visually before the network request goes out
        setOptimisticCompleted(!completed);

        // 3. Fire off the backend mutation
        await toggleHabitCompletion(habitId, completed);
      } catch (error) {
        console.error("Failed to update habit:", error);
      }
    });
  };

  return (
    <div className="flex gap-4">
      <div className="flex gap-0.5 items-center">
        <Flame size={16} className="text-red-500/80" />
        <p className="text-sm">{activeStreak}</p>
      </div>

      <Button variant="ghost">
        <Ellipsis className="mt-2" />
      </Button>
      <button
        className={`flex items-center bg-linear-to-r ${optimisticCompleted ? "from-amber-500 to-amber-700 text-white shadow-md border-2" : "bg-amber-200/50 text-amber-500/60 border-amber-500/60 border-2"}  rounded-full p-2.5  ${isPending ? "pointer-events-none" : ""} active:scale-85 transition-transform duration-300`}
        onClick={handleToggle}
        disabled={isPending}
      >
        <Check strokeWidth={3} size={22} />
      </button>
    </div>
  );
};

export default TodayHabitActions;
