import React from "react";
import SectionHeader from "@/components/section-header";
const HabitsHeader = () => {
  return (
    <div className="flex justify-between items-center pb-5">
      <SectionHeader
        title="Weekly overview"
        description="See every habit across all 7 days at a glance."
      />

      <div className="flex gap-1.5">right side of header</div>
    </div>
  );
};

export default HabitsHeader;
