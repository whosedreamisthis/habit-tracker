"use client";

import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { ICONS } from "@/lib/constants";

const FormIcon = () => {
  const [selectedIcon, setSelectedIcon] = useState(0);

  return (
    <div>
      <Label htmlFor="icon" className="mb-3">
        Icon
      </Label>
      <div className="flex flex-wrap gap-2">
        {ICONS.map((icon, index) => (
          <Button
            type="button"
            onClick={() => {
              setSelectedIcon(index);
            }}
            key={icon}
            className={`${selectedIcon === index ? "border-2 border-brand-500 bg-brand-500/20" : "bg-white"} h-10 w-10 flex items-center justify-center  rounded-lg`}
          >
            <p className="text-xl">{icon}</p>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default FormIcon;
