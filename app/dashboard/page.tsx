import React, { Suspense } from "react";
import DashboardSummary from "../../components/dashboard/summary/dashboard-summary";
import DashboardHeader from "@/components/dashboard/dashboard-header";
import TodayHabits from "@/components/dashboard/today-habits/today-habits";
import ConsistencyGrid from "@/components/dashboard/consistency-grid";
import { getAllHabits } from "@/lib/actions";
import MorningMotivation from "@/components/dashboard/morning-motivation";
import { auth, currentUser } from "@clerk/nextjs/server";

const ConsistencyGridSkeleton = () => (
  <div className="mt-5 bg-white dark:bg-stone-800 p-6 rounded-2xl border border-slate-100 dark:border-stone-700 shadow-sm w-full h-[180px] animate-pulse">
    <div className="h-4 bg-slate-100 dark:bg-stone-700 rounded w-1/4 mb-4"></div>
    <div className="grid grid-flow-col grid-rows-7 gap-1 w-fit">
      {Array.from({ length: 98 }).map((_, i) => (
        <div
          key={i}
          className="w-3.5 h-3.5 rounded-lg bg-slate-50 dark:bg-stone-700"
        />
      ))}
    </div>
  </div>
);

const DashboardPage = async () => {
  const { userId } = await auth();
  const user = await currentUser();
  const activeHabits = await getAllHabits({ status: "active" });

  return (
    <section>
      <DashboardHeader firstName={user?.firstName || "Friend"} />
      <MorningMotivation habits={activeHabits} userId={userId} />
      <DashboardSummary habits={activeHabits} />
      <TodayHabits habits={activeHabits} />
      <Suspense fallback={<ConsistencyGridSkeleton />}>
        <ConsistencyGrid habits={activeHabits} />
      </Suspense>
    </section>
  );
};

export default DashboardPage;
