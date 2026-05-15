import { Habit } from "@/lib/types";
import React from "react";

const ConsistencyGrid = ({ habits }: { habits: Habit[] }) => {
  // 1. Generate an array of the last 91 days (13 weeks * 7)
  const days = Array.from({ length: 91 }).map((_, i) => {
    // Logic to count completions for each date goes here
    const count = Math.floor(Math.random() * 5); // Mock data
    return count;
  });

  const getColor = (count: number) => {
    if (count === 0) return "bg-slate-100";
    if (count === 1) return "bg-amber-200";
    if (count === 2) return "bg-amber-400";
    if (count === 3) return "bg-orange-500";
    return "bg-orange-700";
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm w-fit">
      {/* Labels & Legend omitted for brevity */}
      <p className="text-md">Consistency</p>
      <p className="text-xs md pb-3 text-muted-foreground">
        438 completions in the last 90 days
      </p>
      <div className="grid grid-flow-col grid-rows-7 gap-1.5">
        {days.map((count, i) => (
          <div
            key={i}
            className={`w-4 h-4 rounded-[4px] ${getColor(count)}`}
            title={`Completions: ${count}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ConsistencyGrid;
