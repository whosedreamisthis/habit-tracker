import React from "react";
import { Card } from "@/components/ui/card";

type WeeklyStatsCardProps = {
  description: string;
  label: string;
  value: string;
  className?: string;
};
const SummaryCard = ({
  description,
  label,
  value,
  className,
}: WeeklyStatsCardProps) => {
  return (
    <Card className="bg-white dark:bg-stone-800 p-3 rounded-lg border-none flex gap-3 flex-col">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className={`text-2xl font-semibold line-clamp-1 ${className}`}>
        {value}
      </p>
      <p className="text-xs text-muted-foreground">{description}</p>
    </Card>
  );
};

export default SummaryCard;
