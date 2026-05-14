import React from "react";
import InsightsHeader from "@/components/insights/insights-header";
import CompletionChart from "@/components/common/completion-chart";

const InsightsPage = () => {
  return (
    <section>
      <InsightsHeader />
      <CompletionChart title="Completions by day" />
    </section>
  );
};

export default InsightsPage;
