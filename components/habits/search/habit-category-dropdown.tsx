"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CATEGORIES } from "@/lib/constants";

interface HabitCategoryDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

const HabitCategoryDropdown = ({
  value,
  onChange,
}: HabitCategoryDropdownProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full max-w-48   p-5 duration-0">
        <SelectValue placeholder="All categories " />
      </SelectTrigger>
      <SelectContent
        onCloseAutoFocus={(e) => e.preventDefault()}
        position="popper"
        sideOffset={5}
      >
        <SelectGroup>
          <SelectItem
            className="data-highlighted:bg-blue-500 data-highlighted:**:text-white! dark:text-stone-300 duration-0"
            value="All categories"
          >
            All categories
          </SelectItem>
          {CATEGORIES.map(({ label, value }) => (
            <SelectItem
              className="data-highlighted:bg-blue-500 data-highlighted:**:text-white! dark:text-stone-300 duration-0"
              key={label}
              value={value}
            >
              {label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default HabitCategoryDropdown;
