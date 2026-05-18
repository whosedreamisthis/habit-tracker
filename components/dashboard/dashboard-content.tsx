"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Habit } from "@/lib/types";
import {
  MorningMotivationSkeleton,
  DashboardSummarySkeleton,
  TodayHabitsSkeleton,
} from "@/components/progress/progress-skeletons";

const MorningMotivation = dynamic(
  () => import("@/components/dashboard/morning-motivation"),
  { ssr: true, loading: () => <MorningMotivationSkeleton /> },
);
const DashboardSummary = dynamic(
  () => import("../../components/dashboard/summary/dashboard-summary"),
  { ssr: true, loading: () => <DashboardSummarySkeleton /> },
);
const TodayHabits = dynamic(
  () => import("@/components/dashboard/today-habits/today-habits"),
  { ssr: true, loading: () => <TodayHabitsSkeleton /> },
);

interface DashboardContentProps {
  activeHabits: Habit[];
  userId: string | null | undefined;
}

const DashboardContent = ({ activeHabits, userId }: DashboardContentProps) => {
  return (
    <>
      <MorningMotivation habits={activeHabits} userId={userId} />
      <DashboardSummary habits={activeHabits} />
      <TodayHabits habits={activeHabits} />
    </>
  );
};

export default DashboardContent;
