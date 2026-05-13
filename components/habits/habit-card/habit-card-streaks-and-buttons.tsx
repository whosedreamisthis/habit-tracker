import { Trophy, Flame, Pencil, Trash2, Archive } from "lucide-react";

const HabitCardStreaksAndButtons = () => {
  return (
    <div className="flex gap-4 items-center justify-end ">
      <div className="flex items-center gap-1">
        <Flame size={14} className="text-brand-600" />
        <p className="text-sm">13</p>
      </div>
      <div className="flex items-center gap-1">
        <Trophy size={14} className="text-brand-600" />
        <p className="text-sm">58</p>
      </div>
      <div className="text-muted-foreground text-xs">88 total</div>
      <Pencil className="text-slate-600" size={16} />
      <Archive className="text-slate-600" size={16} />
      <Trash2 size={16} className="text-red-500" />
    </div>
  );
};

export default HabitCardStreaksAndButtons;
