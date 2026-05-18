import React, { Suspense } from "react";
import HabitsHeader from "@/components/habits/habits-header";
import { getAllHabits } from "@/lib/actions";
import HabitSearch from "@/components/habits/search/habit-search";
import { Habit } from "@/lib/types";
import HabitsContent from "@/components/habits/habits-content";

interface PageProps {
  searchParams: Promise<{ status?: string; q?: string; category?: string }>;
}

const HabitsData = async ({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; q?: string; category?: string }>;
}) => {
  const params = await searchParams;
  const currentStatus: "active" | "archived" =
    (params.status as "active" | "archived") || "active";
  const searchQuery = params.q || "";
  const currentCategory = params.category || "";

  // getAllHabits is cached, so calling it twice here is fine and fast
  const allHabitsRaw = await getAllHabits();
  const habits = await getAllHabits({
    status: currentStatus,
    search: searchQuery,
    category: currentCategory,
  });

  const activeCount = allHabitsRaw.filter(
    (h: Habit) => h.status === "active",
  ).length;
  const archivedCount = allHabitsRaw.filter(
    (h: Habit) => h.status === "archived",
  ).length;

  return (
    <>
      <HabitsHeader habits={allHabitsRaw} />
      <HabitSearch
        currentStatus={currentStatus}
        activeCount={activeCount}
        archivedCount={archivedCount}
      />
      <HabitsContent habits={habits} />
    </>
  );
};

const HabitsPage = ({ searchParams }: PageProps) => {
  return (
    <section className="p-4 md:p-8">
      <Suspense
        fallback={
          <div className="space-y-6 animate-pulse">
            <div className="h-10 w-48 bg-slate-100 dark:bg-stone-800 rounded" />
            <div className="h-12 w-full bg-slate-100 dark:bg-stone-800 rounded" />
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-24 w-full bg-slate-100 dark:bg-stone-800 rounded-lg"
                />
              ))}
            </div>
          </div>
        }
      >
        <HabitsData searchParams={searchParams} />
      </Suspense>
    </section>
  );
};

export default HabitsPage;
