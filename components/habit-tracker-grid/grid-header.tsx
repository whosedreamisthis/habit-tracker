export const getDaysOfCurrentWeek = () => {
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0 (Sun) to 6 (Sat)

  // Calculate how many days to subtract to get to Monday
  // In JS, if today is Sunday (0), we need to go back 6 days.
  // Otherwise, we go back (dayOfWeek - 1) days.
  const diffToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

  const monday = new Date(now);
  monday.setDate(now.getDate() - diffToMonday);

  const days = [];
  for (let i = 0; i < 7; i++) {
    const day = new Date(monday);
    day.setDate(monday.getDate() + i);
    days.push({
      label: day.toLocaleDateString("en-US", { weekday: "short" }), // "Mon"
      date: day.getDate(), // 11
    });
  }
  return days;
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
