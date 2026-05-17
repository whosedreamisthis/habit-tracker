import React from "react";

interface CircularProgressProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
}

const CircularProgress = ({
  percentage,
  size = 120,
  strokeWidth = 10,
}: CircularProgressProps) => {
  const clampedValue = Math.min(Math.max(percentage, 0), 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (clampedValue / 100) * circumference;

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transform -rotate-90"
      >
        {/* Define the Gradient */}
        <defs>
          <linearGradient
            id="progressGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#fbbf24" /> {/* tailwind orange-400 */}
            <stop offset="100%" stopColor="#ea580c" />{" "}
            {/* tailwind orange-600 */}
          </linearGradient>
        </defs>

        {/* Background Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgb(220,220,220)" // gray-100
          strokeOpacity="1"
          strokeWidth={strokeWidth}
          fill="transparent"
        />

        {/* Progress Bar with Gradient */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#progressGradient)" // Reference the ID here
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          style={{
            strokeDashoffset: offset,
            transition: "stroke-dashoffset 0.8s ease-out",
          }}
          strokeLinecap="round"
        />
      </svg>

      {/* Centered Text */}
      <div className="absolute flex flex-col items-center justify-center">
        <span className="font-bold text-slate-800 leading-none text-sm">
          {clampedValue}%
        </span>
      </div>
    </div>
  );
};

export default CircularProgress;
