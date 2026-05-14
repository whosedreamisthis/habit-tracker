import React from "react";
import { Flame, Trophy, Target } from "lucide-react";

const StatsHabitCardStreaks = () => {
  return (
    <div className="flex items-center gap-4">
      <div className="flex gap-1 items-center">
        <Flame className="w-5 h-5 text-brand-600 pb-1" />
        <p className="text-sm">1</p>
      </div>
      <div className="flex gap-1 items-center">
        <Trophy className="w-5 h-5 text-brand-600 pb-1" />
        <p className="text-sm">{16}</p>
      </div>

      <div className="flex gap-1 items-center">
        <Target className="w-5 h-5 text-brand-600 pb-1" />
        <p className="text-sm">1</p>
      </div>
    </div>
  );
};

export default StatsHabitCardStreaks;
