import React from "react";
import SectionHeader from "../common/section-header";
import SuggestHabitButton from "../forms/habit/suggest-habit-button";
import AddHabitButton from "../forms/habit/add-habit-button";
const HabitsHeader = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center pb-5 gap-2">
      <SectionHeader
        title="All habits"
        description="Manage every habit you've ever created."
      />

      <div className="flex gap-1.5">
        <SuggestHabitButton />
        <AddHabitButton />
      </div>
    </div>
  );
};

export default HabitsHeader;
