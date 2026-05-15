import React from "react";
import { Habit } from "@/lib/types";
import ActiveStreakCard from "@/components/insights/active-streak-card";

const ActiveStreaks = ({ habits }: { habits: Habit[] }) => {
  return (
    <div className="bg-white rounded-lg` shadow-md p-4 mt-5">
      <p className="text-sm font-bold text-slate-800 mb-5">Active streaks</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
        {habits.map((habit) => (
          <ActiveStreakCard key={habit._id} {...habit} activeStreak={13} />
        ))}
      </div>
    </div>
  );
};

export default ActiveStreaks;
