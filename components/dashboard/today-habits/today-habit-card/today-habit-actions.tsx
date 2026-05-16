"use client";
import { Ellipsis, Flame, Check, Pencil, Archive, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import React, { useState, useTransition, useOptimistic } from "react";
import { archiveHabit, editHabit, toggleHabitCompletion } from "@/lib/actions";
import { Habit } from "@/lib/types";
import Modal from "@/components/forms/modal";
import HabitForm from "@/components/common/habit-form";
import { NewHabit } from "@/lib/schema";

const TodayHabitActions = ({
  habit,
  completed,
  activeStreak,
}: {
  habit: Habit;
  completed: boolean;
  activeStreak: number;
}) => {
  const [isEditOpen, setIsEditOpen] = useState(false); // 1. Locally control layout visibility
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [optimisticCompleted, setOptimisticCompleted] = useOptimistic(
    completed,
    (state, newCompletedValue: boolean) => newCompletedValue,
  );
  useState(completed);

  const handleToggle = () => {
    startTransition(async () => {
      try {
        // 2. Instantly flip the state visually before the network request goes out
        setOptimisticCompleted(!completed);

        // 3. Fire off the backend mutation
        await toggleHabitCompletion(habit._id, completed);
        router.refresh();
      } catch (error) {
        console.error("Failed to update habit:", error);
      }
    });
  };

  const handleSave = async (data: NewHabit) => {
    await editHabit(habit._id, data);
    setIsEditOpen(false);
  };

  const handleArchive = async () => {
    startTransition(async () => {
      try {
        await archiveHabit(habit._id);
        router.refresh();
      } catch (error) {
        console.error("Failed to archive habit:", error);
      }
    });
  };

  const handleDelete = () => {};

  return (
    <div className="flex gap-4">
      <div className="flex gap-0.5 items-center">
        <Flame size={16} className="text-red-500/80" />
        <p className="text-sm">{activeStreak}</p>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="hover:bg-transparent active:bg-transparent"
          >
            <Ellipsis className="mt-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault();
                setIsEditOpen(true);
              }}
            >
              <Pencil className="mr-2" size={14} />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={handleArchive}>
              <Archive />
              Archive
            </DropdownMenuItem>
            <DropdownMenuItem variant="destructive" onSelect={handleDelete}>
              <Trash2 />
              Delete
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)}>
        <HabitForm
          buttonLabel="Save changes"
          onClose={() => setIsEditOpen(false)}
          onSave={(data) => {
            handleSave(data);
          }}
          initialData={{
            name: habit.name,
            description: habit.description,
            category: habit.category,
            frequency: habit.frequency,
            color: habit.color,
            icon: habit.icon,
          }}
        />
      </Modal>

      {/*<EditHabitModal*/}
      {/*  habit={habit}*/}
      {/*  isOpen={isEditOpen}*/}
      {/*  onClose={() => setIsEditOpen(false)}*/}
      {/*/>*/}
      <button
        className={`flex items-center bg-linear-to-r ${optimisticCompleted ? "from-amber-500 to-amber-700 text-white shadow-md border-2" : "bg-amber-200/50 text-amber-500/60 border-amber-500/60 border-2"}  rounded-full p-2.5  ${isPending ? "pointer-events-none" : ""} active:scale-85 transition-transform duration-300`}
        onClick={handleToggle}
        disabled={isPending}
      >
        <Check strokeWidth={3} size={22} />
      </button>
    </div>
  );
};

export default TodayHabitActions;
