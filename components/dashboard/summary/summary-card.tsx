import React from "react";
import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

type SummaryCardProps = {
  icon: LucideIcon;
  iconFg: string;
  iconBg: string;
  label: string;
  value: string | number;
};
const SummaryCard = ({
  icon: Icon,
  iconFg,
  iconBg,
  label,
  value,
}: SummaryCardProps) => {
  return (
    <Card className="bg-white p-3 rounded-lg border-none">
      <div className="flex gap-3 justify-center items-center">
        <div
          className={`flex items-center justify-center w-10 h-10 rounded-md shrink-0`}
          style={{ backgroundColor: iconBg, color: iconFg }}
        >
          <Icon />
        </div>
        <div className="flex flex-col justify-start items-start">
          <p className="text-xs`">{label}</p>
          <p className="text-xl font-semibold">{value}</p>
        </div>
      </div>
    </Card>
  );
};

export default SummaryCard;
