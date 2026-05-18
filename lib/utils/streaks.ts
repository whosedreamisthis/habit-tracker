import { format, parseISO } from "date-fns";

export const calculateStreaks = (
  completions: { date: string | Date }[],
  targetDays: number = 7,
) => {
  const completedDates = completions
    .map((c) =>
      typeof c.date === "string" ? c.date : format(c.date, "yyyy-MM-dd"),
    )
    .sort();

  if (completedDates.length === 0) return { activeStreak: 0, bestStreak: 0 };

  if (targetDays === 7) {
    let currentStreak = 0;
    let bestStreak = 0;
    let activeStreak = 0;
    const maxGap = 1;

    for (let i = 0; i < completedDates.length; i++) {
      if (i === 0) {
        currentStreak = 1;
      } else {
        const prevDate = parseISO(completedDates[i - 1]);
        const currDate = parseISO(completedDates[i]);
        const diffTime = Math.abs(currDate.getTime() - prevDate.getTime());
        const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays <= maxGap) {
          currentStreak++;
        } else {
          if (currentStreak > bestStreak) bestStreak = currentStreak;
          currentStreak = 1;
        }
      }
    }
    if (currentStreak > bestStreak) bestStreak = currentStreak;

    const lastCompletion = parseISO(completedDates[completedDates.length - 1]);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - lastCompletion.getTime());
    const diffDaysFromToday = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDaysFromToday <= maxGap) {
      activeStreak = currentStreak;
    }

    return { activeStreak, bestStreak };
  } else {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const diffToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    const currentWeekMonday = new Date(today);
    currentWeekMonday.setDate(today.getDate() - diffToMonday);
    currentWeekMonday.setHours(0, 0, 0, 0);

    const completionsByWeek: Record<string, number> = {};
    completedDates.forEach((dateStr) => {
      const date = parseISO(dateStr);
      const dOW = date.getDay();
      const dTM = dOW === 0 ? 6 : dOW - 1;
      const monday = new Date(date);
      monday.setDate(date.getDate() - dTM);
      monday.setHours(0, 0, 0, 0);
      const weekKey = format(monday, "yyyy-MM-dd");
      completionsByWeek[weekKey] = (completionsByWeek[weekKey] || 0) + 1;
    });

    const sortedWeeks = Object.keys(completionsByWeek).sort();
    if (sortedWeeks.length === 0) return { activeStreak: 0, bestStreak: 0 };

    let currentWeeklyStreak = 0;
    let bestWeeklyStreak = 0;
    let activeWeeklyStreak = 0;

    const firstWeek = parseISO(sortedWeeks[0]);
    const weeks: string[] = [];
    const iterWeek = new Date(firstWeek);
    while (iterWeek <= currentWeekMonday) {
      weeks.push(format(iterWeek, "yyyy-MM-dd"));
      iterWeek.setDate(iterWeek.getDate() + 7);
    }

    for (const weekKey of weeks) {
      const count = completionsByWeek[weekKey] || 0;
      if (count >= targetDays) {
        currentWeeklyStreak++;
      } else {
        if (weekKey !== format(currentWeekMonday, "yyyy-MM-dd")) {
          if (currentWeeklyStreak > bestWeeklyStreak)
            bestWeeklyStreak = currentWeeklyStreak;
          currentWeeklyStreak = 0;
        }
      }
    }
    if (currentWeeklyStreak > bestWeeklyStreak)
      bestWeeklyStreak = currentWeeklyStreak;

    const currentWeekKey = format(currentWeekMonday, "yyyy-MM-dd");
    const lastWeekMonday = new Date(currentWeekMonday);
    lastWeekMonday.setDate(lastWeekMonday.getDate() - 7);
    const lastWeekKey = format(lastWeekMonday, "yyyy-MM-dd");

    if ((completionsByWeek[currentWeekKey] || 0) >= targetDays) {
      activeWeeklyStreak = currentWeeklyStreak;
    } else {
      if ((completionsByWeek[lastWeekKey] || 0) >= targetDays) {
        activeWeeklyStreak = currentWeeklyStreak;
      } else {
        activeWeeklyStreak = 0;
      }
    }

    return { activeStreak: activeWeeklyStreak, bestStreak: bestWeeklyStreak };
  }
};
