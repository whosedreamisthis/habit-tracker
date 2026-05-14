import React from "react";
import { Ellipsis, Flame, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const TodayHabitActions = () => {
  return (
    <div className="flex gap-4">
      <div className="flex gap-1 items-center">
        <Flame size={16} className="text-red-500/80" />
        <p className="text-sm">13</p>
      </div>

      <Button variant="ghost">
        <Ellipsis className="mt-2" />
      </Button>
      <div className="flex items-center bg-linear-to-r from-amber-500 to-amber-700 rounded-full p-2.5 shadow-md text-white">
        <Check strokeWidth={3} size={22} />
      </div>
    </div>
  );
};

export default TodayHabitActions;
