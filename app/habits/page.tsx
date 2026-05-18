import React from "react";
import HabitsHeader from "@/components/habits/habits-header";
import { getAllHabits } from "@/lib/actions";
import HabitSearch from "@/components/habits/search/habit-search";
import { Habit } from "@/lib/types";
import HabitsContent from "@/components/habits/habits-content";

interface PageProps {
  searchParams: Promise<{ status?: string; q?: string; category?: string }>;
}

const HabitsPage = async ({ searchParams }: PageProps) => {
  const params = await searchParams;
  const currentStatus: "active" | "archived" =
    (params.status as "active" | "archived") || "active"; // fallback to active
  const searchQuery = params.q || "";
  const currentCategory = params.category || "";

  const allHabitsRaw = await getAllHabits();
  const activeCount = allHabitsRaw.filter(
    (h: Habit) => h.status === "active",
  ).length;
  const archivedCount = allHabitsRaw.filter(
    (h: Habit) => h.status === "archived",
  ).length;

  const habits = await getAllHabits({
    status: currentStatus,
    search: searchQuery,
    category: currentCategory,
  });

  return (
    <section>
      <HabitsHeader habits={allHabitsRaw} />
      <HabitSearch
        currentStatus={currentStatus}
        activeCount={activeCount}
        archivedCount={archivedCount}
      />
      <HabitsContent habits={habits} />
    </section>
  );
};

export default HabitsPage;
