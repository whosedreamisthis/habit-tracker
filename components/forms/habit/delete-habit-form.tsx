// settings-form.tsx (and similarly for your other two forms)
import React from "react";
import FormHeader from "../form-header";
import { Habit } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { deleteHabit } from "@/lib/actions";

const DeleteHabitForm = ({
  habit,
  onClose,
}: {
  habit: Habit;
  onClose: () => void;
}) => {
  const handleDelete = async () => {
    await deleteHabit(habit._id);
    onClose();
  };

  return (
    <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
      <FormHeader title="Delete habit?" onClose={onClose} />
      <p className="dark:text-stone-300">
        This will permanently delete{" "}
        <span className="font-semibold dark:text-stone-100">{`${habit.name} `}</span>{" "}
        and all it&apos;s history. This can&apos;t be undone.
      </p>
      <div className="flex gap-2 justify-end items-center">
        <Button
          className="min-w-[100px] bg-white dark:bg-stone-900 dark:text-stone-100 py-5 "
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          className="min-w-[100px] bg-red-500 text-white p-5 hover:bg-red-600"
          onClick={handleDelete}
        >
          Delete
        </Button>
      </div>
    </form>
  );
};

export default DeleteHabitForm;
