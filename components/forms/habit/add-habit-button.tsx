"use client";
import React, { useState } from "react";
import { Plus } from "lucide-react";
import Modal from "../modal";
import HabitForm from "@/components/common/habit-form";
import { Button } from "@/components/ui/button";
import { NewHabit } from "@/lib/schema";
import { createHabit } from "@/lib/actions";

const AddHabitButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);

  const handleSave = async (data: NewHabit) => {
    await createHabit(data);
    closeModal();
  };
  return (
    <>
      <Button
        className="bg-linear-to-r from-brand-300 to-brand-700 px-3 py-5  hover:-translate-y-0.5 duration-0"
        onClick={() => setIsOpen(true)}
      >
        <Plus size={18} />
        <p className="pl-1">New Habit</p>
      </Button>

      <Modal isOpen={isOpen} onClose={closeModal}>
        <HabitForm
          onClose={closeModal}
          onSave={handleSave}
          buttonLabel="Create habit"
        />
      </Modal>
    </>
  );
};

export default AddHabitButton;
