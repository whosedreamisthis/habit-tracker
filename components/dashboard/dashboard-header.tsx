"use client";

import React, { useEffect, useState } from "react";
import SectionHeader from "../common/section-header";
import { useUser } from "@clerk/nextjs";

const DashboardHeader = () => {
  const { user, isLoaded } = useUser();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  let firstName = "Friend";
  if (isLoaded && user) {
    firstName = user.firstName || "Friend";
  } else if (
    typeof document !== "undefined" &&
    document.cookie.includes("demo_mode=true")
  ) {
    firstName = "Friend";
  }

  return (
    <div className="flex justify-between items-center pb-5 gap-2">
      <SectionHeader
        title={`Hey ${firstName} 👋`}
        description={mounted ? today : ""}
      />
    </div>
  );
};

export default DashboardHeader;
