"use client";
import React, { useState } from "react";
import { Plus } from "lucide-react";
import Modal from "../modal";
import HabitForm from "@/components/common/habit-form";
import { Button } from "@/components/ui/button";

const AddHabitButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <Button
        className="bg-linear-to-r from-brand-300 to-brand-700 px-3 py-5 transition-all hover:-translate-y-0.5"
        onClick={() => setIsOpen(true)}
      >
        <Plus size={18} />
        <p className="pl-1">New Habit</p>
      </Button>

      <Modal isOpen={isOpen} onClose={closeModal}>
        <HabitForm
          onClose={closeModal}
          onSave={() => {}}
          buttonLabel="Create habit"
        />
      </Modal>
    </>
  );
};

export default AddHabitButton;
