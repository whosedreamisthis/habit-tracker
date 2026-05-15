"use client";
import React from "react";
import FormHeader from "../form-header";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewHabit, newHabitSchema } from "@/lib/schema";

import { FormInput } from "@/components/forms/fields/form-input";
import { FormTextarea } from "@/components/forms/fields/form-textarea";
import { FormSelect } from "@/components/forms/fields/form-select";
import { CATEGORIES } from "@/lib/constants";
import FormIcon from "@/components/forms/fields/form-icon";
import FormColor from "@/components/forms/fields/form-color";
import AddHabitFormButtons from "@/components/forms/add-habit/add-habit-form-buttons";

const AddHabitForm = ({ onClose }: { onClose: () => void }) => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewHabit>({
    resolver: zodResolver(newHabitSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "",
      frequency: "",
      icon: "💪",
      color: "#6366f1",
    },
  });

  const onSubmit = (data: NewHabit) => {
    console.log("on submit");
    console.log(data);
    reset();
  };

  return (
    <div className="flex flex-col gap-4">
      <FormHeader title="New Habit" onClose={onClose} />

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

        <div className="flex gap-3">
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
                onChange={field.onChange}
                onBlur={field.onBlur}
              />
            )}
          />
        </div>
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
        <AddHabitFormButtons onCancel={onClose} />
      </form>
    </div>
  );
};

export default AddHabitForm;
