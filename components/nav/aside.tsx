"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { NAV_LINKS } from "@/lib/constants";

type Props = {
  className?: string;
};

const Aside = ({ className }: Props) => {
  const pathname = usePathname();

  return (
    <div className={`w-64  flex flex-col px-5 pt-4 ${className}`}>
      {NAV_LINKS.map((item) => {
        const isActive = pathname === item.to;

        return (
          <Link
            href={item.to}
            key={item.to}
            className={`flex items-center gap-3 p-3 rounded-lg  transition-colors ${isActive ? "text-brand-700 bg-brand-100" : "text-slate-500"} cursor-pointer `}
          >
            <item.icon className="w-5 h-5 " />
            <span className="">{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default Aside;
