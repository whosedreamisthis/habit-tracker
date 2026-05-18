import React from "react";
import { Button } from "@/components/ui/button";

const HabitFormButtons = ({
  onCancel,
  buttonLabel,
}: {
  onCancel: () => void;
  buttonLabel: string;
}) => {
  return (
    <div className="flex justify-end gap-2">
      <Button
        type="button"
        className="px-3 py-5  hover:-translate-y-0.5 bg-white text-black"
        onClick={onCancel}
      >
        Cancel
      </Button>
      <Button
        type="submit"
        className=" px-3 py-5  hover:-translate-y-0.5 bg-linear-to-r from-brand-300 to-brand-700"
      >
        {buttonLabel}
      </Button>
    </div>
  );
};

export default HabitFormButtons;
