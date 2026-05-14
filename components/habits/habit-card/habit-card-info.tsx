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
    <div className="flex flex-col justify-start">
      <div className="flex flex-col sm:flex-row gap-2 justify-start items-start">
        <p className="line-clamp-1 text-start">{name}</p>
        <div className="flex gap-2 items-center justify-start">
          <Badge className="text-slate-900 bg-slate-200/70">{category}</Badge>
          <Badge className="text-slate-900 bg-slate-200/70">{frequency}</Badge>
        </div>
      </div>
      <p className="text-sm text-gray-500 py-2">{description}</p>
    </div>
  );
};

export default HabitCardInfo;
