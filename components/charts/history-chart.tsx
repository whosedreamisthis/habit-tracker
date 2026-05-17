"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { Habit } from "@/lib/types";
import { format, subDays } from "date-fns";

interface HistoryChartProps {
  habits: Habit[];
}

const HistoryChart = ({ habits }: HistoryChartProps) => {
  // Calculate completion counts for each of the last 30 days
  const data = Array.from({ length: 30 }).map((_, i) => {
    const d = subDays(new Date(), 29 - i);
    const dateStr = format(d, "yyyy-MM-dd");
    const label = format(d, "MMM d");

    const completions = habits.reduce((acc, habit) => {
      const hasCompletion = habit.completions?.some((c) => {
        const cDate =
          typeof c.date === "string" ? c.date : format(c.date, "yyyy-MM-dd");
        return cDate === dateStr;
      });
      return acc + (hasCompletion ? 1 : 0);
    }, 0);

    return { date: label, completions };
  });

  return (
    <div className=" dark:bg-stone-800 h-80  w-full bg-white p-5 rounded-xl shadow-sm">
      <p className="text-sm font-bold text-slate-800">Last 30 days</p>
      <div className="h-56 w-full">
        <ResponsiveContainer
          width="100%"
          height="100%"
          initialDimension={{ width: 100, height: 50 }}
        >
          <BarChart
            data={data}
            margin={{ top: 10, right: 3, left: -25, bottom: 0 }}
          >
            <defs>
              <linearGradient id="historyGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fde68a" /> {/* amber-200 */}
                <stop offset="100%" stopColor="#ea580c" /> {/* orange-600 */}
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={true}
              horizontal={true}
              stroke="#dddddd"
            />

            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 11 }}
              // This is the magic: it only shows a tick every 4 days to prevent overlap
              interval={3}
              dy={10}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 12 }}
              domain={[0, 8]}
              ticks={[0, 2, 4, 6, 8]}
            />

            <Bar
              dataKey="completions"
              fill="url(#historyGradient)"
              radius={[4, 4, 0, 0]}
              // barSize={8} makes the bars thin like in your image
              barSize={20}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default HistoryChart;
