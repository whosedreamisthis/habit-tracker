import mongoose, { Schema } from "mongoose";

// Completion Schema
const CompletionSchema = new Schema(
  {
    date: { type: Schema.Types.Mixed, required: true }, // Date | string
  },
  { _id: true },
);

// Habit Schema
const HabitSchema = new Schema(
  {
    userId: { type: String, required: true, index: true },
    name: { type: String, required: true },
    description: { type: String, default: "" },
    frequency: { type: String, enum: ["daily", "weekly"], default: "daily" },
    status: { type: String, enum: ["active", "archived"], default: "active" },
    targetDays: { type: Number, default: 7 },
    order: { type: Number, default: 0 },
    category: { type: String, required: true },
    color: { type: String, required: true },
    icon: { type: String, required: true },
    activeStreak: { type: Number, default: 0 },
    bestStreak: { type: Number, default: 0 },
    isCompletedToday: { type: Boolean, default: false },
    _streakProb: { type: Number, default: 0.5 },
    completions: [CompletionSchema],
  },
  { timestamps: true },
);

// User Schema
const UserSchema = new Schema(
  {
    _id: { type: String, required: true }, // Using Clerk userId as _id
    name: { type: String, required: true },
    email: { type: String, required: true },
    avatar: { type: String, default: "" },
    morningMotivation: { type: Boolean, default: true },
  },
  { timestamps: true, _id: false },
);

// Export Models
export const User = mongoose.models.User || mongoose.model("User", UserSchema);
export const Habit =
  mongoose.models.Habit || mongoose.model("Habit", HabitSchema);
