import React from "react";
import DashboardSummary from "../../components/dashboard/summary/dashboard-summary";
import DashboardHeader from "@/components/dashboard/dashboard-header";
import TodayHabits from "@/components/dashboard/today-habits/today-habits";
import ConsistencyGrid from "@/components/dashboard/consistency-grid";
import { getAllHabits } from "@/lib/actions";
import MorningMotivation from "@/components/dashboard/morning-motivation";
import { auth } from "@clerk/nextjs/server";

const DashboardPage = async () => {
  const { userId } = await auth();
  const activeHabits = await getAllHabits({ status: "active" });

  return (
    <section>
      <DashboardHeader />
      <MorningMotivation habits={activeHabits} userId={userId} />
      <DashboardSummary habits={activeHabits} />
      <TodayHabits habits={activeHabits} />
      <ConsistencyGrid />
    </section>
  );
};

export default DashboardPage;
