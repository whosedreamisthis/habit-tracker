import React from "react";
import { getAllHabits } from "@/lib/actions";
import GridHeader from "@/components/habit-tracker-grid/grid-header";
import GridRow from "@/components/habit-tracker-grid/grid-row";

const HabitTrackerGrid = async () => {
  const habits = await getAllHabits({ status: "active" });
  return (
    <div className="mt-5 bg-white rounded-lg p-5 w-full flex flex-col">
      <div className="w-full overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-100">
        <div className="min-w-112.5 w-full">
          <GridHeader />
          <hr className="my-2 text-muted-foreground" />
          <div className="mt-4">
            {habits.map((habit) => {
              return <GridRow key={habit._id} habit={habit} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HabitTrackerGrid;
