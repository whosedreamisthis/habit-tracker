"use client";

import React, { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const ThemeToggle = ({
  className,
  showLabel,
}: {
  className?: string;
  showLabel?: boolean;
}) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className={`w-9 h-9 ${className}`} />;
  }

  const isDark = theme === "dark";

  return (
    <button
      className={`flex items-center gap-3 cursor-pointer transition-colors hover:bg-stone-100 dark:hover:bg-white/5 active:scale-95 duration-200 rounded-lg p-2 ${
        showLabel ? "-ml-2" : "rounded-full"
      } ${className}`}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
      {showLabel && (
        <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
          Theme
        </span>
      )}
    </button>
  );
};

export default ThemeToggle;
