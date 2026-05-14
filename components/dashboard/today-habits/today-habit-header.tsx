import React from "react";
import CircularProgress from "./circular-progress";

const TodayHabitHeader = () => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-md">Today&apos;s habits</p>
        <p className="text-sm text-muted-foreground">4 of 7 complete</p>
      </div>
      <CircularProgress percentage={30} size={55} strokeWidth={6} />{" "}
    </div>
  );
};

export default TodayHabitHeader;
