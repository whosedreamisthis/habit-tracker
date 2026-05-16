"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/lib/constants";
import Link from "next/link";

const Tabs = () => {
  const pathname = usePathname();

  return (
    <div className="sticky bottom-0  glass w-full flex justify-around items-center py-4 px-10 bg-brand-50/70 safe-area-bottom">
      {NAV_LINKS.map((link) => {
        const isActive = pathname === link.to;
        return (
          <Link
            key={link.to}
            href={link.to}
            prefetch={false}
            className={`flex flex-col justify-center items-center ${isActive ? "text-brand-800" : "text-slate-500/80"}`}
          >
            <link.icon className="w-5 h-5 " />

            <p className="text-xs sm:text-sm">{link.label}</p>
          </Link>
        );
      })}
    </div>
  );
};

export default Tabs;
