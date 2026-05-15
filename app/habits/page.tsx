import React from "react";
import HabitsHeader from "@/components/habits/habits-header";
import { getAllHabits } from "@/lib/actions";
import HabitList from "@/components/habits/habit-list";
import HabitSearch from "@/components/habits/search/habit-search";

interface PageProps {
  searchParams: Promise<{ status?: string; q?: string; category?: string }>;
}

const HabitsPage = async ({ searchParams }: PageProps) => {
  const params = await searchParams;
  const currentStatus = params.status || "active"; // fallback to active
  const searchQuery = params.q || "";
  const currentCategory = params.category || "";

  const habits = await getAllHabits({
    status: currentStatus,
    search: searchQuery,
    category: currentCategory,
  });

  const allHabitsRaw = await getAllHabits();
  const activeCount = allHabitsRaw.filter((h) => h.status === "active").length;
  const archivedCount = allHabitsRaw.filter(
    (h) => h.status === "archived",
  ).length;

  return (
    <section>
      <HabitsHeader />
      <HabitSearch
        currentStatus={currentStatus}
        activeCount={activeCount}
        archivedCount={archivedCount}
      />
      <HabitList habits={habits} />
    </section>
  );
};

export default HabitsPage;
