import React from "react";

const HabitStatus = () => {
  return (
    <div className="flex  items-center gap-3 text-sm shrink-0 select-none">
      <div className="bg-brand-500/20 px-4 py-3 rounded-l-xl">
        <p className="text-amber-600">Active · 7</p>
      </div>
      <div>
        <p>Archived · 7</p>
      </div>
    </div>
  );
};

export default HabitStatus;
