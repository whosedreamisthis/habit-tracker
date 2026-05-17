import React from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface FormTextareaProps extends Omit<
  React.ComponentPropsWithRef<typeof Textarea>,
  "id" | "value"
> {
  label: string;
  id: string;
  placeholder?: string;
  error?: string;
  value?: string;
}

export const FormTextarea = React.forwardRef<
  HTMLTextAreaElement,
  FormTextareaProps
>(({ label, id, error, placeholder, className, value, ...props }, ref) => {
  return (
    <div className="flex flex-col gap-2 w-full mb-4">
      <Label htmlFor={id}>{label}</Label>
      <Textarea
        id={id}
        value={value}
        ref={ref}
        placeholder={placeholder}
        className={`focus-visible:ring-brand-500 bg-white dark:bg-stone-900 dark:text-stone-100 dark:border-stone-700 rounded-md w-full ${className || ""}`}
        {...props}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
});

FormTextarea.displayName = "FormTextarea";
