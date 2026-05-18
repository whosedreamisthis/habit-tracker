"use client";

import React, { useState, useEffect, useTransition, useCallback } from "react";
import WeeklyReportHeader from "@/components/weekly/weekly-report-header";
import { askAI } from "@/lib/gemini";
import { Habit } from "@/lib/types";
import { format, differenceInDays, parseISO } from "date-fns";
import { getUserKey } from "@/lib/utils";

const WeeklyReport = ({
  habits,
  userId,
}: {
  habits: Habit[];
  userId: string | null | undefined;
}) => {
  const [isPending, startTransition] = useTransition();

  // Synchronously initialize all cache layers together on the exact first render tick
  const [reportState, setReportState] = useState(() => {
    if (typeof window !== "undefined") {
      const cachedReport = localStorage.getItem(
        getUserKey(userId, "weekly_report_text"),
      );
      const cachedTimestamp = localStorage.getItem(
        getUserKey(userId, "weekly_report_timestamp"),
      );

      if (cachedReport && cachedTimestamp) {
        const today = new Date();
        const lastGeneratedDate = parseISO(cachedTimestamp);
        const daysSinceGeneration = differenceInDays(today, lastGeneratedDate);

        if (daysSinceGeneration < 7) {
          return {
            text: cachedReport,
            dateStr: format(lastGeneratedDate, "M/d/yyyy, h:mm:ss a"),
            needsGeneration: false,
          };
        }
      }
    }
    return { text: "", dateStr: "", needsGeneration: true };
  });

  const generateFreshReport = useCallback(() => {
    startTransition(async () => {
      try {
        const prompt = `
Analyze my habit tracking data and provide a concise weekly progress report. 

CRITICAL FORMATTING RULES:
1. Keep the entire response strictly to two main sections/paragraphs.
2. The first paragraph must be a cohesive prose summary analyzing my data trends and streaks.
3. The second section must contain exactly 3 actionable insights structured as a numbered list.
4. Each list item must start with a descriptive, bold heading (e.g., "1. **Target Reading Friction:** Analyze...").
5. DO NOT include any introductory greetings, conversational headers, or dates (e.g., do not say "Here is your report"). Get straight to the analysis on the very first word.
`.trim();

        const result = await askAI(prompt, habits);

        if (result) {
          const today = new Date();
          const nowStr = today.toISOString();

          localStorage.setItem(
            getUserKey(userId, "weekly_report_text"),
            result,
          );
          localStorage.setItem(
            getUserKey(userId, "weekly_report_timestamp"),
            nowStr,
          );

          setReportState({
            text: result,
            dateStr: format(today, "M/d/yyyy, h:mm:ss a"),
            needsGeneration: false,
          });
        }
      } catch (err) {
        console.error("Could not fetch weekly report:", err);
        setReportState((prev) => ({
          ...prev,
          text: "Failed to generate report. Please try again later.",
          needsGeneration: false,
        }));
      }
    });
  }, [habits, userId]);

  // Fires the generation workflow strictly if the lazy initializer signals a cache miss
  useEffect(() => {
    if (habits.length > 0 && reportState.needsGeneration) {
      generateFreshReport();
    }
  }, [reportState.needsGeneration, generateFreshReport, habits.length]);

  const fetchWeeklyReport = () => {
    if (isPending || habits.length === 0) return;
    generateFreshReport();
  };

  return (
    <div className="flex flex-col gap-5 bg-white dark:bg-stone-800 p-5 rounded-lg position-relative">
      <div className="flex flex-col gap-1">
        <WeeklyReportHeader
          onRegenerate={fetchWeeklyReport}
          date={reportState.dateStr}
        />
      </div>

      <div className="mt-2">
        {habits.length === 0 ? (
          <p className="text-sm italic text-muted-foreground dark:text-stone-400">
            Start tracking habits for this to populate.
          </p>
        ) : isPending ? (
          <div className="flex flex-col gap-2 animate-pulse">
            <div className="h-4 bg-slate-200 dark:bg-stone-700 rounded-sm w-3/4"></div>
            <div className="h-4 bg-slate-200 dark:bg-stone-700 rounded-sm w-5/6"></div>
            <div className="h-4 bg-slate-200 dark:bg-stone-700 rounded-sm w-2/3"></div>
          </div>
        ) : (
          <p className="text-sm leading-relaxed text-slate-600 dark:text-stone-300 whitespace-pre-wrap">
            {reportState.text
              ? reportState.text.split(/(\*\*.*?\*\*)/g).map((part, index) => {
                  if (part.startsWith("**") && part.endsWith("**")) {
                    return (
                      <strong
                        key={index}
                        className="font-bold text-slate-900 dark:text-stone-100"
                      >
                        {part.slice(2, -2)}
                      </strong>
                    );
                  }
                  return part;
                })
              : "Analyzing your habits..."}
          </p>
        )}
      </div>
    </div>
  );
};

export default WeeklyReport;
