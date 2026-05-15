"use client";

import React from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { COLORS } from "@/lib/constants";

const FormColor = ({
  selectedColor,
  onChange,
}: {
  selectedColor: string;
  onChange: (color: string) => void;
}) => {
  return (
    <div className="my-5">
      <Label htmlFor="icon" className="mb-3">
        Color
      </Label>
      <div className="flex flex-wrap gap-2">
        {COLORS.map((color, index) => (
          <Button
            type="button"
            onClick={() => {
              onChange(color);
            }}
            key={index}
            className={`h-9 w-9 rounded-full transition-all ${
              selectedColor === color
                ? "ring-4 ring-offset-2 ring-white" // 👈 Outside ring with a small gap
                : "hover:scale-105"
            }`}
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    </div>
  );
};

export default FormColor;
