import React from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FormSelectProps {
  label: string;
  id: string;
  error?: string;
  className?: string;
  placeholder?: string;
  options: { value: string; label: string }[];
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
}

export const FormSelect: React.FC<FormSelectProps> = ({
  label,
  id,
  error,
  className,
  placeholder,
  options,
  value,
  onChange,
  onBlur,
}) => {
  return (
    <div className="flex flex-col gap-2 w-full mb-4">
      <Label htmlFor={id}>{label}</Label>
      <Select value={value || ""} onValueChange={onChange}>
        <SelectTrigger
          id={id}
          onBlur={onBlur}
          className={`focus-visible:ring-brand-500 bg-white rounded-md w-full ${className || ""}`}
        >
          <SelectValue placeholder={placeholder || "Select an option"} />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem
              key={opt.value}
              value={opt.value}
              className="focus:bg-brand-700 focus:text-white data-highlighted:bg-brand-700 data-highlighted:text-white cursor-pointer"
            >
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

FormSelect.displayName = "FormSelect";
