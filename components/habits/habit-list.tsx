import React from "react";
import HabitCard from "./habit-card/habit-card";
import { Habit } from "@/lib/types";

type HabitListProps = {
  habits: Habit[];
};

const HabitList = ({ habits }: HabitListProps) => {
  return (
    <div className="flex flex-col gap-4">
      {habits.map((habit) => (
        <HabitCard key={habit._id} {...habit} />
      ))}
    </div>
  );
};

export default HabitList;
