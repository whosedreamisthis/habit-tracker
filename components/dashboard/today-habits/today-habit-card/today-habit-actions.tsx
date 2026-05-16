import React from "react";
import { Ellipsis, Flame, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const TodayHabitActions = ({
  completed,
  activeStreak,
}: {
  completed: boolean;
  activeStreak: number;
}) => {
  return (
    <div className="flex gap-4">
      <div className="flex gap-0.5 items-center">
        <Flame size={16} className="text-red-500/80" />
        <p className="text-sm">{activeStreak}</p>
      </div>

      <Button variant="ghost">
        <Ellipsis className="mt-2" />
      </Button>
      <div
        className={`flex items-center bg-linear-to-r ${completed ? "from-amber-500 to-amber-700 text-white shadow-md" : "bg-amber-200/50 text-amber-500/60 border-amber-500/60 border-2"}  rounded-full p-2.5  `}
      >
        <Check strokeWidth={3} size={22} />
      </div>
    </div>
  );
};

export default TodayHabitActions;
