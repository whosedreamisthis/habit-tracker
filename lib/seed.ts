import mongoose from "mongoose";
import { User, Habit } from "./models";
import { format, subDays } from "date-fns";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env" });

const MONGO_URI = process.env.MONGO_URI;
const TARGET_USER_ID = "user_3DsLLAbzGlHCl02OZBjd7C70yys";

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
    targetDays: 5,
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
    targetDays: 5,
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
    targetDays: 6,
    color: "#14b8a6",
    icon: "🎯",
    order: 6,
    status: "archived",
    frequency: "daily",
    _streakProb: 0.78,
  },
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI!);
    console.log("Connected to MongoDB...");

    // Clear existing data for the target user
    await User.deleteOne({ _id: TARGET_USER_ID });
    await Habit.deleteMany({ userId: TARGET_USER_ID });
    console.log("Cleared existing data for user:", TARGET_USER_ID);

    // Create user
    await User.create(mockUser);
    console.log("Created user:", mockUser.name);

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
          Math.sin(i * 9301 + habitData.name.length * 49297) * 233280;
        const rnd = seed - Math.floor(seed);

        if (rnd < p) {
          completions.push({ date: key });
        }
      }

      // Ensure some completions today for the first 4 habits to match mock behavior
      const habitIdx = baseHabits.indexOf(habitData);
      if (habitIdx < 4) {
        if (!completions.some((c) => c.date === todayKey)) {
          completions.push({ date: todayKey });
        }
      }

      const habit = new Habit({
        ...habitData,
        userId: TARGET_USER_ID,
        completions: completions,
      });

      // Simple streak calculation (approximate for seeding)
      // Real streak calculation can be done by the UI or post-seed
      await habit.save();
      console.log(
        `Created habit: ${habit.name} with ${completions.length} completions`,
      );
    }

    console.log("Seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seed();
