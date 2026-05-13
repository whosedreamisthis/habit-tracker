import React from "react";
import { SUMMARY } from "@/lib/constants";
import SummaryCard from "./summary-card";

const Summary = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 justify-between gap-3 mx-auto w-full">
      {SUMMARY.map((item, index) => (
        <SummaryCard key={index} {...item} />
      ))}
    </div>
  );
};

export default Summary;
