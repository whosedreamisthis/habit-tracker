"use client";

import { useTransition } from "react";
import { resetAllHabitsData } from "@/lib/actions";
import { RotateCcw } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ResetMockDataButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleReset = () => {
    if (confirm("Are you sure you want to restore all original mock habits?")) {
      startTransition(async () => {
        try {
          await resetAllHabitsData();
          router.refresh();
        } catch (error) {
          console.error("Failed to reset data:", error);
        }
      });
    }
  };

  return (
    <button
      onClick={handleReset}
      disabled={isPending}
      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-md transition-colors disabled:opacity-50"
    >
      <RotateCcw size={16} className={isPending ? "animate-spin" : ""} />
      {isPending ? "Resetting..." : "Reset to Mock Data"}
    </button>
  );
}
