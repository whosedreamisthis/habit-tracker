import React from "react";
import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

type StatsSummaryCardProps = {
  title: string;
  titleIcon: LucideIcon;
  titleColor: string;
  value: string;
  valueIcon: string;
  description: string;
};
const StatsSummaryCard = ({
  description,
  title,
  titleIcon: Icon,
  titleColor,
  value,
  valueIcon,
}: StatsSummaryCardProps) => {
  return (
    <Card className="bg-white dark:bg-stone-800 p-3 rounded-lg border-none flex flex-col gap-3">
      <div className="flex items-center justify-start">
        <Icon className="w-4 h-4 mr-2 text-brand-600" />
        <p className={`text-xs ${titleColor}`}>{title}</p>
      </div>
      <div className="flex items-center justify-start">
        <p className={`text-3xl`}>{valueIcon}</p>
        <div className="flex flex-col">
          <p className="font-semibold text-lg leading-tight">{value}</p>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </div>
    </Card>
  );

  // return (
  //   <Card className="bg-white p-3 rounded-lg border-none flex gap-3 flex-col">
  //     <p className="text-xs text-muted-foreground">{label}</p>
  //     <p className="text-lg font-semibold line-clamp-1">{value}</p>
  //     <p className="text-xs text-muted-foreground">{description}</p>
  //   </Card>
  // );
};

export default StatsSummaryCard;
