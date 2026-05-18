import React, { Suspense } from "react";
import DashboardHeader from "@/components/dashboard/dashboard-header";
import ConsistencyGrid from "@/components/dashboard/consistency-grid";
import { getAllHabits } from "@/lib/actions";
import { auth, currentUser } from "@clerk/nextjs/server";
import DashboardContent from "@/components/dashboard/dashboard-content";

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

const UserHeader = async () => {
  const user = await currentUser();
  return <DashboardHeader firstName={user?.firstName || "Friend"} />;
};

const DashboardData = async () => {
  const { userId } = await auth();
  const activeHabits = await getAllHabits({ status: "active" });

  return (
    <>
      <DashboardContent activeHabits={activeHabits} userId={userId} />
      <Suspense fallback={<ConsistencyGridSkeleton />}>
        <ConsistencyGrid habits={activeHabits} />
      </Suspense>
    </>
  );
};

const DashboardPage = () => {
  return (
    <section className="p-4 md:p-8">
      <Suspense fallback={<DashboardHeader firstName="Friend" />}>
        <UserHeader />
      </Suspense>
      <Suspense
        fallback={
          <div className="space-y-4 animate-pulse mt-4">
            <div className="h-48 bg-slate-100 dark:bg-stone-800 rounded-lg" />
            <div className="h-64 bg-slate-100 dark:bg-stone-800 rounded-lg" />
            <ConsistencyGridSkeleton />
          </div>
        }
      >
        <DashboardData />
      </Suspense>
    </section>
  );
};

export default DashboardPage;
