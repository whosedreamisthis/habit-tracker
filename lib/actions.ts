"use server";

import { mockHabits } from "@/lib/mock-data";

export const getAllHabits = async () => {
  return mockHabits;
};
