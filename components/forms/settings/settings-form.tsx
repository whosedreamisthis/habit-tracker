// settings-form.tsx (and similarly for your other two forms)
import React from "react";
import FormHeader from "../form-header";
import ResetMockDataButton from "./reset-mock-data-button";

const SettingsForm = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="flex flex-col gap-6">
      <FormHeader title="Settings" onClose={onClose} />

      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
          Data Management
        </h3>
        <ResetMockDataButton />
        <p className="text-xs text-slate-400">
          Resetting will restore the application to its original state. All
          custom habits and completions will be lost.
        </p>
      </div>
    </div>
  );
};

export default SettingsForm;
