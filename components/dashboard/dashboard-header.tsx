import React from "react";
import SectionHeader from "../common/section-header";
import AddHabitButton from "@/components/forms/add-habit/add-habit-button";
import SuggestHabitButton from "@/components/forms/suggest-habit/suggest-habit-button";
const DashboardHeader = () => {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
  return (
    <div className="flex justify-between items-center pb-5">
      <SectionHeader title="Hey Alex 👋" description={today} />

      <div className="flex gap-1.5">
        <SuggestHabitButton />
        <AddHabitButton />
      </div>
    </div>
  );
};

export default DashboardHeader;
