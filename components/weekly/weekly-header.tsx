import React from "react";
import SectionHeader from "../common/section-header";
import WeekPicker from "./week-picker";

const HabitsHeader = () => {
  return (
    <div className="flex xs:flex-row justify-center xs:justify-between items-center pb-5 flex-wrap">
      <SectionHeader
        title="Weekly overview"
        description="See every habit across all 7 days at a glance."
      />

      <div className="shrink-0">
        <WeekPicker />
      </div>
    </div>
  );
};

export default HabitsHeader;
