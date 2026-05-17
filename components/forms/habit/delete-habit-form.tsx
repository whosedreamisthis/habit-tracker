// settings-form.tsx (and similarly for your other two forms)
import React from "react";
import FormHeader from "../form-header";

const DeleteHabitForm = ({ onClose }: { onClose: () => void }) => {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <FormHeader title="Delete habit?" onClose={onClose} />
    </form>
  );
};

export default DeleteHabitForm;
