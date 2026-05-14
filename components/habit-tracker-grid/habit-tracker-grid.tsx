import React from "react";
import { getAllHabits } from "@/lib/actions";
import GridHeader from "@/components/habit-tracker-grid/grid-header";
import GridRow from "@/components/habit-tracker-grid/grid-row";

const HabitTrackerGrid = async () => {
  const habits = await getAllHabits();
  return (
    <div className="my-30 bg-white rounded-lg p-5">
      <GridHeader />
      <hr className="my-2 text-muted-foreground" />
      <div className="mt-4">
        {habits.map((habit) => {
          return <GridRow key={habit._id} {...habit} />;
        })}
        ,
      </div>
    </div>
  );
};

export default HabitTrackerGrid;
