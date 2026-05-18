"use client";

import React, { useState } from "react";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { format, addWeeks, subWeeks, startOfWeek, endOfWeek } from "date-fns";

const WeekPicker = () => {
  // Initialize with the current date
  const [currentDate, setCurrentDate] = useState(new Date());

  // Calculate Monday and Sunday of the current week
  // weekStartsOn: 1 sets Monday as the start of the week
  const monday = startOfWeek(currentDate, { weekStartsOn: 1 });
  const sunday = endOfWeek(currentDate, { weekStartsOn: 1 });

  const handlePrevWeek = () => setCurrentDate(subWeeks(currentDate, 1));
  const handleNextWeek = () => setCurrentDate(addWeeks(currentDate, 1));

  return (
    <div className="flex items-center gap-2 mt-2 justify-start">
      {/* Navigation Buttons */}
      <button
        onClick={handlePrevWeek}
        className="p-2 hover:bg-slate-100 rounded-full "
      >
        <ChevronLeft size={18} className="text-slate-600" />
      </button>

      {/* The Date Display */}
      <div className="flex gap-2 items-center justify-center bg-white h-10 rounded-lg px-4 shadow-sm border select-none">
        <CalendarDays size={16} className="text-brand-600" />
        <p className="text-sm font-medium whitespace-nowrap w-40">
          {format(monday, "MMM d")} - {format(sunday, "MMM d, yyyy")}
        </p>
      </div>

      <button
        onClick={handleNextWeek}
        className="p-2 hover:bg-slate-100 rounded-full"
      >
        <ChevronRight size={18} className="text-slate-600" />
      </button>
    </div>
  );
};

export default WeekPicker;
