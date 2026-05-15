"use client";

import React, { useEffect, useState } from "react";
import { Moon, Sun, LogOut } from "lucide-react";
import { useTheme } from "next-themes";
import SettingsButton from "../forms/settings/settings-button";
const AsideFooter = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const init = () => setMounted(true);
    init();
  }, []);

  if (!mounted) return null;
  return (
    <div className="bg-brand-50/40 flex flex-col gap-3 pb-3 px-5 w-full text-slate-600 text-sm">
      <hr className="slate-300" />

      <button
        className="flex items-center justify-start gap-4 cursor-pointer"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "light" ? (
          <div className="flex gap-3">
            <Moon size={18} />
            <p>Dark mode</p>
          </div>
        ) : (
          <div className="flex gap-3">
            <Sun size={18} />
            <p>Light mode</p>
          </div>
        )}
      </button>
      <SettingsButton />
      <div className="flex items-center justify-between ">
        <div className="flex gap-2">
          <div className="h-10 w-10  flex items-center justify-center bg-brand-600 rounded-full">
            <p className="text-xl text-white ">A</p>
          </div>
          <div className="flex flex-col">
            <p className="text-md text-black font-semibold">Username</p>
            <p className="text-xs text-muted-foreground">email@example.com</p>
          </div>
        </div>
        <LogOut className="mr-2" size={17} />
      </div>
    </div>
  );
};

export default AsideFooter;
