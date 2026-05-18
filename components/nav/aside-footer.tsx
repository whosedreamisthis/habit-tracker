"use client";

import React, { useEffect, useState } from "react";
import {
  Show,
  UserButton,
  SignInButton,
  SignUpButton,
  useUser,
} from "@clerk/nextjs";
import { Moon, Sun, LogIn, UserPlus, LogOut } from "lucide-react";
import { useTheme } from "next-themes";
import SettingsButton from "../forms/settings/settings-button";
import { logoutDemo } from "@/lib/actions";

const AsideFooter = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { isLoaded, isSignedIn } = useUser();

  useEffect(() => {
    const init = () => setMounted(true);
    init();
  }, []);

  if (!mounted) return null;

  const isDemo =
    typeof document !== "undefined" &&
    document.cookie.includes("demo_mode=true");

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

      {isDemo ? (
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-stone-600 dark:text-stone-300">
            <div className="h-8 w-8 rounded-full bg-brand-600 flex items-center justify-center text-white font-bold">
              D
            </div>
            <span>Demo User</span>
          </div>
          <form action={logoutDemo}>
            <button
              type="submit"
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg w-full text-left transition-colors"
            >
              <LogOut size={18} />
              <span>Logout Demo</span>
            </button>
          </form>
        </div>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default AsideFooter;
