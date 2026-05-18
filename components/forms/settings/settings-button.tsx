"use client";
import React, { useState } from "react";
import { Settings } from "lucide-react";
import Modal from "../modal";
import SettingsForm from "./settings-form";
import { Button } from "@/components/ui/button";

const SettingsButton = ({ showLabel }: { showLabel: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <Button
        variant="ghost"
        className="flex items-center gap-2 cursor-pointer justify-start hover:opacity-80 transition p-0"
        onClick={() => setIsOpen(true)}
        aria-label="Settings"
      >
        <Settings size={18} />
        {showLabel && <p className="pl-1">Settings</p>}
      </Button>

      <Modal isOpen={isOpen} onClose={closeModal}>
        <SettingsForm onClose={closeModal} />
      </Modal>
    </>
  );
};

export default SettingsButton;
