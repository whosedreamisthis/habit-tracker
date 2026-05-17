"use client";
import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import Modal from "../modal";
import DeleteHabitForm from "./delete-habit-form";
import { Button } from "@/components/ui/button";

const DeleteHabitConfirmationButton = ({
  habitId,
  label = "",
}: {
  habitId: string;
  label?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);
  console.log("habitId", habitId);

  return (
    <>
      <Button
        variant="ghost"
        className="flex items-center gap-2 cursor-pointer justify-start hover:opacity-80 transition p-0"
        onClick={() => {
          console.log("CLICK");
          setIsOpen(true);
        }}
      >
        <Trash2 size={18} />
        {label}
      </Button>

      <Modal isOpen={isOpen} onClose={closeModal}>
        <DeleteHabitForm onClose={closeModal} />
      </Modal>
    </>
  );
};

export default DeleteHabitConfirmationButton;
