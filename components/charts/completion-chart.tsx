"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import React from "react";

// Define the shape of our data for TypeScript
export interface ChartDataPoint {
  name: string;
  completions: number;
}

const CompletionChart = ({
  title,
  data,
}: {
  title: string;
  data: ChartDataPoint[];
}) => {
  return (
    <div className="h-80 w-full bg-white rounded-2xl  shadow-sm p-5 mt-5">
      <p className="text-sm font-bold text-slate-800 mb-6">{title}</p>

      <div className="h-56 w-full">
        <ResponsiveContainer
          width="100%"
          height="100%"
          initialDimension={{ width: 100, height: 50 }}
        >
          <BarChart
            data={data}
            margin={{ top: 10, right: 0, left: -25, bottom: -10 }}
          >
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#fbbf24" />
                <stop offset="95%" stopColor="#ea580c" />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={true}
              horizontal={true}
              stroke="#dddddd"
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 12 }}
              dy={1}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 12 }}
              interval={0}
              allowDecimals={false}
              {...(() => {
                const max = Math.max(
                  ...data.map((d) => Math.ceil(d.completions)),
                  0,
                );
                const ticks = Array.from({ length: max + 3 }, (_, i) => i);
                return {
                  domain: [0, max + 2],
                  ticks: ticks,
                };
              })()}
            />
            {/* This cursor creates the gray box highlight */}
            <Tooltip
              cursor={{ fill: "#f1f5f9", opacity: 0.6 }}
              content={() => null}
            />
            <Bar
              dataKey="completions"
              fill="url(#barGradient)"
              radius={[6, 6, 0, 0]}
              barSize={60}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CompletionChart;
