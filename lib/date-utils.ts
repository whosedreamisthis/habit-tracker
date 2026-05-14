// Helper to get labels: Mon, Tue, etc.
const getDayName = (date: Date) =>
  date.toLocaleDateString("en-US", { weekday: "short" });

// OPTION A: Current Week (Monday to Sunday)
export const getThisWeekData = (completions: any[]) => {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const diffToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  const monday = new Date(now);
  monday.setDate(now.getDate() - diffToMonday);

  return Array.from({ length: 7 }).map((_, i) => {
    const day = new Date(monday);
    day.setDate(monday.getDate() + i);
    const name = getDayName(day);
    // Filter your DB completions for this specific date here
    return { name, completions: 4 };
  });
};

// OPTION B: Last 7 Days (Rolling)
export const getLast7DaysData = (completions: any[]) => {
  return Array.from({ length: 7 }).map((_, i) => {
    const day = new Date();
    day.setDate(day.getDate() - (6 - i)); // Go back 6 days and come forward
    const name = getDayName(day);
    return { name, completions: 3 };
  });
};
