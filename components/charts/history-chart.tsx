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

// Example data matching your image (Apr 15 - May 13)
const data = [
  { date: "Apr 15", completions: 4 },
  { date: "Apr 16", completions: 7 },
  { date: "Apr 17", completions: 4 },
  { date: "Apr 18", completions: 4 },
  { date: "Apr 19", completions: 4 },
  { date: "Apr 20", completions: 5 },
  { date: "Apr 21", completions: 5 },
  { date: "Apr 22", completions: 5 },
  { date: "Apr 23", completions: 6 },
  { date: "Apr 24", completions: 2 },
  { date: "Apr 25", completions: 4 },
  { date: "Apr 26", completions: 5 },
  { date: "Apr 27", completions: 6 },
  { date: "Apr 28", completions: 6 },
  { date: "Apr 29", completions: 7 },
  { date: "Apr 30", completions: 6 },
  { date: "May 1", completions: 3 },
  { date: "May 2", completions: 4 },
  { date: "May 3", completions: 3 },
  { date: "May 4", completions: 4 },
  { date: "May 5", completions: 5 },
  { date: "May 6", completions: 5 },
  { date: "May 7", completions: 4 },
  { date: "May 8", completions: 4 },
  { date: "May 9", completions: 4 },
  { date: "May 10", completions: 4 },
  { date: "May 11", completions: 6 },
  { date: "May 12", completions: 4 },
  { date: "May 13", completions: 4 },
  { date: "May 14", completions: 4 },
];

const HistoryChart = () => {
  return (
    <div className="h-80  w-full bg-white p-5 rounded-xl shadow-sm">
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
