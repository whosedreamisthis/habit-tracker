const HabitIcon = ({
  icon,
  color,
  isSmall = false,
}: {
  icon: string;
  color: string;
  isSmall?: boolean;
}) => {
  return (
    <div
      className={`relative flex items-center justify-center ${isSmall ? "w-7 h-7" : "w-10 h-10"}`}
    >
      <div
        className="absolute inset-0 opacity-20 rounded-md"
        style={{ backgroundColor: color }}
      />

      {/* Icon Layer - This is 100% solid */}
      <div className="relative z-10">
        <p className={`${isSmall ? "text-ms" : "text-xl"} font-bold`}>{icon}</p>
      </div>
    </div>
  );
};

export default HabitIcon;
