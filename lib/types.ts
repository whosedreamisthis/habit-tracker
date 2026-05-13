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
  targetDays: number;
  isArchived: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  category: "Learning";
  color: "#6366f1";
  icon: "📚";
  _streakProb: 0.82;
}
