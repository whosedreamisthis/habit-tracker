"use client";
import React from "react";
import FormHeader from "../forms/form-header";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewHabit, newHabitSchema } from "@/lib/schema";

import { FormInput } from "@/components/forms/fields/form-input";
import { FormTextarea } from "@/components/forms/fields/form-textarea";
import { FormSelect } from "@/components/forms/fields/form-select";
import { CATEGORIES } from "@/lib/constants";
import FormIcon from "@/components/forms/fields/form-icon";
import FormColor from "@/components/forms/fields/form-color";
import FormTargetDays from "@/components/forms/fields/form-target-days";
import HabitFormButtons from "../forms/habit/habit-form-buttons";

interface HabitFormProps {
  onClose: () => void;
  initialData?: any; // Includes the DB id for editing
  onSave: (data: NewHabit) => void;
  buttonLabel: string;
}

const HabitForm = ({
  onClose,
  initialData,
  onSave,
  buttonLabel,
}: HabitFormProps) => {
  const isEditing = !!initialData;
  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<NewHabit>({
    resolver: zodResolver(newHabitSchema),
    defaultValues: initialData || {
      name: "",
      description: "",
      category: "",
      frequency: "daily",
      targetDays: 7,
      icon: "💪",
      color: "#6366f1",
    },
  });

  const onSubmit = (data: NewHabit) => {
    onSave(data);
    if (!isEditing) reset();
  };

  return (
    <div className="flex flex-col gap-4">
      <FormHeader
        title={isEditing ? "Edit Habit" : "New Habit"}
        onClose={onClose}
      />

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          id="name"
          label="Habit Name"
          placeholder="E.g. Drink 2L of water"
          error={errors.name?.message}
          {...register("name")}
        />

        <FormTextarea
          id="description"
          label="Description"
          placeholder="Why does this habit matter to you?"
          error={errors.description?.message}
          {...register("description")}
        />

        <div className="flex flex-col sm:flex-row gap-3">
          <Controller
            control={control}
            name="category"
            render={({ field }) => (
              <FormSelect
                id="category"
                label="Category"
                placeholder="Choose a category"
                error={errors.category?.message}
                options={CATEGORIES}
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
              />
            )}
          />
          <Controller
            control={control}
            name="frequency"
            render={({ field }) => (
              <FormSelect
                id="frequency"
                label="Frequency"
                placeholder="Choose a frequency"
                error={errors.frequency?.message}
                options={[
                  { value: "daily", label: "Daily" },
                  { value: "weekly", label: "Weekly" },
                ]}
                value={field.value}
                onChange={(val) => {
                  field.onChange(val);
                  if (val === "daily") {
                    setValue("targetDays", 7);
                  } else if (val === "weekly") {
                    // If switching to weekly and it was 7, set to 6
                    setValue("targetDays", 6);
                  }
                }}
                onBlur={field.onBlur}
              />
            )}
          />
        </div>

        <Controller
          control={control}
          name="targetDays"
          render={({ field }) => (
            <FormTargetDays
              label="Target Days per Week"
              value={field.value}
              error={errors.targetDays?.message}
              onChange={(val) => {
                field.onChange(val);
                if (val === 7) {
                  setValue("frequency", "daily");
                } else {
                  setValue("frequency", "weekly");
                }
              }}
            />
          )}
        />
        <Controller
          control={control}
          name="icon"
          render={({ field }) => (
            <div className="flex flex-col gap-1">
              <FormIcon selectedIcon={field.value} onChange={field.onChange} />
              {errors.icon?.message && (
                <p className="text-sm text-red-500">{errors.icon.message}</p>
              )}
            </div>
          )}
        />

        {/* 2. Wire up FormColor using a Controller 👇 */}
        <Controller
          control={control}
          name="color"
          render={({ field }) => (
            <div className="flex flex-col gap-1">
              <FormColor
                selectedColor={field.value}
                onChange={field.onChange}
              />
              {errors.color?.message && (
                <p className="text-sm text-red-500">{errors.color.message}</p>
              )}
            </div>
          )}
        />
        <HabitFormButtons onCancel={onClose} buttonLabel={buttonLabel} />
      </form>
    </div>
  );
};

export default HabitForm;
