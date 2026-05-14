import React from "react";
import WeeklyStatsCard from "@/components/weekly/WeeklyStatsCard";

const WeeklyStats = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <WeeklyStatsCard label="Week rate" description="32 of 49" value="65%" />
      <WeeklyStatsCard
        label="Total completions"
        description="this week"
        value="12"
      />
      <WeeklyStatsCard
        label="Best day"
        description="4 habits done"
        value="Mon"
      />
      <WeeklyStatsCard
        label="Top habit"
        description="3/7 days"
        value="💧 Drink 2L of water"
      />
    </div>
  );
};

export default WeeklyStats;
