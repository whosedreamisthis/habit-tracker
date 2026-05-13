import React from "react";
import { Sparkles } from "lucide-react";

const Logo = () => {
  return (
    <div className="flex items-center gap-3 justify-center p-6">
      <div className="bg-brand-500 h-10 w-10 rounded-full flex items-center justify-center">
        <Sparkles />
      </div>

      <span className="text-xl font-bold">Habit Tracker</span>
    </div>
  );
};

export default Logo;
