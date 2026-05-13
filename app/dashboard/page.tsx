import React from "react";
import Summary from "@/components/dashboard/summary/summary";
import DashboardHeader from "@/components/dashboard/dashboard-header";

const DashboardPage = () => {
  return (
    <section>
      <DashboardHeader />
      <Summary />
    </section>
  );
};

export default DashboardPage;
