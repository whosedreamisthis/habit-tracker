"use client";

import React, { useState, useTransition } from "react";
import FormHeader from "../form-header";
import ResetMockDataButton from "./reset-mock-data-button";
import { getUserKey } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";

const SettingsForm = ({ onClose }: { onClose: () => void }) => {
  const [isPending, startTransition] = useTransition();
  const { userId } = useAuth();

  const [isMotivationEnabled, setIsMotivationEnabled] = useState<boolean>(
    () => {
      if (typeof window !== "undefined") {
        const saved = localStorage.getItem(
          getUserKey(userId, "morning_motivation_enabled"),
        );
        return saved === null ? true : saved === "true";
      }
      return false;
    },
  );

  const handleSave = () => {
    // Wrap the mutation and state signals inside the transition
    startTransition(() => {
      try {
        localStorage.setItem(
          getUserKey(userId, "morning_motivation_enabled"),
          String(isMotivationEnabled),
        );

        // Dispatch a custom event so components on the same page catch the update instantly
        window.dispatchEvent(new Event("local-storage-update"));
        console.log("Setting saved successfully!");
      } catch (error) {
        console.error("Failed to save setting to localStorage:", error);
      }

      // Close the modal/form *after* or during the state commit
      onClose();
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <FormHeader title="Settings" onClose={onClose} />

      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
          Preferences
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-slate-900 dark:text-stone-100">
                Morning motivation
              </p>
              <p className="text-xs text-slate-500 dark:text-stone-400">
                Show a short personalised AI message every morning on the
                dashboard.
              </p>
            </div>
            <input
              type="checkbox"
              id="morning-motivation"
              checked={isMotivationEnabled}
              onChange={(e) => setIsMotivationEnabled(e.target.checked)}
              className="h-5 w-5 appearance-none rounded border border-brand-500 bg-white dark:bg-slate-600 checked:bg-brand-600 focus:ring-brand-500 checked:after:content-['✓'] checked:after:flex checked:after:items-center checked:after:justify-center checked:after:text-white checked:after:text-xs checked:after:h-full checked:after:w-full"
            />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={onClose}
              type="button"
              className="px-4 py-2 rounded-lg font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-all active:scale-[0.98]"
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-linear-to-r from-brand-300 to-brand-700 text-white font-semibold rounded-lg transition-all hover:opacity-90 active:scale-[0.98]"
              onClick={handleSave}
              disabled={isPending}
            >
              {isPending ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
          Data Management
        </h3>
        <ResetMockDataButton />
        <p className="text-xs text-slate-400">
          Resetting will restore the application to its original state. All
          custom habits and completions will be lost.
        </p>
      </div>
    </div>
  );
};

export default SettingsForm;
