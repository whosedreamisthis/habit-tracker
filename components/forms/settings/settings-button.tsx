"use client";
import React, { useState } from "react";
import { Settings } from "lucide-react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";

const Modal = dynamic(() => import("../modal"), { ssr: false });
const SettingsForm = dynamic(() => import("./settings-form"), { ssr: false });

const SettingsButton = ({ showLabel }: { showLabel: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <Button
        variant="ghost"
        className={`flex items-center gap-3 cursor-pointer justify-start hover:bg-stone-100 dark:hover:bg-white/5 transition p-2 rounded-lg w-fit ${
          showLabel ? "-ml-2" : "rounded-full"
        }`}
        onClick={() => setIsOpen(true)}
        aria-label="Settings"
      >
        <Settings size={20} />
        {showLabel && (
          <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
            Settings
          </p>
        )}
      </Button>

      <Modal isOpen={isOpen} onClose={closeModal}>
        <SettingsForm onClose={closeModal} />
      </Modal>
    </>
  );
};

export default SettingsButton;
