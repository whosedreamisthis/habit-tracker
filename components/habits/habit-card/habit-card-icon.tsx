const HabitCardIcon = ({ icon, color }: { icon: string; color: string }) => {
  return (
    <div className="relative flex items-center justify-center w-10 h-10">
      <div
        className="absolute inset-0 opacity-20 rounded-md"
        style={{ backgroundColor: color }}
      />

      {/* Icon Layer - This is 100% solid */}
      <div className="relative z-10">
        <p className="text-xl font-bold">{icon} </p>
      </div>
    </div>
  );
};

export default HabitCardIcon;
