"use client";

import React, { useState, useEffect } from "react";
import { Moon, Sun, LogIn, LogOut } from "lucide-react";
import { Show, UserButton, SignInButton, useUser } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import SettingsButton from "@/components/forms/settings/settings-button";
import Logo from "@/components/nav/logo";
import { logoutDemo } from "@/lib/actions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const TopNav = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { isLoaded, isSignedIn } = useUser();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDemo =
    typeof document !== "undefined" &&
    document.cookie.includes("demo_mode=true");

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

          {mounted &&
            (isDemo ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className="h-8 w-8 rounded-full bg-brand-600 flex items-center justify-center text-white font-bold text-xs outline-none"
                    aria-label="Demo User Menu"
                  >
                    D
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel>Demo User</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <form action={logoutDemo}>
                    <DropdownMenuItem asChild>
                      <button
                        type="submit"
                        className="w-full cursor-pointer flex items-center gap-2 text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-900/20"
                      >
                        <LogOut size={16} />
                        <span>Logout Demo</span>
                      </button>
                    </DropdownMenuItem>
                  </form>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
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
              </>
            ))}
        </div>
      </div>
    </nav>
  );
};

export default TopNav;
