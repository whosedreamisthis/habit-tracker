import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getColor = (count: number) => {
  if (count === 0) return "bg-slate-100";
  if (count === 1) return "bg-amber-200";
  if (count === 2) return "bg-amber-400";
  if (count === 3) return "bg-orange-500";
  return "bg-orange-700";
};
