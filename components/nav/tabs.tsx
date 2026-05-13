"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/lib/constants";
import Link from "next/link";

const Tabs = () => {
  const pathname = usePathname();

  return (
    <div className="sticky bottom-0 h-16 bg-brand-50 w-full flex justify-between items-center px-10">
      {NAV_LINKS.map((link) => {
        const isActive = pathname === link.to;
        return (
          <div key={link.to}>
            <Link
              href={link.to}
              className={`p-2 flex flex-col justify-center items-center ${isActive ? "text-brand-800" : "text-slate-500/80"}`}
            >
              <link.icon className="w-5 h-5 " />

              <p className="text-sm">{link.label}</p>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Tabs;
