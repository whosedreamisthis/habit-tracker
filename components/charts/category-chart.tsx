"use client";

import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { COLORS } from "@/lib/constants";

interface CategoryData {
  name: string;
  value: number;
}

const CategoryChart = ({ data }: { data: CategoryData[] }) => {
  return (
    <div className="h-80 w-full bg-white p-6 rounded-2xl border border-slate-100 shadow-sm mt-5">
      <p className="text-sm font-bold text-slate-800 mb-2">
        Completions by category
      </p>

      <div className="h-48 w-full">
        <ResponsiveContainer
          width="100%"
          height="100%"
          initialDimension={{ width: 100, height: 50 }}
        >
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={data.length > 1 ? 5 : 0} // No gap if only one category
              dataKey="value"
              stroke="none"
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend wraps automatically if there are many categories */}
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-6">
        {data.map((entry, index) => {
          const color = COLORS[index % COLORS.length];
          return (
            <div key={entry.name} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: color }}
              />
              <span className="text-xs font-semibold" style={{ color: color }}>
                {entry.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryChart;
