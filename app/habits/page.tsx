import React from "react";
import HabitsHeader from "@/components/habits/habits-header";
import { getAllHabits } from "@/lib/actions";
import HabitList from "@/components/habits/habit-list";

const HabitsPage = async () => {
  const habits = await getAllHabits();
  return (
    <section>
      <HabitsHeader />
      <HabitList habits={habits} />
    </section>
  );
};

export default HabitsPage;
