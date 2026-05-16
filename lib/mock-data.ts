// ────────────────────────────────────────────────────────────────────────────
// Mock data for the UI boilerplate.
// ────────────────────────────────────────────────────────────────────────────
import { format, subDays, parseISO, isSameDay } from "date-fns";

const todayKey = () => format(new Date(), "yyyy-MM-dd");

export const mockUser = {
  _id: "u_alex",
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
  isArchived: false,
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
    _pattern: "weekdays",
    _brokeAt: 20,
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
    _pattern: "dropoff",
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
    _pattern: "weekdays",
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
      const dow = d.getDay();
      const key = format(d, "yyyy-MM-dd");
      let p = h._streakProb;
      if (h._pattern === "weekdays" && (dow === 0 || dow === 6)) p *= 0.35;
      if (h._pattern === "dropoff" && i < 14) p *= 0.25;
      if (h._brokeAt && i >= h._brokeAt - 2 && i <= h._brokeAt + 2) continue;

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
const calculateStreaks = (habitId: string, logs: typeof mockLogs) => {
  // Extract completion dates for this habit, sorted from oldest to newest
  const completedDates = logs
    .filter((l) => l.habitId === habitId)
    .map((l) => l.completedDate)
    .sort();

  if (completedDates.length === 0) return { activeStreak: 0, bestStreak: 0 };

  let currentStreak = 0;
  let bestStreak = 0;
  let activeStreak = 0;

  const todayStr = todayKey();
  const yesterdayStr = format(subDays(new Date(), 1), "yyyy-MM-dd");

  // Track continuity step-by-step
  for (let i = 0; i < completedDates.length; i++) {
    if (i === 0) {
      currentStreak = 1;
    } else {
      const prevDate = parseISO(completedDates[i - 1]);
      const currDate = parseISO(completedDates[i]);
      // If the difference between consecutive records is exactly 1 day, advance the streak
      const diffTime = Math.abs(currDate.getTime() - prevDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        currentStreak++;
      } else if (diffDays > 1) {
        // Streak broke, log the max record achieved so far and reset counter
        if (currentStreak > bestStreak) bestStreak = currentStreak;
        currentStreak = 1;
      }
    }
  }
  if (currentStreak > bestStreak) bestStreak = currentStreak;

  // Verify if the streak is still alive (must have a entry recorded today or yesterday)
  const hasCompletedRecently =
    completedDates.includes(todayStr) || completedDates.includes(yesterdayStr);
  if (hasCompletedRecently) {
    activeStreak = currentStreak;
  }

  return { activeStreak, bestStreak };
};

// 3. Process records to append calculations down into the target interface array
export const mockHabits = baseHabits.map((h) => {
  const { activeStreak, bestStreak } = calculateStreaks(h._id, mockLogs);
  return {
    ...h,
    activeStreak,
    bestStreak,
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
