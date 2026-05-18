"use client";

import React, { useEffect, useState, useTransition } from "react";
import { Card } from "@/components/ui/card";
import { askAI } from "@/lib/gemini";
import { Habit } from "@/lib/types";
import { format } from "date-fns";
import { X } from "lucide-react";
import { getUserKey } from "@/lib/utils";
import { MOCK_MORNING_MOTIVATIONS } from "@/lib/mock-ai-data";

const MorningMotivation = ({
  habits,
  userId,
}: {
  habits: Habit[];
  userId: string | null | undefined;
}) => {
  const [isMotivationEnabled, setIsMotivationEnabled] = useState(false);
  const [isDismissedToday, setIsDismissedToday] = useState(false);
  const [motivationText, setMotivationText] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  const checkVisibilitySettings = () => {
    if (typeof window !== "undefined") {
      const savedEnabled = localStorage.getItem(
        getUserKey(userId, "morning_motivation_enabled"),
      );
      // Default to true if not set
      setIsMotivationEnabled(
        savedEnabled === null ? true : savedEnabled === "true",
      );
    }
  };

  useEffect(() => {
    checkVisibilitySettings();
    window.addEventListener("storage", checkVisibilitySettings);
    window.addEventListener("local-storage-update", checkVisibilitySettings);

    const todayStr = format(new Date(), "yyyy-MM-dd");

    // 1. SYNC CACHE FIRST: Ensure local state gets its value regardless of dismissal status
    const cachedText = localStorage.getItem(
      getUserKey(userId, "morning_motivation_text"),
    );
    const cachedDate = localStorage.getItem(
      getUserKey(userId, "morning_motivation_date"),
    );

    if (cachedText && cachedDate === todayStr) {
      setMotivationText(cachedText);
    }

    // 2. DISMISSAL CHECK SECOND: Track hidden status safely without blocking cache parsing
    const dismissedDate = localStorage.getItem(
      getUserKey(userId, "morning_motivation_dismissed_date"),
    );
    if (dismissedDate === todayStr) {
      setIsDismissedToday(true);
      // We still want to return early if dismissed, but we've already set the text if it was cached
      return;
    }

    // 3. GENERATION LAYER: Only run if the cache is expired or missing entirely
    // and if not dismissed (we already checked dismissal above)
    if (cachedDate !== todayStr) {
      const timer = setTimeout(() => {
        startTransition(async () => {
          try {
            const habitsSummary = habits
              .map(
                (h) =>
                  `- "${h.name}" (${h.category}): Streak of ${h.activeStreak} days.`,
              )
              .join("\n");

            const prompt = `
              You are an elite performance coach for a habit tracker app. 
              Write exactly ONE energetic sentence of morning motivation tailored to the user's current habits.
              Do not use quotes or asterisks.
              
              User's Habit Context:
              ${habitsSummary}
            `.trim();

            const freshMotivation = await askAI(prompt);

            if (freshMotivation) {
              const cleanText = freshMotivation.trim();
              localStorage.setItem(
                getUserKey(userId, "morning_motivation_text"),
                cleanText,
              );
              localStorage.setItem(
                getUserKey(userId, "morning_motivation_date"),
                todayStr,
              );
              setMotivationText(cleanText);
            }
          } catch (error: any) {
            console.error("Failed to fetch morning insight:", error);

            let fallbackText =
              "Small steps lead to big changes—keep up the great work with your habits today!";

            // Use a random mock motivation if quota is hit
            if (
              error?.status === 429 ||
              error?.message?.includes("429") ||
              error?.message?.includes("quota")
            ) {
              const randomIndex = Math.floor(
                Math.random() * MOCK_MORNING_MOTIVATIONS.length,
              );
              fallbackText = MOCK_MORNING_MOTIVATIONS[randomIndex];
            }

            setMotivationText(fallbackText);
          }
        });
      }, 1000); // Delay AI call to prioritize critical path
      return () => clearTimeout(timer);
    }

    return () => {
      window.removeEventListener("storage", checkVisibilitySettings);
      window.removeEventListener(
        "local-storage-update",
        checkVisibilitySettings,
      );
    };
  }, [habits, userId]);

  const handleDismiss = () => {
    const todayStr = format(new Date(), "yyyy-MM-dd");
    localStorage.setItem(
      getUserKey(userId, "morning_motivation_dismissed_date"),
      todayStr,
    );
    setIsDismissedToday(true);
  };

  if (!isMotivationEnabled || isDismissedToday) return null;

  return (
    <Card className="glass dark:bg-stone-800 p-4 rounded-lg border-none my-5 relative group transition-all duration-300">
      <button
        onClick={handleDismiss}
        className="absolute top-3 right-3 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 transition-colors rounded-md p-1 focus:outline-hidden"
        aria-label="Dismiss morning motivation for today"
      >
        <X size={16} />
      </button>

      <div className="pr-6">
        <p className="text-md dark:text-stone-100 font-semibold mb-1">
          Morning Motivation
        </p>
        {isPending ? (
          <div className="space-y-2 animate-pulse mt-2">
            <div className="h-3 bg-slate-100 dark:bg-stone-700 rounded w-5/6"></div>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground dark:text-stone-400 italic leading-relaxed">
            {motivationText || "Loading your daily spark..."}
          </p>
        )}
      </div>
    </Card>
  );
};

export default MorningMotivation;
