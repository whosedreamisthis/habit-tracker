"use client";

import { Trophy, Flame, Trash2, Archive, ArchiveRestore } from "lucide-react";
import EditHabitButton from "@/components/forms/habit/edit-habit-button";
import { Habit } from "@/lib/types";
import { useTransition } from "react";
import { archiveHabit, restoreHabit } from "@/lib/actions";
import { useRouter } from "next/navigation";

const HabitCardStreaksAndButtons = ({ habit }: { habit: Habit }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const {
    _id,
    description,
    name,
    frequency,
    category,
    color,
    icon,
    status,
    activeStreak,
    bestStreak,
  } = habit;

  const handleArchiveToggle = () => {
    startTransition(async () => {
      try {
        if (status === "active") {
          await archiveHabit(_id);
        } else {
          await restoreHabit(_id);
        }
        router.refresh();
      } catch (error) {
        console.error("Failed to toggle archive status:", error);
      }
    });
  };

  return (
    <div className="flex flex-wrap items-center justify-end gap-y-3 gap-x-6">
      {/* Group 1: Streaks (Flame and Trophy) */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="flex items-center gap-1">
          <Flame size={14} className="text-brand-600" />
          <p className="text-sm font-medium">{activeStreak}</p>
        </div>
        <div className="flex items-center gap-1">
          <Trophy size={14} className="text-brand-600" />
          <p className="text-sm font-medium">{bestStreak}</p>
        </div>
      </div>

      {/* Group 2: Action Buttons */}
      <div className="flex items-center gap-4 shrink-0">
        <EditHabitButton
          description={description}
          name={name}
          frequency={frequency}
          category={category}
          color={color}
          icon={icon}
        />

        <button
          className={`hover:opacity-70 transition-opacity ${isPending ? "opacity-50 pointer-events-none" : ""}`}
          onClick={handleArchiveToggle}
          disabled={isPending}
        >
          {status === "active" ? (
            <Archive className="text-slate-500" size={16} />
          ) : (
            <ArchiveRestore className="text-slate-500" size={16} />
          )}
        </button>
        <button className="hover:opacity-70 transition-opacity">
          <Trash2 className="text-red-500" size={16} />
        </button>
      </div>
    </div>
  );
};

export default HabitCardStreaksAndButtons;
