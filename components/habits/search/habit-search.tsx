"use client";

import React, { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import HabitCategoryDropdown from "@/components/habits/search/habit-category-dropdown";
import HabitStatus from "@/components/habits/search/habit-status";
import { useRouter, useSearchParams } from "next/navigation";

interface HabitSearchProps {
  currentStatus: string;
  activeCount: number;
  archivedCount: number;
}

const HabitSearch = ({
  currentStatus,
  activeCount,
  archivedCount,
}: HabitSearchProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 1. Maintain local input field text state
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");

  // 2. Use a mutable ref to safely store the timer index without causing re-renders
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  // 3. Fire search updates only when typing actively occurs
  const handleSearchChange = (text: string) => {
    setSearchTerm(text);

    // Clear the previous timer instantly
    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    // Set a new clean countdown
    debounceTimer.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (text) {
        params.set("q", text);
      } else {
        params.delete("q");
      }
      router.push(`?${params.toString()}`);
    }, 300);
  };

  // 4. Update categories cleanly on manual select action click
  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (category && category !== "All categories") {
      params.set("category", category);
    } else {
      params.delete("category");
    }
    router.push(`?${params.toString()}`);
  };

  // 5. Update status cleanly on tab navigation click
  const handleStatusChange = (status: "active" | "archived") => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("status", status);
    router.push(`?${params.toString()}`);
  };

  return (
    /* flex-wrap is the secret sauce here */
    <div className="flex flex-wrap items-center justify-center lg:justify-between gap-4 w-full p-5 bg-white mb-5 rounded-lg">
      {/* Search + Dropdown Group */}
      <div className="flex flex-wrap items-center justify-center gap-4 flex-1 min-w-[320px]">
        <Input
          placeholder="Search habits..."
          /* min-w ensures the input doesn't get squashed to 0px */
          className="flex-1 min-w-25 p-5 text-left focus-visible:ring-brand-500/50"
          value={searchTerm} // 👈 Turn input into a controlled field
          onChange={(e) => handleSearchChange(e.target.value)}
        />
        <div className="shrink-0">
          <HabitCategoryDropdown
            value={searchParams.get("category") || "All categories"}
            onChange={handleCategoryChange}
          />
        </div>
      </div>

      {/* Status Tabs */}
      <div className="shrink-0">
        <HabitStatus
          currentStatus={currentStatus}
          onChange={handleStatusChange}
          activeCount={activeCount}
          archivedCount={archivedCount}
        />
      </div>
    </div>
  );
};

export default HabitSearch;
