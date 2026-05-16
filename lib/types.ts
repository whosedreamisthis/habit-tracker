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
  frequency: "daily" | "weekly";
  status: "active" | "archived";
  targetDays: number;
  order: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  category: string;
  color: string;
  icon: string;
  completions?: Completion[];
  activeStreak: number;
  bestStreak: number;
  isCompletedToday: boolean;
  _streakProb: number;
}

export interface Completion {
  _id: string;
  date: Date | string;
}
