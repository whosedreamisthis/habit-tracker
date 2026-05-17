export const CATEGORIES = [
  { value: "health", label: "Health" },
  { value: "fitness", label: "Fitness" },
  { value: "learning", label: "Learning" },
  { value: "mindfulness", label: "Mindfulness" },
  { value: "productivity", label: "Productivity" },
  { value: "social", label: "Social" },
  { value: "finance", label: "Finance" },
  { value: "creative", label: "Creative" },
  { value: "other", label: "Other" },
];

export const ICONS = [
  "💪",
  "🏃",
  "📚",
  "🧘",
  "💧",
  "😴",
  "🥗",
  "✍️",
  "🎯",
  "🧠",
  "💊",
  "🚶",
];

export const COLORS = [
  "#6366f1",
  "#0ea5e9",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#ec4899",
  "#8b5cf6",
  "#14b8a6",
  "#84cc16",
];

import {
  LayoutDashboard,
  ListChecks,
  CalendarDays,
  Brain,
  BarChart3,
  Flame,
  Trophy,
  TrendingUp,
} from "lucide-react";

export const NAV_LINKS = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/habits", label: "Habits", icon: ListChecks },
  { to: "/progress", label: "Progress", icon: TrendingUp },
];

export const SUMMARY = [
  {
    icon: ListChecks,
    iconBg: "rgba(99,102,241,0.15)",
    iconFg: "#6366f1",
    label: "Total habits",
  },

  {
    icon: Flame,
    iconBg: "rgba(249,115,22,0.15)",
    iconFg: "#f97316",
    label: "Active streaks",
  },
  {
    icon: Trophy,
    iconBg: "rgba(245,158,11,0.15)",
    iconFg: "#f59e0b",
    label: "Best streak",
  },
  {
    icon: TrendingUp,
    iconBg: "rgba(16,185,129,0.15)",
    iconFg: "#10b981",
    label: "This week",
  },
];

export const WEEKLY_STATS = [
  {
    label: "Week rate",
  },
];
