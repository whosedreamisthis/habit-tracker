"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/lib/constants";
import Link from "next/link";

import { LayoutDashboard, ListChecks, TrendingUp } from "lucide-react";

const Tabs = () => {
  const pathname = usePathname();

  return (
    <div className="sticky bottom-0 w-full flex justify-around items-center py-3 px-4 bg-white dark:bg-stone-900 border-t border-slate-200 dark:border-stone-800 safe-area-bottom">
      {NAV_LINKS.map((link) => {
        const isActive = pathname === link.to;
        const Icon =
          link.icon === "LayoutDashboard"
            ? LayoutDashboard
            : link.icon === "ListChecks"
              ? ListChecks
              : TrendingUp;
        return (
          <Link
            key={link.to}
            href={link.to}
            prefetch={false}
            className={`flex flex-col justify-center items-center gap-1 transition-colors ${isActive ? "text-brand-800 dark:text-stone-100" : "text-slate-500/80 dark:text-stone-400"}`}
          >
            <Icon
              className={`w-5 h-5 ${isActive ? "text-brand-600 dark:text-brand-400" : ""}`}
            />

            <p className="text-[10px] sm:text-xs font-medium">{link.label}</p>
          </Link>
        );
      })}
    </div>
  );
};

export default Tabs;
