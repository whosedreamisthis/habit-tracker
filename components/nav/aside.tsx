"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { NAV_LINKS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { resetAllHabitsData } from "@/lib/actions";

type Props = {
  className?: string;
};

const Aside = ({ className }: Props) => {
  const pathname = usePathname();

  return (
    <div className="bg-white flex flex-col justify-between px-4  items-start h-full w-full">
      <div className={`w-full  flex flex-col pt-4 ${className}`}>
        {NAV_LINKS.map((item) => {
          const isActive = pathname === item.to;

          return (
            <Link
              href={item.to}
              key={item.to}
              className={`flex items-center gap-3 py-3 rounded-lg  transition-colors ${isActive ? "text-brand-700 bg-brand-100" : "text-slate-500"} cursor-pointer w-full px-2`}
            >
              <item.icon className="w-5 h-5 " />
              <span className="">{item.label}</span>
            </Link>
          );
        })}
      </div>
      {/*<Button*/}
      {/*  onClick={async () => {*/}
      {/*    await resetAllHabitsData();*/}
      {/*  }}*/}
      {/*>*/}
      {/*  reset*/}
      {/*</Button>*/}
    </div>
  );
};

export default Aside;
