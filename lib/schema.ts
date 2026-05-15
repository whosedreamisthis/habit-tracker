import { z } from "zod";

export const newHabitSchema = z.object({
  name: z.string().min(1, "Name is required").max(50),
  description: z.string().min(1, "Description is required").max(200),
  category: z.string(),
  frequency: z.string(),
  icon: z.string(),
  color: z.string(),
});

export type NewHabit = z.infer<typeof newHabitSchema>;
