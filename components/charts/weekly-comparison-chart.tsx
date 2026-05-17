"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

// Expected data shape from your data processing helper
interface WeeklyComparisonData {
  day: string; // "Mon", "Tue", etc.
  lastWeek: number; // Blue-grey bar value
  thisWeek: number; // Orange bar value
}

// Mock data matching your exact image layout
const mockData: WeeklyComparisonData[] = [
  { day: "Mon", lastWeek: 3, thisWeek: 5 },
  { day: "Tue", lastWeek: 4, thisWeek: 6 },
  { day: "Wed", lastWeek: 5, thisWeek: 4 },
  { day: "Thu", lastWeek: 5, thisWeek: 4 },
  { day: "Fri", lastWeek: 4, thisWeek: 4 },
  { day: "Sat", lastWeek: 4, thisWeek: 0 }, // No bar drawn if 0
  { day: "Sun", lastWeek: 4, thisWeek: 0 },
];

const WeeklyComparisonChart = ({ data }: { data: WeeklyComparisonData[] }) => {
  return (
    <div className="dark:bg-stone-800 h-80 w-full bg-white p-6 rounded-2xl shadow-sm flex flex-col mt-5">
      <p className="text-sm font-bold text-slate-800 mb-4">
        This week vs last week
      </p>

      <div className="flex-1 w-full">
        <ResponsiveContainer
          width="100%"
          height="100%"
          minHeight="100"
          minWidth="100"
          initialDimension={{ width: 100, height: 50 }}
        >
          <BarChart
            data={data}
            // Add a bottom margin to make space for the custom legend
            margin={{ top: 10, right: 10, left: -25, bottom: 15 }}
            barGap={4} // Pixels between the two grouped bars
          >
            <defs>
              {/* Vibrant orange gradient matching your other app components */}
              <linearGradient id="thisWeekGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fde68a" /> {/* amber-200 */}
                <stop offset="100%" stopColor="#ea580c" /> {/* orange-600 */}
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={true}
              horizontal={true}
              stroke="#dddddd" // slate-100
            />

            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 12, fontWeight: 500 }}
              dy={8}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 12 }}
              domain={[0, 8]}
              ticks={[0, 2, 4, 6, 8]}
            />

            {/* Last Week - Soft blue-grey flat color */}
            <Bar
              dataKey="lastWeek"
              name="Last week"
              fill="#cbd5e1" // slate-300
              radius={[4, 4, 0, 0]}
              barSize={16}
            />

            {/* This Week - Dynamic Glowing Orange */}
            <Bar
              dataKey="thisWeek"
              name="This week"
              fill="url(#thisWeekGradient)"
              radius={[4, 4, 0, 0]}
              barSize={16}
            />

            {/* Integrated Legend matches your customized dot layout */}
            <Legend
              verticalAlign="bottom"
              height={36}
              iconType="circle"
              iconSize={8}
              wrapperStyle={{
                fontSize: "12px",
                fontWeight: 500,
                paddingTop: "10px",
              }}
              formatter={(value: any, entry: any) => {
                // Apply matching colors directly to the legend text labels
                const color =
                  entry.color === "url(#thisWeekGradient)"
                    ? "#ea580c"
                    : "#94a3b8";
                return <span style={{ color }}>{value}</span>;
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WeeklyComparisonChart;
