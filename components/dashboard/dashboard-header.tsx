import React from "react";
import { Sparkle, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeader from "../common/section-header";
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
        <Button className="text-black bg-white px-3 py-5">
          <Sparkle /> <span>Suggest a habit</span>
        </Button>
        <Button className="bg-linear-to-r from-brand-300 to-brand-700 px-3 py-5">
          <Plus /> <span>New Habit</span>
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
