import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface FormInputProps extends Omit<
  React.ComponentPropsWithRef<typeof Input>,
  "id" | "value"
> {
  label: string;
  id: string; // Required for htmlFor matching
  error?: string;
  value?: string;
  placeholder?: string;
}

export const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      label,
      id,
      error,
      type = "text",
      placeholder,
      className,
      value,
      ...props
    },
    ref,
  ) => {
    return (
      <div className="flex flex-col gap-2 w-full mb-4">
        <Label htmlFor={id}>{label}</Label>
        <Input
          id={id}
          type={type}
          value={value}
          ref={ref}
          placeholder={placeholder}
          className={`focus-visible:ring-brand-500 bg-white rounded-md w-full ${className || ""}`}
          {...props}
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  },
);

FormInput.displayName = "FormInput";
