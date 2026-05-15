// settings-form.tsx (and similarly for your other two forms)
import React from "react";
import FormHeader from "../form-header";

const SettingsForm = ({ onClose }: { onClose: () => void }) => {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <FormHeader title="AI Habit Suggestions" onClose={onClose} />
      {/* Form fields go here */}
    </form>
  );
};

export default SettingsForm;
