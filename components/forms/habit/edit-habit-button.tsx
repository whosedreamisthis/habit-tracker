"use client";
import React, { useState } from "react";
import { Pencil } from "lucide-react";
import Modal from "../modal";
import HabitForm from "@/components/common/habit-form";
import { Button } from "@/components/ui/button";

interface Props {
  description: string;
  name: string;
  frequency: string;
  category: string;
  color: string;
  icon: string;
}

const EditHabitButton = ({
  description,
  name,
  frequency,
  category,
  color,
  icon,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);

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
