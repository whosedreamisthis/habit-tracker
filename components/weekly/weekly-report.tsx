"use client";

import React, { useState, useEffect, useTransition, useCallback } from "react";
import WeeklyReportHeader from "@/components/weekly/weekly-report-header";
import { askAI } from "@/lib/gemini";
import { Habit } from "@/lib/types";
import { format, differenceInDays, parseISO } from "date-fns";

const WeeklyReport = ({ habits }: { habits: Habit[] }) => {
  const [mounted, setMounted] = useState(false); // <-- Track browser mount state
  const [report, setReport] = useState<string>("");
  const [generatedDateStr, setGeneratedDateStr] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  const generateFreshReport = useCallback(() => {
    startTransition(async () => {
      try {
        console.log("Generating fresh weekly AI insights...");

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

          localStorage.setItem("weekly_report_text", result);
          localStorage.setItem("weekly_report_timestamp", nowStr);

          setReport(result);
          setGeneratedDateStr(format(today, "M/d/yyyy, h:mm:ss a"));
        }
      } catch (err) {
        console.error("Could not fetch weekly report:", err);
        setReport("Failed to generate report. Please try again later.");
      }
    });
  }, [habits]);

  // Handle caching logic strictly after mount
  useEffect(() => {
    setMounted(true); // Signal that we are safely on the client side

    const cachedReport = localStorage.getItem("weekly_report_text");
    const cachedTimestamp = localStorage.getItem("weekly_report_timestamp");

    if (cachedReport && cachedTimestamp) {
      const today = new Date();
      const lastGeneratedDate = parseISO(cachedTimestamp);
      const daysSinceGeneration = differenceInDays(today, lastGeneratedDate);

      if (daysSinceGeneration < 7) {
        setReport(cachedReport);
        setGeneratedDateStr(format(lastGeneratedDate, "M/d/yyyy, h:mm:ss a"));
        return;
      }
    }

    generateFreshReport();
  }, [generateFreshReport]);

  const fetchWeeklyReport = () => {
    if (isPending) return;
    generateFreshReport();
  };

  // Prevent rendering stateful cache elements until browser hydration is complete
  if (!mounted) {
    return (
      <div className="flex flex-col gap-5 bg-white dark:bg-stone-800 p-5 rounded-lg animate-pulse">
        <div className="h-6 bg-slate-100 dark:bg-stone-700 rounded w-1/4"></div>
        <div className="h-4 bg-slate-100 dark:bg-stone-700 rounded w-3/4 mt-4"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 bg-white dark:bg-stone-800 p-5 rounded-lg position-relative">
      <div className="flex flex-col gap-1">
        <WeeklyReportHeader
          onRegenerate={fetchWeeklyReport}
          date={generatedDateStr}
        />
      </div>

      <div className="mt-2">
        {isPending ? (
          <div className="flex flex-col gap-2 animate-pulse">
            <div className="h-4 bg-slate-200 dark:bg-stone-700 rounded-sm w-3/4"></div>
            <div className="h-4 bg-slate-200 dark:bg-stone-700 rounded-sm w-5/6"></div>
            <div className="h-4 bg-slate-200 dark:bg-stone-700 rounded-sm w-2/3"></div>
          </div>
        ) : (
          <p className="text-sm leading-relaxed text-slate-600 dark:text-stone-300 whitespace-pre-wrap">
            {report
              ? report.split(/(\*\*.*?\*\*)/g).map((part, index) => {
                  // Check if this part of the split text starts and ends with '**'
                  if (part.startsWith("**") && part.endsWith("**")) {
                    // Remove the asterisks and wrap the string in a strong tag
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
