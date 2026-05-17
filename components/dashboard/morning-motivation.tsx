"use client";

import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";

const MorningMotivation = () => {
  const [isMotivationChecked, setIsMotivationChecked] = useState(false);

  // Helper function to read the current state safely
  const checkStorage = () => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("morning_motivation_enabled");
      setIsMotivationChecked(saved === "true");
    }
  };

  useEffect(() => {
    // Check state immediately on mount
    checkStorage();

    // Listen for custom events or cross-tab updates
    window.addEventListener("storage", checkStorage);
    window.addEventListener("local-storage-update", checkStorage);

    return () => {
      window.removeEventListener("storage", checkStorage);
      window.removeEventListener("local-storage-update", checkStorage);
    };
  }, []);

  return (
    <>
      {isMotivationChecked && (
        <Card className="glass dark:bg-stone-800 p-3 rounded-lg border-none my-5">
          <p className="text-md dark:text-stone-100 font-semibold">
            Morning motivation
          </p>
          <p className="text-sm text-muted-foreground dark:text-stone-100">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi
            delectus dolores ex ipsam itaque iure molestiae mollitia, nobis non
            nulla officiis porro praesentium quod quos sequi sint tempore totam
            voluptatum?
          </p>
        </Card>
      )}
    </>
  );
};

export default MorningMotivation;
