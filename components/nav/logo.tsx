import React from "react";
import { Sparkles } from "lucide-react";

const Logo = () => {
  return (
    <div className="bg-white  flex items-center gap-3 justify-start py-6 px-6">
      <div className="h-10 w-10 rounded-md flex items-center justify-center bg-brand-600">
        <Sparkles className="text-white" />
      </div>

      <span className="text-xl font-bold">Habit Tracker</span>
    </div>
  );
};

export default Logo;
