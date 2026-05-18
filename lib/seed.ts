import mongoose from "mongoose";
import { User, Habit } from "./models";
import { format, subDays, parseISO } from "date-fns";
import * as dotenv from "dotenv";
import { DEMO_USER_ID } from "./constants";

dotenv.config({ path: ".env" });

const MONGO_URI = process.env.MONGO_URI;
const TARGET_USER_ID =
  process.env.NEXT_PUBLIC_CLERK_TARGET_USER_ID ||
  "user_3DsLLAbzGlHCl02OZBjd7C70yys";

if (!MONGO_URI) {
  console.error("Please define the MONGO_URI environment variable inside .env");
  process.exit(1);
}

const mockUser = {
  _id: TARGET_USER_ID,
  name: "Alex Rivera",
  email: "alex@example.com",
  avatar: "A",
  morningMotivation: true,
};

const demoUser = {
  _id: DEMO_USER_ID,
  name: "Demo User",
  email: "demo@example.com",
  avatar: "D",
  morningMotivation: true,
};

const baseHabits = [
  {
    name: "Drink 2L of water",
    description: "Stay hydrated throughout the day.",
    category: "health",
    color: "#0ea5e9",
    icon: "💧",
    order: 0,
    status: "active",
    targetDays: 7,
    frequency: "daily",
    _streakProb: 0.95,
  },
  {
    name: "Morning run",
    description: "30-minute run before breakfast.",
    category: "fitness",
    targetDays: 7,
    color: "#ef4444",
    icon: "🏃",
    order: 1,
    status: "active",
    frequency: "daily",
    _streakProb: 0.7,
  },
  {
    name: "Read 20 minutes",
    description: "Fiction or non-fiction, no phone.",
    category: "learning",
    color: "#6366f1",
    icon: "📚",
    order: 2,
    status: "active",
    targetDays: 7,
    frequency: "daily",
    _streakProb: 0.82,
  },
  {
    name: "Meditate",
    description: "10 minutes of breath-focused meditation.",
    category: "mindfulness",
    color: "#8b5cf6",
    icon: "🧘",
    order: 3,
    status: "archived",
    targetDays: 7,
    frequency: "daily",
    _streakProb: 0.6,
  },
  {
    name: "Journal",
    description: "Write 3 things I'm grateful for.",
    category: "mindfulness",
    targetDays: 7,
    color: "#ec4899",
    icon: "✍️",
    order: 4,
    status: "active",
    frequency: "daily",
    _streakProb: 0.75,
  },
  {
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
  },
  {
    name: "Side project — 1hr",
    description: "Ship something small every day.",
    category: "productivity",
    targetDays: 7,
    color: "#14b8a6",
    icon: "🎯",
    order: 6,
    status: "archived",
    frequency: "daily",
    _streakProb: 0.78,
  },
];

// --- UTILITY: Calculate Streaks (copied from actions.ts for seeding) ---
const calculateStreaks = (
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

    let activeWeeklyStreak = 0;
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

async function seedForUser(userId: string, userObj: any) {
  // Clear existing data for the user
  await User.deleteOne({ _id: userId });
  await Habit.deleteMany({ userId });
  console.log("Cleared existing data for user:", userId);

  // Create user
  await User.create(userObj);
  console.log("Created user:", userObj.name);

  const today = new Date();
  const todayKey = format(today, "yyyy-MM-dd");

  // Create habits with completions
  for (const habitData of baseHabits) {
    const completions = [];

    // Generate completions for the past 90 days
    for (let i = 0; i < 90; i++) {
      const d = subDays(today, i);
      const key = format(d, "yyyy-MM-dd");
      let p = habitData._streakProb;

      // Boost probability for the last 14 days
      if (i < 14) p = Math.max(p, 0.85);

      const seed =
        Math.sin(i * 9301 + habitData.name.length * 49297 + userId.length) *
        233280;
      const rnd = seed - Math.floor(seed);

      if (rnd < p) {
        completions.push({ date: key });
      }
    }

    // Ensure some completions today for the first 4 habits
    const habitIdx = baseHabits.indexOf(habitData);
    if (habitIdx < 4) {
      if (!completions.some((c) => c.date === todayKey)) {
        completions.push({ date: todayKey });
      }
    }

    // Calculate streaks
    const { activeStreak, bestStreak } = calculateStreaks(
      completions,
      habitData.targetDays,
    );

    const habit = new Habit({
      ...habitData,
      userId: userId,
      completions: completions,
      activeStreak,
      bestStreak,
      isCompletedToday: completions.some((c) => c.date === todayKey),
    });

    await habit.save();
    console.log(
      `User ${userId} - Created habit: ${habit.name} with ${completions.length} completions. Streak: ${activeStreak}/${bestStreak}`,
    );
  }
}

async function seed() {
  try {
    await mongoose.connect(MONGO_URI!);
    console.log("Connected to MongoDB...");

    // Seed target user
    await seedForUser(TARGET_USER_ID, mockUser);

    // Seed demo user
    await seedForUser(DEMO_USER_ID, demoUser);

    console.log("Seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seed();
