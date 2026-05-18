"use client";

import React from "react";
import ActiveStreakCard from "@/components/insights/active-streak-card";

import { Habit } from "@/lib/types";

const ActiveStreaks = ({ habits }: { habits: Habit[] }) => {
  return (
    <div className="bg-white dark:bg-stone-800 rounded-lg shadow-md p-4 mt-5">
      <div className="flex items-center justify-between mb-5">
        <p className="text-sm font-bold text-slate-800 dark:text-stone-200 ">
          Active streaks
        </p>
        <p className="text-xs text-slate-500">
          {habits.filter((h) => h.activeStreak > 0).length} of {habits.length}
        </p>
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
