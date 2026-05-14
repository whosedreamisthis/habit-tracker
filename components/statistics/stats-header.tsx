import React from "react";
import SectionHeader from "@/components/section-header";
const StatsHeader = () => {
  return (
    <div className="flex justify-between items-center pb-5">
      <SectionHeader
        title="Statistics"
        description="Deep insights from your habit data."
      />
    </div>
  );
};

export default StatsHeader;
