import React from "react";
import StatsSummaryCard from "./stats-summary-card";
import { Flame, Trophy, TrendingDown } from "lucide-react";
const Summary = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-between gap-3 mx-auto w-full">
      <StatsSummaryCard
        description="13 days running"
        valueIcon="💧"
        value="Drink 2L of water"
        title="BEST STREAK"
        titleIcon={Flame}
        titleColor="text-emerald-600"
      />
      <StatsSummaryCard
        description="16 day reconrd"
        valueIcon="💧"
        value="Drink 2L of water"
        title="LONGEST EVER"
        titleIcon={Trophy}
        titleColor="text-amber-600"
      />
      <StatsSummaryCard
        description="13/30 in the last 30 days"
        valueIcon="💪"
        value="Strength training"
        title="NEEDS ATTENTION"
        titleIcon={TrendingDown}
        titleColor="text-rose-600"
      />
    </div>
  );
};

export default Summary;
