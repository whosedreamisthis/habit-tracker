const HabitIcon = ({
  icon,
  color,
  size,
}: {
  icon: string;
  color: string;
  size: "small" | "medium" | "large";
}) => {
  return (
    <div
      className={`relative flex items-center justify-center ${size === "small" ? "w-7 h-7" : size === "medium" ? "w-8.5 h-8.5" : "w-10 h-10"}`}
    >
      <div
        className="absolute inset-0 opacity-20 rounded-md"
        style={{ backgroundColor: color }}
      />

      {/* Icon Layer - This is 100% solid */}
      <div className="relative z-10">
        <p
          className={`${size === "small" ? "text-sm" : size === "medium" ? "text-md" : "text-xl"} font-bold`}
        >
          {icon}
        </p>
      </div>
    </div>
  );
};

export default HabitIcon;
