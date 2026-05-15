import { Habit } from "@/lib/types";
import React from "react";
import ConsistencyHeader from "@/components/dashboard/consistency-header";
import { getColor } from "@/lib/utils";

const ConsistencyGrid = ({ habits }: { habits: Habit[] }) => {
  // 1. Generate an array of the last 91 days (13 weeks * 7)
  const days = Array.from({ length: 91 }).map((_, i) => {
    // Logic to count completions for each date goes here
    const count = Math.floor(Math.random() * 5); // Mock data
    return count;
  });

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm w-full">
      {/* Labels & Legend omitted for brevity */}
      <ConsistencyHeader />
      <div className="grid grid-flow-col grid-rows-7 gap-1 w-fit">
        {days.map((count, i) => (
          <div
            key={i}
            className={`w-3.5 h-3.5 rounded-[4px] ${getColor(count)}`}
            title={`Completions: ${count}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ConsistencyGrid;
