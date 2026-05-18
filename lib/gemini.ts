"use server";

import { GoogleGenAI } from "@google/genai";
import { Habit } from "@/lib/types";

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({});

export async function askAI(prompt: string, habits?: Habit[]) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `${prompt}\n\nHabits: ${habits ? JSON.stringify(habits) : ""} `,
    });
    return response.text; // Return the text so the calling component can read it
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    if (
      error?.status === 429 ||
      error?.message?.includes("429") ||
      error?.message?.includes("quota")
    ) {
      throw error; // Re-throw to be handled by the caller with fallback data
    }
    throw new Error("Failed to generate content");
  }
}
