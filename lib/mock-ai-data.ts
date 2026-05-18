import { Habit } from "./types";

export const MOCK_MORNING_MOTIVATIONS = [
  "Small wins every day lead to massive results over time. Keep going!",
  "Your future self will thank you for the habits you build today.",
  "Discipline is choosing between what you want now and what you want most.",
  "Success is the sum of small efforts, repeated day in and day out.",
  "The secret of your future is hidden in your daily routine.",
  "Don't stop until you're proud of the progress you've made.",
  "Focus on progress, not perfection. Every step forward counts!",
];

export const MOCK_WEEKLY_REPORT = `
Great job this week! You've shown consistent dedication to your core habits, especially in the Health and Productivity categories. Your streaks are becoming more stable, which is a clear sign that these behaviors are starting to become automatic. Keep leveraging your most productive morning hours to tackle the hardest tasks.

1. **Optimize Your Environment:** Try to remove one small friction point for the habit you struggle with most.
2. **Celebrate Milestones:** You're close to a new best streak on one of your habits—keep that momentum!
3. **Consistency over Intensity:** Even on busy days, try to do a "minimal version" of your habits to keep the streak alive.
`.trim();

export const MOCK_HABIT_SUGGESTIONS = [
  {
    name: "Morning Sunlight",
    description:
      "Get 10-15 minutes of natural sunlight within 30 minutes of waking up.",
    category: "health",
    icon: "☀️",
    color: "#eab308",
    targetDays: 7,
  },
  {
    name: "Digital Sunset",
    description: "No screens 1 hour before bed to improve sleep quality.",
    category: "health",
    icon: "🌙",
    color: "#6366f1",
    targetDays: 7,
  },
  {
    name: "Deep Work Session",
    description:
      "90 minutes of focused, uninterrupted work on your most important task.",
    category: "productivity",
    icon: "🧠",
    color: "#8b5cf6",
    targetDays: 5,
  },
];
