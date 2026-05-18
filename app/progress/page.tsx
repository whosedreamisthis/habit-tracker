import React from "react";
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

const ProgressPage = async ({ searchParams }: PageProps) => {
  const { userId } = await auth();
  const params = await searchParams;
  const activeTab = params.tab || "weekly";

  const allHabits = await getAllHabits();
  const habits = allHabits.filter((h: Habit) => h.status === "active");

  const start = startOfWeek(new Date(), { weekStartsOn: 1 });
  const end = endOfWeek(new Date(), { weekStartsOn: 1 });
  const range = `${format(start, "MMM d")} — ${format(end, "MMM d, yyyy")}`;

  const tabs = [
    { id: "weekly", label: "Weekly" },
    { id: "insights", label: "Insights" },
    { id: "statistics", label: "Statistics" },
  ];

  return (
    <section className="flex flex-col gap-6">
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

      <ProgressContent activeTab={activeTab} habits={habits} userId={userId} />
    </section>
  );
};

export default ProgressPage;
