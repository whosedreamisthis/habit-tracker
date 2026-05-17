import React from "react";
import WeeklyReportHeader from "@/components/weekly/weekly-report-header";

const WeeklyReports = () => {
  return (
    <div className="flex flex-col gap-5 bg-white dark:bg-stone-800 p-5 rounded-lg">
      <WeeklyReportHeader />
      <p className="text-muted-foreground">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad alias
        aliquid aperiam aspernatur consequatur dolores error ex illo ipsam
        minima nulla obcaecati odit perferendis perspiciatis quas repudiandae,
        totam ullam vero.
      </p>
    </div>
  );
};

export default WeeklyReports;
