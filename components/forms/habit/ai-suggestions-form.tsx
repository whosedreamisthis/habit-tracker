"use client";

import React, { useState, useTransition } from "react";
import { X, ArrowLeft, Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { askAI } from "@/lib/gemini";
import { createHabit } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { Habit } from "@/lib/types";
import FormHeader from "../form-header";

interface AISuggestionsFormProps {
  onClose: () => void;
  habits: Habit[];
}

interface SuggestedHabit {
  name: string;
  description: string;
  category: string;
  icon: string;
  color: string;
}

const AISuggestionsForm = ({ onClose, habits }: AISuggestionsFormProps) => {
  const [step, setStep] = useState(1);
  const [goals, setGoals] = useState("");
  const [productivity, setProductivity] = useState("");
  const [struggles, setStruggles] = useState("");
  const [suggestions, setSuggestions] = useState<SuggestedHabit[]>([]);
  const [isPending, startTransition] = useTransition();
  const [isAdding, setIsAdding] = useState<string | null>(null);
  const router = useRouter();

  const handleNext = () => setStep((s) => s + 1);
  const handleBack = () => setStep((s) => s - 1);

  const getSuggestions = () => {
    startTransition(async () => {
      try {
        const currentHabitNames = habits.map((h) => h.name).join(", ");
        const prompt = `
          Suggest 3 personalized habits based on the following information:
          - Goals: ${goals}
          - Most productive time: ${productivity}
          - Past struggles: ${struggles}
          
          The user already has these habits: ${currentHabitNames}. 
          Do not suggest any of these existing habits.

          Return only a valid JSON array of 3 objects with these keys: 
          "name" (string), "description" (string, max 100 chars), "category" (string), "icon" (emoji), "color" (hex).
          Do not include any other text or markdown formatting.
        `.trim();

        const response = await askAI(prompt);
        // Remove markdown formatting if present
        const cleanResponse = response.replace(/```json|```/g, "").trim();
        const parsed = JSON.parse(cleanResponse);
        setSuggestions(parsed);
        setStep(4);
      } catch (error) {
        console.error("Failed to get suggestions:", error);
      }
    });
  };

  const handleAddHabit = async (habit: SuggestedHabit) => {
    setIsAdding(habit.name);
    try {
      await createHabit({
        name: habit.name,
        description: habit.description,
        category: habit.category,
        frequency: "daily",
        targetDays: 7,
        icon: habit.icon,
        color: habit.color,
      });
      router.refresh();
      // Remove from list after adding
      setSuggestions((prev) => prev.filter((h) => h.name !== habit.name));
    } catch (error) {
      console.error("Failed to add habit:", error);
    } finally {
      setIsAdding(null);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <FormHeader title="AI Habit Suggestions" onClose={onClose} />
      {step <= 3 && (
        <p className="text-sm text-slate-500 dark:text-stone-400">
          Answer 3 quick questions and I'll suggest 3 personalized habits.
        </p>
      )}

      {/* Part 1 */}
      {step === 1 && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="font-medium">
              What are your goals right now?
            </label>
            <textarea
              className="w-full p-3 rounded-lg border border-slate-200 dark:border-stone-700 bg-white dark:bg-stone-900 focus:ring-2 focus:ring-brand-500 outline-none transition-all"
              placeholder="e.g. get fitter, read more, reduce phone time..."
              rows={3}
              value={goals}
              onChange={(e) => setGoals(e.target.value)}
            />
          </div>
          <div className="flex justify-end gap-3 mt-2">
            <Button
              variant="outline"
              onClick={onClose}
              className="bg-white dark:bg-stone-900"
            >
              Cancel
            </Button>
            <Button
              className="bg-linear-to-r from-brand-300 to-brand-700 text-white"
              disabled={!goals.trim()}
              onClick={handleNext}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {/* Part 2 */}
      {step === 2 && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="font-medium">
              When are you most productive during the day?
            </label>
            <textarea
              className="w-full p-3 rounded-lg border border-slate-200 dark:border-stone-700 bg-white dark:bg-stone-900 focus:ring-2 focus:ring-brand-500 outline-none transition-all"
              placeholder="e.g. Early morning, late evenings..."
              rows={3}
              value={productivity}
              onChange={(e) => setProductivity(e.target.value)}
            />
          </div>
          <div className="flex justify-between items-center mt-2">
            <Button
              variant="ghost"
              onClick={handleBack}
              className="flex items-center gap-1"
            >
              <ArrowLeft size={16} /> Back
            </Button>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={onClose}
                className="bg-white dark:bg-stone-900"
              >
                Cancel
              </Button>
              <Button
                className="bg-linear-to-r from-brand-300 to-brand-700 text-white"
                disabled={!productivity.trim()}
                onClick={handleNext}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Part 3 */}
      {step === 3 && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="font-medium">
              What habits have you struggled with?
            </label>
            <textarea
              className="w-full p-3 rounded-lg border border-slate-200 dark:border-stone-700 bg-white dark:bg-stone-900 focus:ring-2 focus:ring-brand-500 outline-none transition-all"
              placeholder="e.g. Gym in the morning, journaling at night..."
              rows={3}
              value={struggles}
              onChange={(e) => setStruggles(e.target.value)}
            />
          </div>
          <div className="flex justify-between items-center mt-2">
            <Button
              variant="ghost"
              onClick={handleBack}
              className="flex items-center gap-1"
            >
              <ArrowLeft size={16} /> Back
            </Button>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={onClose}
                className="bg-white dark:bg-stone-900"
              >
                Cancel
              </Button>
              <Button
                className="bg-linear-to-r from-brand-300 to-brand-700 text-white"
                disabled={!struggles.trim() || isPending}
                onClick={getSuggestions}
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  "Get Suggestions"
                )}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Results View */}
      {step === 4 && (
        <div className="flex flex-col gap-4">
          <p className="font-medium">Here are some habits tailored for you:</p>
          <div className="flex flex-col gap-3">
            {suggestions.map((habit, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-slate-100 dark:border-stone-700 bg-slate-50 dark:bg-stone-900/50 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-xl shrink-0"
                    style={{
                      backgroundColor: `${habit.color}20`,
                      color: habit.color,
                    }}
                  >
                    {habit.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">{habit.name}</h4>
                    <p className="text-xs text-slate-500 dark:text-stone-400 line-clamp-2">
                      {habit.description}
                    </p>
                  </div>
                </div>
                <Button
                  size="sm"
                  className="bg-brand-500 hover:bg-brand-600 text-white flex items-center gap-1 shrink-0"
                  onClick={() => handleAddHabit(habit)}
                  disabled={isAdding === habit.name}
                >
                  {isAdding === habit.name ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <Plus size={14} />
                  )}
                  Add
                </Button>
              </div>
            ))}
            {suggestions.length === 0 && (
              <div className="text-center py-6">
                <p className="text-slate-500">All suggestions added! 🎉</p>
                <Button variant="link" onClick={onClose} className="mt-2">
                  Close
                </Button>
              </div>
            )}
          </div>
          {suggestions.length > 0 && (
            <div className="flex justify-end mt-2">
              <Button variant="ghost" onClick={onClose}>
                Done
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AISuggestionsForm;
