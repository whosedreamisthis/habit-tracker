import React from "react";
import ActiveStreakCard from "@/components/insights/active-streak-card";
import { getAllHabits } from "@/lib/actions";

const ActiveStreaks = async () => {
  const habits = await getAllHabits({ status: "active" });

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
