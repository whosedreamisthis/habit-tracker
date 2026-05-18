import React, { Suspense } from "react";
import { getAllHabits } from "@/lib/actions";
import SectionHeader from "@/components/common/section-header";
import { format, startOfWeek, endOfWeek } from "date-fns";
import Link from "next/link";
import { cn } from "@/lib/utils";
import ProgressContent from "@/components/progress/progress-content";
import { auth } from "@clerk/nextjs/server";
import { Habit } from "@/lib/types";

interface PageProps {
  searchParams: Promise<{ tab?: string }>;
}

const ProgressData = async ({ activeTab }: { activeTab: string }) => {
  const { userId } = await auth();
  const allHabits = await getAllHabits();
  const habits = allHabits.filter((h: Habit) => h.status === "active");

  return (
    <ProgressContent activeTab={activeTab} habits={habits} userId={userId} />
  );
};

const ProgressPage = async ({ searchParams }: PageProps) => {
  const params = await searchParams;
  const activeTab = params.tab || "weekly";

  const start = startOfWeek(new Date(), { weekStartsOn: 1 });
  const end = endOfWeek(new Date(), { weekStartsOn: 1 });
  const range = `${format(start, "MMM d")} — ${format(end, "MMM d, yyyy")}`;

  const tabs = [
    { id: "weekly", label: "Weekly" },
    { id: "insights", label: "Insights" },
    { id: "statistics", label: "Statistics" },
  ];

  return (
    <section className="flex flex-col gap-6 m-5">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <SectionHeader title="Progress & Insights" description={range} />

        <div className="flex bg-slate-100 dark:bg-stone-800 p-1 rounded-lg">
          {tabs.map((tab) => (
            <Link
              key={tab.id}
              href={`/progress?tab=${tab.id}`}
              className={cn(
                "px-4 py-1.5 rounded-md text-sm font-medium ",
                activeTab === tab.id
                  ? "bg-white dark:bg-stone-700 text-brand-700 dark:text-brand-400 shadow-sm"
                  : "text-slate-500 dark:text-stone-400 hover:text-slate-700 dark:hover:text-stone-200",
              )}
            >
              {tab.label}
            </Link>
          ))}
        </div>
      </div>

      <Suspense
        fallback={
          <div className="space-y-6 animate-pulse">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-32 bg-slate-100 dark:bg-stone-800 rounded-xl"
                />
              ))}
            </div>
            <div className="h-96 bg-slate-100 dark:bg-stone-800 rounded-xl" />
          </div>
        }
      >
        <ProgressData activeTab={activeTab} />
      </Suspense>
    </section>
  );
};

export default ProgressPage;
