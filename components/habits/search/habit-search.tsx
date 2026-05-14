import React from "react";
import { Input } from "@/components/ui/input";
import HabitCategoryDropdown from "@/components/habits/search/habit-category-dropdown";
import HabitStatus from "@/components/habits/search/habit-status";

const HabitSearch = () => {
  return (
    /* flex-wrap is the secret sauce here */
    <div className="flex flex-wrap items-center justify-center lg:justify-between gap-4 w-full p-5 bg-white mb-5 rounded-lg">
      {/* Search + Dropdown Group */}
      <div className="flex flex-wrap items-center justify-center gap-4 flex-1 min-w-[320px]">
        <Input
          placeholder="Search habits..."
          /* min-w ensures the input doesn't get squashed to 0px */
          className="flex-1 min-w-25 p-5 text-left focus-visible:ring-brand-500/50"
        />
        <div className="shrink-0">
          <HabitCategoryDropdown />
        </div>
      </div>

      {/* Status Tabs */}
      <div className="shrink-0">
        <HabitStatus />
      </div>
    </div>
  );
};

export default HabitSearch;
