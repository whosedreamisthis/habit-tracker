import { Trophy, Flame, Pencil, Trash2, Archive } from "lucide-react";

const HabitCardStreaksAndButtons = () => {
  return (
    <div className="flex flex-wrap items-center justify-end gap-y-3 gap-x-6">
      {/* Group 1: Streaks (Flame and Trophy) */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="flex items-center gap-1">
          <Flame size={14} className="text-brand-600" />
          <p className="text-sm font-medium">13</p>
        </div>
        <div className="flex items-center gap-1">
          <Trophy size={14} className="text-brand-600" />
          <p className="text-sm font-medium">58</p>
        </div>
      </div>

      {/* Group 2: Action Buttons */}
      <div className="flex items-center gap-4 shrink-0">
        <button className="hover:opacity-70 transition-opacity">
          <Pencil className="text-slate-500" size={16} />
        </button>
        <button className="hover:opacity-70 transition-opacity">
          <Archive className="text-slate-500" size={16} />
        </button>
        <button className="hover:opacity-70 transition-opacity">
          <Trash2 className="text-red-500" size={16} />
        </button>
      </div>
    </div>
  );
};

export default HabitCardStreaksAndButtons;
