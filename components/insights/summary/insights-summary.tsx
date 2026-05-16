import React from "react";
import InsightsSummaryCard from "./insights-summary-card";
import { Activity, TrendingUp, CalendarRange, Trophy } from "lucide-react";

const InsightsSummary = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <InsightsSummaryCard
        label="Completions"
        icon={Activity}
        description="vs last week"
      >
        <p className="text-2xl font-medium">18</p>
      </InsightsSummaryCard>
      <InsightsSummaryCard
        label="Completion rate"
        description="this week"
        icon={TrendingUp}
      >
        <p className="text-2xl font-medium">37%</p>
      </InsightsSummaryCard>
      <InsightsSummaryCard
        label="Best day"
        description="4 habits"
        icon={CalendarRange}
      >
        <p className="text-2xl font-medium">Mon</p>
      </InsightsSummaryCard>
      <InsightsSummaryCard
        label="Top habit"
        description="3/7 this week"
        icon={Trophy}
      >
        <p className="text-md font-medium line-clamp-1">🏃 Morning run</p>
      </InsightsSummaryCard>
    </div>
  );
};

export default InsightsSummary;
