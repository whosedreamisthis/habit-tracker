"use client";

import React from "react";
import { LogIn, UserPlus, LogOut } from "lucide-react";
import dynamic from "next/dynamic";
import { logoutDemo } from "@/lib/actions";

const ThemeToggle = dynamic(() => import("./theme-toggle"), { ssr: false });
const SettingsButton = dynamic(
  () => import("../forms/settings/settings-button"),
  { ssr: false },
);
const Show = dynamic(() => import("@clerk/nextjs").then((mod) => mod.Show), {
  ssr: false,
});
const UserButton = dynamic(
  () => import("@clerk/nextjs").then((mod) => mod.UserButton),
  { ssr: false },
);
const SignInButton = dynamic(
  () => import("@clerk/nextjs").then((mod) => mod.SignInButton),
  { ssr: false },
);
const SignUpButton = dynamic(
  () => import("@clerk/nextjs").then((mod) => mod.SignUpButton),
  { ssr: false },
);

interface AsideFooterProps {
  isDemo: boolean;
}

const AsideFooter = ({ isDemo }: AsideFooterProps) => {
  return (
    <div className="bg-brand-50/40 dark:bg-stone-800 flex flex-col gap-3 pb-3 px-5 w-full text-slate-600 dark:text-slate-300 text-sm">
      <hr className="slate-300" />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <ThemeToggle className="-ml-2" />
          <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
            Theme
          </span>
        </div>
      </div>

      <div className="min-h-[40px]">
        <SettingsButton showLabel={true} />
      </div>

      <div className="min-h-[48px]">
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
                className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg w-full text-left "
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
                  <button className="flex items-center gap-3 px-3 py-2 text-sm font-medium  hover:bg-stone-100 dark:hover:bg-stone-700 rounded-lg w-full text-left">
                    <LogIn size={18} />
                    <span>Sign In</span>
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="flex items-center gap-3 px-3 py-2 text-sm font-medium bg-brand-600 text-white hover:opacity-90 rounded-lg w-full text-left">
                    <UserPlus size={18} />
                    <span>Sign Up</span>
                  </button>
                </SignUpButton>
              </div>
            </Show>
          </>
        )}
      </div>
    </div>
  );
};

export default AsideFooter;
