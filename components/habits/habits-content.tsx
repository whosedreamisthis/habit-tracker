"use client";

import React from "react";
import dynamic from "next/dynamic";
import { HabitListSkeleton } from "@/components/progress/progress-skeletons";
import { Habit } from "@/lib/types";

const HabitList = dynamic(() => import("@/components/habits/habit-list"), {
  ssr: false,
  loading: () => <HabitListSkeleton />,
});

interface HabitsContentProps {
  habits: Habit[];
}

const HabitsContent = ({ habits }: HabitsContentProps) => {
  return <HabitList habits={habits} />;
};

export default HabitsContent;
