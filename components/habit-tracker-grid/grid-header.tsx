import { format, startOfWeek, addDays } from "date-fns";

export const getDaysOfCurrentWeek = () => {
  const start = startOfWeek(new Date(), { weekStartsOn: 1 });
  return Array.from({ length: 7 }).map((_, i) => {
    const d = addDays(start, i);
    return {
      label: format(d, "EEE"), // "Mon"
      date: d.getDate(), // 11
    };
  });
};

const GridHeader = () => {
  const weekDays = getDaysOfCurrentWeek();

  return (
    /* Use a grid with a fixed width for the 'day' columns (e.g., 40px) */
    <div className="grid grid-cols-[1fr_repeat(7,40px)] gap-2 items-end">
      <p className="text-xs font-semibold uppercase text-slate-400 pb-1 tracking-wider">
        habit
      </p>
      {weekDays.map((day, index) => (
        <div key={index} className="flex flex-col items-center text-slate-500">
          <p className="text-[10px] uppercase font-medium">{day.label}</p>
          <p className="text-sm text-muted-foreground">{day.date}</p>
        </div>
      ))}
    </div>
  );
};

export default GridHeader;
