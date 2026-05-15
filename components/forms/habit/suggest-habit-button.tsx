"use client";
import React, { useState } from "react";
import { Sparkle } from "lucide-react";
import Modal from "../modal";
import SuggestHabitForm from "./suggest-habit-form";
import { Button } from "@/components/ui/button";

const SuggestHabitButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <Button
        className="flex items-center gap-2 cursor-pointer hover:opacity-80 text-black bg-white p-5 transition-all hover:-translate-y-0.5"
        onClick={() => setIsOpen(true)}
      >
        <Sparkle size={18} />
        <p className="pl-1">Suggest a habit</p>
      </Button>

      <Modal isOpen={isOpen} onClose={closeModal}>
        <SuggestHabitForm onClose={closeModal} />
      </Modal>
    </>
  );
};

export default SuggestHabitButton;
