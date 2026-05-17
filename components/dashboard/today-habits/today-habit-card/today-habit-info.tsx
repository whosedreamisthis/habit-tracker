import React from "react";
import { Badge } from "@/components/ui/badge";

type Props = {
  name: string;
  description: string;
  category: string;
};

const TodayHabitInfo = ({ name, description, category }: Props) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex flex-col  justify-start items-start">
        <div className="flex gap-2">
          <p className="line-clamp-1 text-start dark:text-stone-100">{name}</p>
          <Badge className="text-slate-900 bg-slate-200/70 dark:bg-stone-700 dark:text-stone-200">
            {category}
          </Badge>
        </div>
        <p className="text-sm text-gray-500 dark:text-stone-400">
          {description}
        </p>
      </div>
    </div>
  );
};

export default TodayHabitInfo;
