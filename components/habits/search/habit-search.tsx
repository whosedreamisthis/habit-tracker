import React from "react";
import { Input } from "@/components/ui/input";
import HabitCategoryDropdown from "@/components/habits/search/habit-category-dropdown";
import HabitStatus from "@/components/habits/search/habit-status";

const HabitSearch = () => {
  return (
    <div className="flex items-center justify-center gap-4 w-full p-5 bg-white mb-5 rounded-lg">
      <Input
        placeholder="Search habits..."
        className=" p-5 text-left focus-visible:ring-brand-500/50"
      />
      <HabitCategoryDropdown />
      <HabitStatus />
    </div>
  );
};

export default HabitSearch;
