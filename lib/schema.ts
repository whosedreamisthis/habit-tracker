import { z } from "zod";

export const newHabitSchema = z.object({
  name: z.string().min(1, "Name is required").max(50),
  description: z.string().min(1, "Description is required").max(200),
  category: z.string("Category is required").min(1, "Category is required"),
  frequency: z.enum(["daily", "weekly"], "Frequency is required"),
  targetDays: z.number().min(1).max(7),
  icon: z.string(),
  color: z.string(),
});

export type NewHabit = z.infer<typeof newHabitSchema>;
