"use client";

import React from "react";
import SectionHeader from "../common/section-header";
import { Moon, Sun, User, Settings } from "lucide-react";
import { useTheme } from "next-themes";
import SettingsButton from "@/components/forms/settings/settings-button";

const DashboardHeader = () => {
  const { theme, setTheme } = useTheme();

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex justify-between items-center pb-5 gap-2">
      <SectionHeader title="Hey Alex 👋" description={today} />

      <div className="md:hidden flex gap-4">
        <button
          className="rounded-full bg-transparent hover:bg-transparent active:bg-transparent"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <SettingsButton showLabel={false} />

        <button className="rounded-full bg-transparent hover:bg-transparent active:bg-transparent">
          <User size={18} />
        </button>
      </div>
    </div>
  );
};

export default DashboardHeader;
