import React from "react";
import SectionHeader from "../common/section-header";
import SuggestHabitButton from "../forms/habit/suggest-habit-button";
import AddHabitButton from "../forms/habit/add-habit-button";
import { Habit } from "@/lib/types";

const HabitsHeader = ({ habits }: { habits: Habit[] }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center pb-5 gap-2">
      <SectionHeader
        title="All habits"
        description="Manage every habit you've ever created."
      />

      <div className="flex gap-1.5">
        <SuggestHabitButton habits={habits} />
        <AddHabitButton />
      </div>
    </div>
  );
};

export default HabitsHeader;
