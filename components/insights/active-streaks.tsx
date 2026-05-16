import React from "react";
import { Habit } from "@/lib/types";
import ActiveStreakCard from "@/components/insights/active-streak-card";

const ActiveStreaks = ({ habits }: { habits: Habit[] }) => {
  return (
    <div className="bg-white rounded-lg` shadow-md p-4 mt-5">
      <div className="flex items-center justify-between mb-5">
        <p className="text-sm font-bold text-slate-800 ">Active streaks</p>
        <p className="text-xs text-slate-500">5 of 7</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
        {habits.map((habit) => (
          <ActiveStreakCard key={habit._id} habit={habit} />
        ))}
      </div>
    </div>
  );
};

export default ActiveStreaks;
