"use client";
import React, { useState } from "react";
import { Pencil } from "lucide-react";
import Modal from "../modal";
import HabitForm from "@/components/common/habit-form";
import { Button } from "@/components/ui/button";
import { Habit } from "@/lib/types";

const EditHabitButton = ({ habit }: { habit: Habit }) => {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);
  const { description, name, frequency, category, color, icon } = habit;
  return (
    <>
      <Button
        className="hover:opacity-70 transition-opacity bg-transparent p-0"
        onClick={() => setIsOpen(true)}
      >
        <Pencil className="text-slate-500" size={16} />
      </Button>

      <Modal isOpen={isOpen} onClose={closeModal}>
        <HabitForm
          buttonLabel="Save changes"
          onClose={closeModal}
          onSave={() => {
            closeModal();
          }}
          initialData={{
            name,
            description,
            category,
            frequency,
            color,
            icon,
          }}
        />
      </Modal>
    </>
  );
};

export default EditHabitButton;
