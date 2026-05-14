"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import React from "react";

const data = [
  { name: "Mon", completions: 6 },
  { name: "Tue", completions: 4 },
  { name: "Wed", completions: 4 },
  { name: "Thu", completions: 4 },
  { name: "Fri", completions: 0 },
  { name: "Sat", completions: 0 },
  { name: "Sun", completions: 0 },
];

const CompletionChart = ({ title }: { title: string }) => {
  return (
    <div className="h-75 w-full bg-white p-4 rounded-xl mt-5 ">
      <p className="text-md pb-3">{title}</p>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#ea580c" stopOpacity={0.8} />
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
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#94a3b8", fontSize: 12 }}
          />
          <Bar
            dataKey="completions"
            fill="url(#barGradient)"
            radius={[6, 6, 0, 0]}
            barSize={40}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CompletionChart;
