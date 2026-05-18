// ────────────────────────────────────────────────────────────────────────────
// Mock data for the UI boilerplate.
// ────────────────────────────────────────────────────────────────────────────
import { format, subDays, parseISO } from "date-fns";

const todayKey = () => format(new Date(), "yyyy-MM-dd");

export const mockUser = {
  _id: "user_3DsLLAbzGlHCl02OZBjd7C70yys",
  name: "Alex Rivera",
  email: "alex@example.com",
  avatar: "A",
  morningMotivation: true,
};

let nextHabitId = 1;
const habit = (overrides: any) => ({
  _id: `h_${nextHabitId++}`,
  userId: mockUser._id,
  description: "",
  frequency: "daily",
  targetDays: 7,
  order: nextHabitId,
  createdAt: subDays(new Date(), 89).toISOString(),
  updatedAt: subDays(new Date(), 89).toISOString(),
  ...overrides,
});

// Base configuration blueprints
const baseHabits = [
  habit({
    name: "Drink 2L of water",
    description: "Stay hydrated throughout the day.",
    category: "health",
    color: "#0ea5e9",
    icon: "💧",
    order: 0,
    status: "active",
    _streakProb: 0.95,
  }),
  habit({
    name: "Morning run",
    description: "30-minute run before breakfast.",
    category: "fitness",
    targetDays: 5,
    color: "#ef4444",
    icon: "🏃",
    order: 1,
    status: "active",
    _streakProb: 0.7,
  }),
  habit({
    name: "Read 20 minutes",
    description: "Fiction or non-fiction, no phone.",
    category: "learning",
    color: "#6366f1",
    icon: "📚",
    order: 2,
    status: "active",
    _streakProb: 0.82,
  }),
  habit({
    name: "Meditate",
    description: "10 minutes of breath-focused meditation.",
    category: "mindfulness",
    color: "#8b5cf6",
    icon: "🧘",
    order: 3,
    status: "archived",
    _streakProb: 0.6,
  }),
  habit({
    name: "Journal",
    description: "Write 3 things I'm grateful for.",
    category: "mindfulness",
    targetDays: 5,
    color: "#ec4899",
    icon: "✍️",
    order: 4,
    status: "active",
    _streakProb: 0.75,
  }),
  habit({
    name: "Strength training",
    description: "Push/pull/legs split.",
    category: "fitness",
    frequency: "weekly",
    targetDays: 3,
    color: "#f59e0b",
    icon: "💪",
    order: 5,
    status: "active",
    _streakProb: 0.55,
  }),
  habit({
    name: "Side project — 1hr",
    description: "Ship something small every day.",
    category: "productivity",
    targetDays: 6,
    color: "#14b8a6",
    icon: "🎯",
    order: 6,
    status: "archived",
    _streakProb: 0.78,
  }),
];

// 1. Generate deterministic logs over the last 90 days
const buildLogs = () => {
  const logs = [];
  const today = new Date();
  for (const h of baseHabits) {
    for (let i = 0; i < 90; i++) {
      const d = subDays(today, i);
      const key = format(d, "yyyy-MM-dd");
      let p = h._streakProb;

      // Boost probability for the last 14 days to ensure the user has data to look at
      if (i < 14) p = Math.max(p, 0.85);

      if (h._pattern === "dropoff" && i < 14) p *= 0.25;

      if (p > 0) {
        const seed = Math.sin(i * 9301 + h.name.length * 49297) * 233280;
        const rnd = seed - Math.floor(seed);
        if (rnd < p) {
          logs.push({
            _id: `l_${h._id}_${key}`,
            userId: mockUser._id,
            habitId: h._id,
            completedDate: key,
          });
        }
      }
    }
  }

  const today_ = todayKey();
  for (let i = 0; i < 4; i++) {
    const h = baseHabits[i];
    if (!logs.some((l) => l.habitId === h._id && l.completedDate === today_)) {
      logs.push({
        _id: `l_${h._id}_${today_}`,
        userId: mockUser._id,
        habitId: h._id,
        completedDate: today_,
      });
    }
  }
  return logs;
};

export const mockLogs = buildLogs();

// 2. STREAK CALCULATOR ENGINE: Scans chronological logs to extract streaks
const calculateStreaks = (
  habitId: string,
  logs: typeof mockLogs,
  targetDays: number = 7,
) => {
  const completedDates = logs
    .filter((l) => l.habitId === habitId)
    .map((l) => l.completedDate)
    .sort();

  if (completedDates.length === 0) return { activeStreak: 0, bestStreak: 0 };

  // If targetDays is 7, we use the daily streak logic
  if (targetDays === 7) {
    let currentStreak = 0;
    let bestStreak = 0;
    let activeStreak = 0;

    const maxGap = 1; // For daily, gap must be 1 day

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
    // WEEKLY STREAK LOGIC for habits with targetDays < 7
    // A streak is defined by consecutive weeks meeting the targetDays requirement.
    const today = new Date();
    // Get start of current week (Monday)
    const dayOfWeek = today.getDay();
    const diffToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    const currentWeekMonday = new Date(today);
    currentWeekMonday.setDate(today.getDate() - diffToMonday);
    currentWeekMonday.setHours(0, 0, 0, 0);

    // Group completions by week (using Monday as start)
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

    // Get all week keys in order
    const sortedWeeks = Object.keys(completionsByWeek).sort();
    if (sortedWeeks.length === 0) return { activeStreak: 0, bestStreak: 0 };

    let currentWeeklyStreak = 0;
    let bestWeeklyStreak = 0;
    let activeWeeklyStreak = 0;

    // To find streaks, we need to consider all weeks from the first completion to now
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
        // If it's the current week and we haven't hit the target yet,
        // we don't break the active streak yet, but we don't increment it either.
        if (weekKey === format(currentWeekMonday, "yyyy-MM-dd")) {
          // Current week hasn't failed yet until it's over
        } else {
          if (currentWeeklyStreak > bestWeeklyStreak)
            bestWeeklyStreak = currentWeeklyStreak;
          currentWeeklyStreak = 0;
        }
      }
    }
    if (currentWeeklyStreak > bestWeeklyStreak)
      bestWeeklyStreak = currentWeeklyStreak;

    // Active streak: if current week met target, or if last week met target and current week is ongoing
    const currentWeekKey = format(currentWeekMonday, "yyyy-MM-dd");
    const lastWeekMonday = new Date(currentWeekMonday);
    lastWeekMonday.setDate(lastWeekMonday.getDate() - 7);
    const lastWeekKey = format(lastWeekMonday, "yyyy-MM-dd");

    if ((completionsByWeek[currentWeekKey] || 0) >= targetDays) {
      activeWeeklyStreak = currentWeeklyStreak;
    } else {
      // Check if current week is still "alive" (last week was successful)
      if ((completionsByWeek[lastWeekKey] || 0) >= targetDays) {
        activeWeeklyStreak = currentWeeklyStreak;
      } else {
        activeWeeklyStreak = 0;
      }
    }

    return { activeStreak: activeWeeklyStreak, bestStreak: bestWeeklyStreak };
  }
};

// 3. Process records to append calculations down into the target interface array
export const mockHabits = baseHabits.map((h) => {
  const { activeStreak, bestStreak } = calculateStreaks(
    h._id,
    mockLogs,
    h.targetDays,
  );
  const completions = mockLogs
    .filter((l) => l.habitId === h._id)
    .map((l) => ({
      _id: l._id,
      date: l.completedDate,
    }));

  const todayStr = todayKey();
  const isCompletedToday = completions.some((c) => c.date === todayStr);

  return {
    ...h,
    activeStreak,
    bestStreak,
    completions,
    isCompletedToday,
  };
});

// ─── AI sample responses ──────────────────────────────────────────────────
export const mockAI = {
  weeklyReport: `Big week for hydration — you hit **Drink 2L of water** every single day, which is a real anchor habit forming.`,
  recovery: `You had a great run with **Morning run** — 14 days at one point. Broken streaks are part of the journey, not the end of it.`,
  morning: `Good morning, Alex! You're sitting on a **12-day water streak** — keep that going, it's the easiest win of your day. 💧 One small nudge: your **journal** habit needs a few minutes today to keep momentum. You've got this.`,
  chat: {
    default:
      "Hi — ask me anything about your habit data. I have your last 30 days loaded as context.",
    "Which day of the week am I most consistent?":
      "Looking at the past 30 days, **Monday** is your strongest day...",
    "What is my best performing category?":
      "**Health** is your top category with 52 completions...",
    "Why do I keep failing my exercise habit?":
      "Your **Morning run** habit is at 19/30 in the last 30 days...",
  },
  suggestions: [
    {
      name: "5-minute morning stretch",
      description: "Loosen up...",
      frequency: "daily",
      category: "health",
      icon: "🧘",
      reason: "Pairs naturally...",
    },
  ],
};
