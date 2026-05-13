import { Badge } from "@/components/ui/badge";

interface Props {
  description: string;
  name: string;
  frequency: string;
  targetDays: number;
  isArchived: boolean;
  category: string;
  order: number;
}

const HabitCardInfo = ({ description, name, frequency, category }: Props) => {
  return (
    <div className="flex flex-col">
      <div className="flex gap-2 items-center">
        <p>{name}</p>
        <Badge className="text-slate-900 bg-slate-200/70">{category}</Badge>
        <Badge className="text-slate-900 bg-slate-200/70">{frequency}</Badge>
      </div>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  );
};

export default HabitCardInfo;
