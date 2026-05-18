"use client";

import React, { useEffect, useState } from "react";
import { Show, UserButton, SignInButton, SignUpButton } from "@clerk/nextjs";
import { Moon, Sun, LogIn, UserPlus } from "lucide-react";
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
    <div className="bg-brand-50/40 dark:bg-stone-800 flex flex-col gap-3 pb-3 px-5 w-full text-slate-600 dark:text-slate-300 text-sm">
      <hr className="slate-300" />

      <button
        className="flex items-center justify-start gap-4 cursor-pointer hover:opacity-80 transition-all"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "light" ? (
          <div className="flex gap-3 items-center">
            <Moon size={18} />
            <p>Dark mode</p>
          </div>
        ) : (
          <div className="flex gap-3 items-center">
            <Sun size={18} />
            <p>Light mode</p>
          </div>
        )}
      </button>
      <SettingsButton showLabel={true} />
      <Show when="signed-in">
        <div className="flex items-center justify-between ">
          <UserButton
            appearance={{
              elements: {
                userButtonAvatarBox: "h-10 w-10",
              },
            }}
            showName
          />
        </div>
      </Show>

      <Show when="signed-out">
        <div className="flex flex-col gap-2">
          <SignInButton mode="modal">
            <button className="flex items-center gap-3 px-3 py-2 text-sm font-medium transition-colors hover:bg-stone-100 dark:hover:bg-stone-700 rounded-lg w-full text-left">
              <LogIn size={18} />
              <span>Sign In</span>
            </button>
          </SignInButton>
          <SignUpButton mode="modal">
            <button className="flex items-center gap-3 px-3 py-2 text-sm font-medium bg-brand-600 text-white transition-opacity hover:opacity-90 rounded-lg w-full text-left">
              <UserPlus size={18} />
              <span>Sign Up</span>
            </button>
          </SignUpButton>
        </div>
      </Show>
    </div>
  );
};

export default AsideFooter;
