import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content Box */}
      <div className="relative bg-gray-100 rounded-xl shadow-xl w-full max-w-md p-6 z-10 animate-in fade-in zoom-in-95 duration-150">
        {children}
      </div>
    </div>
  );
};

export default Modal;
