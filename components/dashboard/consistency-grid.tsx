import React from "react";
import ConsistencyHeader from "@/components/dashboard/consistency-header";
import { getColor } from "@/lib/utils";
import { getAllHabits } from "@/lib/actions";

const ConsistencyGrid = async () => {
  // const habits = await getAllHabits({ status: "active" });

  const days = Array.from({ length: 91 }).map((_) => {
    // Logic to count completions for each date goes here
    return Math.floor(Math.random() * 5); // Mock data
  });

  return (
    <div className="mt-5 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm w-full">
      {/* Labels & Legend omitted for brevity */}
      <ConsistencyHeader />
      <div className="grid grid-flow-col grid-rows-7 gap-1 w-fit">
        {days.map((count, i) => (
          <div
            key={i}
            className={`w-3.5 h-3.5 rounded-lg ${getColor(count)}`}
            title={`Completions: ${count}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ConsistencyGrid;
