import React from "react";
import HabitIcon from "../helpers/habit-icon";
import { randomInt } from "node:crypto";
import { Check } from "lucide-react";
interface Props {
  icon: string;
  color: string;
  name: string;
}

const GridRow = ({ icon, color, name }: Props) => {
  const arr = [1, 2, 3, 4, 5, 6, 7];
  return (
    /* Must match Header: grid-cols-[1fr_repeat(7,40px)] and gap-2 */
    <div className="grid grid-cols-[1fr_repeat(7,40px)] gap-2 items-center py-3 border-b border-slate-50 last:border-0 shrink-0">
      {/* 1. Habit Name Column (takes up the 1fr space) */}
      <div className="flex items-center gap-2 min-w-0">
        <HabitIcon icon={icon} color={color} isSmall={true} />
        {/* truncate is vital to keep long names from pushing the squares */}
        <p className="truncate text-sm font-medium text-slate-700">{name}</p>
      </div>

      {/* 2. Seven Day Columns (each takes up exactly 40px) */}

      {arr.map((day, index) => {
        const completed = randomInt(1, 3) > 1;

        return (
          <div key={index} className="flex justify-center">
            <div
              className={`w-8 h-8 rounded-lg ${completed ? `text-white` : "text-slate-400 "} flex items-center justify-center text-xs  font-medium`}
              style={{ backgroundColor: completed ? color : "#e2e8f099" }}
            >
              {completed && <Check className="w-4 h-4" strokeWidth={3} />}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default GridRow;
