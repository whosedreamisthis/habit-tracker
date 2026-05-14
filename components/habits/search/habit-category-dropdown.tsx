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

const HabitCategoryDropdown = () => {
  return (
    <Select>
      <SelectTrigger className="w-full max-w-48   p-5">
        <SelectValue placeholder="All categories" />
      </SelectTrigger>
      <SelectContent
        onCloseAutoFocus={(e) => e.preventDefault()}
        position="popper"
        sideOffset={5}
      >
        <SelectGroup>
          <SelectItem
            className="data-highlighted:bg-blue-500
    data-highlighted:**:text-white!"
            value="All categories"
          >
            All categories
          </SelectItem>
          {CATEGORIES.map((category) => (
            <SelectItem
              className="data-highlighted:bg-blue-500
    data-highlighted:**:text-white!"
              key={category}
              value={category}
            >
              {category}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default HabitCategoryDropdown;
