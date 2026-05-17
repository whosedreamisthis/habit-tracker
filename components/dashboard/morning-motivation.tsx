"use client";

import React, { useEffect, useState, useTransition } from "react";
import { Card } from "@/components/ui/card";
import { askAI } from "@/lib/gemini";
import { format } from "date-fns";
import { Habit } from "@/lib/types";

const MorningMotivation = ({ habits }: { habits: Habit[] }) => {
  const [isMotivationChecked, setIsMotivationChecked] = useState(false);
  const [motivationText, setMotivationText] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  // Helper function to handle visibility toggles
  const checkVisibilitySettings = () => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("morning_motivation_enabled");
      setIsMotivationChecked(saved === "true");
    }
  };

  useEffect(() => {
    // 1. Establish layout visibility rules
    checkVisibilitySettings();
    window.addEventListener("storage", checkVisibilitySettings);
    window.addEventListener("local-storage-update", checkVisibilitySettings);

    // 2. Daily Cache Check Logic
    const todayStr = format(new Date(), "yyyy-MM-dd"); // e.g., "2026-05-17"
    const cachedText = localStorage.getItem("morning_motivation_text");
    const cachedDate = localStorage.getItem("morning_motivation_date");

    if (cachedText && cachedDate === todayStr) {
      // It's the same day! Load the cached motivation text straight away
      setMotivationText(cachedText);
    } else {
      // First boot or past midnight! Hit the server boundary to fetch a fresh statement
      startTransition(async () => {
        try {
          const prompt =
            "You are an elite performance coach and a supportive, insightful companion for a habit tracker app. \n" +
            "Write a single, highly energetic sentence of morning motivation tailored specifically to the user's current habits.\n" +
            "\n" +
            "Here is the user's current habit data:\n" +
            "${habitsSummary}\n" +
            "\n" +
            "CRITICAL RULES:\n" +
            "1. Output exactly ONE sentence. No more, no less.\n" +
            "2. Do not wrap the sentence in quotation marks or markdown styling.\n" +
            "3. Be specific to their habits: if they are doing great, call out their momentum; if they are slipping, provide a grounded, encouraging push. Do not sound generic.\n" +
            "4. Keep the tone sharp, inspiring, and free of cheesy clichés.";
          const freshMotivation = await askAI(prompt, habits);

          if (freshMotivation) {
            const cleanText = freshMotivation.trim();
            localStorage.setItem("morning_motivation_text", cleanText);
            localStorage.setItem("morning_motivation_date", todayStr);
            setMotivationText(cleanText);
          }
        } catch (error) {
          console.error("Failed to fetch morning insight:", error);
          setMotivationText(
            "Make today count and build something amazing, one commit at a time!",
          );
        }
      });
    }

    return () => {
      window.removeEventListener("storage", checkVisibilitySettings);
      window.removeEventListener(
        "local-storage-update",
        checkVisibilitySettings,
      );
    };
  }, []);

  // Don't render the card if the feature is disabled in settings
  if (!isMotivationChecked) return null;

  return (
    <Card className="glass dark:bg-stone-800 p-4 rounded-lg border-none my-5 transition-all duration-300">
      <p className="text-md dark:text-stone-100 font-semibold mb-1">
        Morning Motivation
      </p>
      {isPending ? (
        <div className="space-y-2 animate-pulse mt-2">
          <div className="h-3 bg-slate-200 dark:bg-stone-700 rounded w-5/6"></div>
        </div>
      ) : (
        <p className="text-sm text-muted-foreground dark:text-stone-400">
          {motivationText || "Loading your daily spark..."}
        </p>
      )}
    </Card>
  );
};

export default MorningMotivation;
