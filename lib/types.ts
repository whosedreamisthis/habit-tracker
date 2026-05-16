export interface User {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  morningMotivation: boolean;
}

export interface Habit {
  _id: string;
  userId: string;
  description: string;
  frequency: "daily" | "weekly" | "monthly";
  status: "active" | "archived";
  targetDays: number;
  order: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  category: "Learning";
  color: "#6366f1";
  icon: "📚";
  completions?: Completion[];
  activeStreak: number;
  bestStreak: number;
  isCompletedToday: boolean;
  _streakProb: 0.82;
}

export interface Completion {
  _id: string;
  date: Date | string;
}
