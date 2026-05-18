"use client";

import React, { useState, useEffect } from "react";
import SectionHeader from "../common/section-header";
import { Moon, Sun, LogIn } from "lucide-react";
import { Show, UserButton, SignInButton, useUser } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import SettingsButton from "@/components/forms/settings/settings-button";

const DashboardHeader = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    setMounted(true);
  }, []);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const firstName = user?.firstName || "Friend";

  return (
    <div className="flex justify-between items-center pb-5 gap-2">
      <SectionHeader title={`Hey ${firstName} 👋`} description={today} />

      <div className="flex items-center gap-2">
        <button
          className="rounded-full bg-transparent hover:bg-transparent active:bg-transparent"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {mounted &&
            (theme === "dark" ? <Sun size={18} /> : <Moon size={18} />)}
          {!mounted && <div className="w-4.5 h-4.5" />}
        </button>

        <SettingsButton showLabel={false} />

        <Show when="signed-in">
          <UserButton />
        </Show>

        <Show when="signed-out">
          <SignInButton mode="modal">
            <button className="rounded-full bg-transparent hover:bg-transparent active:bg-transparent">
              <LogIn size={18} />
            </button>
          </SignInButton>
        </Show>
      </div>
    </div>
  );
};

export default DashboardHeader;
