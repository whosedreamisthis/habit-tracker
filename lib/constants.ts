import {
  LayoutDashboard,
  ListChecks,
  CalendarDays,
  Brain,
  BarChart3,
} from "lucide-react";

export const NAV_LINKS = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/habits", label: "Habits", icon: ListChecks },
  { to: "/weekly", label: "Weekly", icon: CalendarDays },
  { to: "/insights", label: "Insights", icon: Brain },
  { to: "/statistics", label: "Statistics", icon: BarChart3 },
];
