import React from "react";
import SectionHeader from "../helpers/section-header";
import { format, startOfWeek, endOfWeek } from "date-fns";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";

const InsightsHeader = () => {
  const start = startOfWeek(new Date(), { weekStartsOn: 1 });
  const end = endOfWeek(new Date(), { weekStartsOn: 1 });

  const range = `${format(start, "MMM d")} — ${format(end, "MMM d, yyyy")}`;

  return (
    <div className="flex justify-between items-center pb-5">
      <SectionHeader title="Weekly insights" description={range} />

      <Button className="flex gap-1.5 py-5 bg-white text-black">
        <RefreshCcw />
        <p>Regenerate report</p>
      </Button>
    </div>
  );
};

export default InsightsHeader;
