"use client";

import React from "react";
import SectionHeader from "../common/section-header";
import { useUser } from "@clerk/nextjs";

const DashboardHeader = () => {
  const { user } = useUser();

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const firstName = user?.firstName || "Friend";

  return (
    <div className="flex justify-between items-center pb-5 gap-2">
      <SectionHeader title={`Hey ${firstName} 👋`} description={today} />
    </div>
  );
};

export default DashboardHeader;
