"use client";

import { useTransition } from "react";
import { resetAllHabitsData } from "@/lib/actions";
import { RotateCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function ResetMockDataButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleReset = () => {
    if (
      confirm(
        "Are you sure you want to restore all original mock habits? This will reset your progress.",
      )
    ) {
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
    <Button
      onClick={handleReset}
      disabled={isPending}
      variant="outline"
      className="flex items-center gap-2 w-full justify-start text-amber-700 bg-amber-50 hover:bg-amber-100 border-amber-200"
    >
      <RotateCcw size={16} className={isPending ? "animate-spin" : ""} />
      {isPending ? "Resetting..." : "Reset to Mock Data"}
    </Button>
  );
}
