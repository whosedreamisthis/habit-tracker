import React from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  ListChecks,
  CalendarDays,
  Brain,
  BarChart3,
} from "lucide-react";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/habits", label: "Habits", icon: ListChecks },
  { to: "/weekly", label: "Weekly", icon: CalendarDays },
  { to: "/insights", label: "Insights", icon: Brain },
  { to: "/stats", label: "Statistics", icon: BarChart3 },
];

type Props = {
  className?: string;
};

const Aside = ({ className }: Props) => {
  return (
    <div className={`w-64  flex flex-col gap-3 px-5 ${className}`}>
      {nav.map((item) => (
        <Link
          href={item.to}
          key={item.to}
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-brand-100 transition-colors text-slate-700 hover:text-brand-500"
        >
          <item.icon className="w-5 h-5 " />
          <span className="">{item.label}</span>
        </Link>
      ))}
    </div>
  );
};

export default Aside;
