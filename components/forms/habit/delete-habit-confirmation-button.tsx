"use client";
import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import Modal from "../modal";
import DeleteHabitForm from "./delete-habit-form";
import { Button } from "@/components/ui/button";
import { Habit } from "@/lib/types";

const DeleteHabitConfirmationButton = ({
  habit,
  label = "",
}: {
  habit: Habit;
  label?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <Button
        variant="ghost"
        className="flex items-center gap-2 cursor-pointer justify-start hover:opacity-80 transition p-0"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <Trash2 size={18} className="text-red-500 dark:text-red-300" />
        {label}
      </Button>

      <Modal isOpen={isOpen} onClose={closeModal}>
        <DeleteHabitForm onClose={closeModal} habit={habit} />
      </Modal>
    </>
  );
};

export default DeleteHabitConfirmationButton;
