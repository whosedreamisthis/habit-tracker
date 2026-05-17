import React from "react";
import { Sparkles } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";

const WeeklyReportHeader = ({ onRegenerate }: { onRegenerate: () => void }) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-3">
        <div className="bg-linear-to-r from-brand-300 to-brand-700 h-10 w-10 flex items-center justify-center rounded-lg">
          <Sparkles className="text-white z-10 h-5 w-5" />
        </div>
        <div className="flex flex-col">
          <p className="font-semibold">AI Weekly Report</p>
          <p className="text-xs text-muted-foreground">
            {`Generated ${format(new Date(), "M/d/yyyy, h:mm:ss a")}`}
          </p>
        </div>
      </div>
      <Button
        className="px-4 py-4 bg-linear-to-r from-brand-300 to-brand-700"
        onClick={onRegenerate}
      >
        Regenerate report
      </Button>
    </div>
  );
};

export default WeeklyReportHeader;
