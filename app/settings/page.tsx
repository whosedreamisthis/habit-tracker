"use client";

import React, { useEffect, useState } from "react";
import { Moon, Sun, LogOut, User } from "lucide-react";
import { useTheme } from "next-themes";
import SectionHeader from "@/components/common/section-header";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <SectionHeader
        title="Settings"
        description="Manage your account, preferences, and data."
      />

      {/* Account Section */}
      <section className="bg-white dark:bg-stone-800 rounded-xl p-6 shadow-sm border border-brand-100/20 dark:border-stone-700/50">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-slate-800 dark:text-stone-100">
          <User size={20} className="text-brand-500" />
          Account
        </h2>
        <div className="flex items-center justify-between p-4 bg-brand-50/50 dark:bg-stone-900/50 rounded-lg">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 flex items-center justify-center bg-brand-600 rounded-full text-white text-xl font-bold">
              A
            </div>
            <div>
              <p className="font-medium text-slate-900 dark:text-stone-100">
                Username
              </p>
              <p className="text-sm text-slate-500 dark:text-stone-400">
                email@example.com
              </p>
            </div>
          </div>
          <button className="text-brand-600 dark:text-brand-400 text-sm font-medium hover:underline">
            Edit Profile
          </button>
        </div>
      </section>

      {/* Preferences Section */}
      <section className="bg-white dark:bg-stone-800 rounded-xl p-6 shadow-sm border border-brand-100/20 dark:border-stone-700/50">
        <h2 className="text-lg font-semibold mb-4 text-slate-800 dark:text-stone-100">
          Preferences
        </h2>
        <div className="space-y-6">
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-brand-100 dark:bg-brand-900/30 rounded-lg text-brand-600 dark:text-brand-400">
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </div>
              <div>
                <p className="font-medium text-slate-900 dark:text-stone-100">
                  Appearance
                </p>
                <p className="text-sm text-slate-500 dark:text-stone-400">
                  Switch between light and dark mode
                </p>
              </div>
            </div>
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="px-4 py-2 bg-brand-50 dark:bg-stone-900 text-brand-600 dark:text-brand-400 rounded-lg font-medium hover:bg-brand-100 dark:hover:bg-stone-700 transition-colors"
            >
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </button>
          </div>

          <hr className="border-brand-100/20 dark:border-stone-700/50" />

          <div className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium text-slate-900 dark:text-stone-100">
                  Morning motivation
                </p>
                <p className="text-sm text-slate-500 dark:text-stone-400">
                  Show a short personalised AI message every morning on the
                  dashboard.
                </p>
              </div>
              <input
                type="checkbox"
                className="h-5 w-5 rounded border-brand-200 text-brand-600 focus:ring-brand-500"
              />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                className="px-6 py-2.5 rounded-xl font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-all active:scale-[0.98]"
              >
                Cancel
              </button>
              <button className="px-6 py-2.5 bg-linear-to-r from-brand-300 to-brand-700 text-white font-semibold rounded-xl transition-all hover:opacity-90 active:scale-[0.98]">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Data Management */}
      <section className="bg-white dark:bg-stone-800 rounded-xl p-6 shadow-sm border border-brand-100/20 dark:border-stone-700/50">
        <h2 className="text-lg font-semibold mb-4 text-slate-800 dark:text-stone-100">
          Data Management
        </h2>
        <div className="space-y-4">
          <div className="p-4 bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/20 rounded-lg">
            <p className="text-sm text-amber-800 dark:text-amber-200 mb-4">
              Resetting will restore the application to its original state. All
              custom habits and completions will be lost.
            </p>
          </div>
        </div>
      </section>

      {/* Logout */}
      <div className="pt-4">
        <button className="w-full flex items-center justify-center gap-2 p-4 bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 rounded-xl font-semibold hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors border border-red-100 dark:border-red-900/20">
          <LogOut size={20} />
          Log Out
        </button>
      </div>
    </div>
  );
}
