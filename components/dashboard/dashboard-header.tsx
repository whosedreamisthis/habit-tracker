import React from "react";
import SectionHeader from "../common/section-header";

type DashboardHeaderProps = {
  firstName?: string;
};

const DashboardHeader = ({ firstName = "Friend" }: DashboardHeaderProps) => {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex justify-between items-center pb-5 gap-2">
      <SectionHeader title={`Hey ${firstName} 👋`} description={today} />
    </div>
  );
};

export default DashboardHeader;
