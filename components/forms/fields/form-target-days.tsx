import React from "react";
import { Label } from "@/components/ui/label";

interface FormTargetDaysProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  error?: string;
}

const FormTargetDays: React.FC<FormTargetDaysProps> = ({
  label,
  value,
  onChange,
  error,
}) => {
  return (
    <div className="flex flex-col gap-2 w-full mb-4">
      <Label>{label}</Label>
      <div className="flex items-center gap-1 bg-slate-50 dark:bg-stone-900 p-1 rounded-lg border border-slate-200 dark:border-stone-700">
        {[1, 2, 3, 4, 5, 6, 7].map((day) => (
          <button
            key={day}
            type="button"
            onClick={() => onChange(day)}
            className={`flex-1 py-2 text-sm font-medium rounded-md  ${
              value === day
                ? "bg-brand-600 text-white shadow-sm"
                : "text-slate-600 dark:text-stone-400 hover:bg-slate-200 dark:hover:bg-stone-700"
            }`}
          >
            {day}
          </button>
        ))}
      </div>
      <p className="text-xs text-slate-500 italic">
        {value === 7 ? "Daily habit selected" : `${value} days per week`}
      </p>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default FormTargetDays;
