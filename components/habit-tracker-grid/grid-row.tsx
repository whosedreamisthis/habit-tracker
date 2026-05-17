import React from "react";
import HabitIcon from "../common/habit-icon";
import { Check } from "lucide-react";
import { Habit } from "@/lib/types";
import { format, subDays } from "date-fns";

const GridRow = ({ habit }: { habit: Habit }) => {
  const { icon, color, name, completions } = habit;

  // We want to show the last 7 days from left to right, ending today
  const days = Array.from({ length: 7 }).map((_, i) =>
    format(subDays(new Date(), 6 - i), "yyyy-MM-dd"),
  );

  return (
    /* Must match Header: grid-cols-[1fr_repeat(7,40px)] and gap-2 */
    <div className="grid grid-cols-[1fr_repeat(7,40px)] gap-2 items-center py-3 border-b border-slate-50 last:border-0 shrink-0">
      {/* 1. Habit Name Column (takes up the 1fr space) */}
      <div className="flex items-center gap-2 min-w-0">
        <HabitIcon icon={icon} color={color} size="small" />
        {/* truncate is vital to keep long names from pushing the squares */}
        <p className="truncate text-sm font-medium text-slate-700">{name}</p>
      </div>

      {/* 2. Seven Day Columns (each takes up exactly 40px) */}

      {days.map((dateStr, index) => {
        const isCompleted = completions?.some((c) => {
          const cDate =
            typeof c.date === "string" ? c.date : format(c.date, "yyyy-MM-dd");
          return cDate === dateStr;
        });

        return (
          <div key={index} className="flex justify-center" title={dateStr}>
            <div
              className={`w-8 h-8 rounded-lg ${isCompleted ? `text-white` : "text-slate-400 "} flex items-center justify-center text-xs  font-medium`}
              style={{ backgroundColor: isCompleted ? color : "#e2e8f099" }}
            >
              {isCompleted && <Check className="w-4 h-4" strokeWidth={3} />}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default GridRow;
