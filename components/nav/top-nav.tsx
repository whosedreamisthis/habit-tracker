"use client";

import React, { useState, useEffect } from "react";
import { Moon, Sun, LogIn } from "lucide-react";
import { Show, UserButton, SignInButton } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import SettingsButton from "@/components/forms/settings/settings-button";
import Logo from "@/components/nav/logo";

const TopNav = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="sticky top-0 z-40 w-full glass bg-brand-50/70 border-b border-brand-100/20 dark:bg-stone-800 md:hidden">
      <div className="flex items-center justify-between h-16 px-4 gap-4">
        <Logo />
        <div className="flex items-center justify-end h-16 px-4 gap-4">
          <button
            className="rounded-full bg-transparent hover:bg-transparent active:bg-transparent p-2 transition-colors  dark:hover:bg-white/5"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
          >
            {mounted &&
              (theme === "dark" ? <Sun size={20} /> : <Moon size={20} />)}
            {!mounted && <div className="w-5 h-5" />}
          </button>

          <SettingsButton showLabel={false} />

          <Show when="signed-in">
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox: "h-8 w-8",
                },
              }}
            />
          </Show>

          <Show when="signed-out">
            <SignInButton mode="modal">
              <button className="rounded-full bg-transparent hover:bg-transparent active:bg-transparent p-2 transition-colors  dark:hover:bg-white/5">
                <LogIn size={20} />
              </button>
            </SignInButton>
          </Show>
        </div>
      </div>
    </nav>
  );
};

export default TopNav;
