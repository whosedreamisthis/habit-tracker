import React from "react";
import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

type Props = {
  description: string;
  label: string;
  children?: React.ReactNode;
  icon?: LucideIcon;
};
const InsightsSummaryCard = ({
  description,
  label,
  children,
  icon: Icon,
}: Props) => {
  return (
    <Card className="bg-white px-3 rounded-lg border-none flex flex-col">
      <div className="flex items-center">
        {Icon && <Icon className="mr-2 text-muted-foreground" size={15} />}
        <p className="text-xs text-muted-foreground">{label}</p>
      </div>
      <div className="-mt-3 -mb-3">{children}</div>
      <p className="text-xs text-muted-foreground">{description}</p>
    </Card>
  );
};

export default InsightsSummaryCard;
