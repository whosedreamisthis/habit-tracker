import React from "react";
import WeeklyHeader from "@/components/weekly/weekly-header";
import WeeklySummary from "../../components/weekly/summary/WeeklySummary";

const WeeklyPage = () => {
  return (
    <section>
      <WeeklyHeader />
      <WeeklySummary />
    </section>
  );
};

export default WeeklyPage;
