"use client";

import React from "react";

interface HabitStatusProps {
  currentStatus: "active" | "archived";
  onChange: (status: "active" | "archived") => void;
  activeCount: number;
  archivedCount: number;
}

const HabitStatus = ({
  currentStatus,
  onChange,
  activeCount,
  archivedCount,
}: HabitStatusProps) => {
  const isActive = currentStatus === "active";

  return (
    /* 1. Added a fixed width (w-60) and p-1 to create that nice inner-padding look */
    <div className="flex items-center text-sm shrink-0 select-none bg-slate-100 rounded-xl w-60">
      {/* Active Button */}
      <div
        /* 2. Added flex-1 and text-center to lock the button size */
        className={`flex-1 px-4 py-2 rounded-l-lg cursor-pointer transition-all text-center ${
          isActive
            ? "bg-brand-100/70 shadow-sm text-brand-600 font-semibold"
            : "text-slate-500 hover:text-slate-700"
        }`}
        onClick={() => onChange("active")}
      >
        <p>Active · {activeCount}</p>
      </div>

      {/* Archived Button */}
      <div
        /* 2. Added flex-1 and text-center here as well */
        className={`flex-1 px-4 py-2 rounded-r-lg cursor-pointer transition-all text-center ${
          !isActive
            ? "bg-brand-100/70 shadow-sm text-brand-600 font-semibold"
            : "text-slate-500 hover:text-slate-700"
        }`}
        onClick={() => onChange("archived")}
      >
        <p>Archived · {archivedCount}</p>
      </div>
    </div>
  );
};

export default HabitStatus;
