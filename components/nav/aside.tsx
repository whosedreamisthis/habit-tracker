"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { NAV_LINKS } from "@/lib/constants";
import { LayoutDashboard, ListChecks, TrendingUp } from "lucide-react";

type Props = {
  className?: string;
};

const Aside = ({ className }: Props) => {
  const pathname = usePathname();

  return (
    <div className="bg-white dark:bg-stone-800 flex flex-col justify-between px-4  items-start h-full w-full">
      <div className={`w-full  flex flex-col pt-4 ${className}`}>
        {NAV_LINKS.map((item) => {
          const isActive = pathname === item.to;
          const Icon =
            item.icon === "LayoutDashboard"
              ? LayoutDashboard
              : item.icon === "ListChecks"
                ? ListChecks
                : TrendingUp;

          return (
            <Link
              href={item.to}
              key={item.to}
              className={`flex items-center gap-3 py-3 rounded-lg  transition-colors ${isActive ? "text-brand-700 bg-brand-100 dark:bg-brand-900/40 dark:text-brand-300" : "text-slate-500 dark:text-slate-400"} cursor-pointer w-full px-2`}
            >
              <Icon className="w-5 h-5 " />
              <span className="">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Aside;
