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

const AddHabitForm = ({ onClose }: { onClose: () => void }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<NewHabit>({
    resolver: zodResolver(newHabitSchema),
  });

  const onSubmit = (data: NewHabit) => {
    console.log(data);
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
        <FormIcon />
      </form>
    </div>
  );
};

export default AddHabitForm;
