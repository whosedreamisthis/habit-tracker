import React from "react";
import HabitsHeader from "@/components/habits/habits-header";
import { getAllHabits } from "@/lib/actions";
import HabitList from "@/components/habits/habit-list";
import HabitSearch from "@/components/habits/search/habit-search";

const HabitsPage = async () => {
  const habits = await getAllHabits();
  return (
    <section>
      <HabitsHeader />
      <HabitSearch />
      <HabitList habits={habits} />
    </section>
  );
};

export default HabitsPage;
