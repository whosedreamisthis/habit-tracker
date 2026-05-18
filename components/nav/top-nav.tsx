import React from "react";
import { LogIn, LogOut } from "lucide-react";
import { Show, UserButton, SignInButton } from "@clerk/nextjs";
import SettingsButton from "@/components/forms/settings/settings-button";
import Logo from "@/components/nav/logo";
import { logoutDemo } from "@/lib/actions";
import ThemeToggle from "./theme-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TopNavProps {
  isDemo: boolean;
}

const TopNav = ({ isDemo }: TopNavProps) => {
  return (
    <nav className="sticky top-0 z-40 w-full glass bg-brand-50/70 border-b border-brand-100/20 dark:bg-stone-800 md:hidden">
      <div className="flex items-center justify-between h-16 px-4">
        <Logo />
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <SettingsButton showLabel={false} />

          {isDemo ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="h-8 w-8 rounded-full bg-brand-600 flex items-center justify-center text-white font-bold text-xs outline-none hover:opacity-90 transition-opacity"
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
                  <button
                    className="rounded-full bg-transparent p-2 transition-colors hover:bg-stone-100 dark:hover:bg-white/5"
                    aria-label="Sign In"
                  >
                    <LogIn size={20} />
                  </button>
                </SignInButton>
              </Show>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default TopNav;
