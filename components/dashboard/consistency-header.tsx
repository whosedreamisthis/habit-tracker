import React from "react";
import { getColor } from "@/lib/utils";

const ConsistencyHeader = ({
  totalCompletions,
}: {
  totalCompletions: number;
}) => {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center">
        <p className="text-md dark:text-stone-100">Consistency</p>

        <div className="flex gap-2 text-muted-foreground dark:text-stone-400 text-xs">
          <p>Less</p>
          <div className="flex gap-1">
            {[0, 1, 2, 3, 4].map((count, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-[4px] ${getColor(count)}`}
              />
            ))}
          </div>
          <p>More</p>
        </div>
      </div>
      <p className="text-xs md pb-3 text-muted-foreground dark:text-stone-400">
        {totalCompletions} completions in the last 14 weeks
      </p>
    </div>
  );
};

export default ConsistencyHeader;
