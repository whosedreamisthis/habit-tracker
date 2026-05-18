import { X } from "lucide-react";

const FormHeader = ({
  title,
  onClose,
}: {
  title: string;
  onClose: () => void;
}) => {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-xl font-bold">{title}</h2>
      <button onClick={onClose} aria-label="Close modal">
        <X className="h-5 w-5 text-muted-foreground" />
      </button>
    </div>
  );
};

export default FormHeader;
