import React from "react";
import { Sparkles } from "lucide-react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { cookies } from "next/headers";
import { loginAsDemo } from "@/lib/actions";

export default async function RootPage() {
  const { userId } = await auth();
  const cookieStore = await cookies();
  const isDemo = cookieStore.get("demo_mode")?.value === "true";

  if (userId || isDemo) {
    redirect("/dashboard");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-brand-100/50 dark:bg-black p-4 text-center">
      <div className="flex flex-col items-center gap-6 mb-12">
        <div className="h-24 w-24 rounded-2xl flex items-center justify-center bg-brand-600 shadow-xl shadow-brand-600/20">
          <Sparkles className="text-white h-12 w-12" />
        </div>
        <h1 className="text-5xl font-extrabold tracking-tight dark:text-white">
          Habit <span className="text-brand-600">Tracker</span>
        </h1>
        <p className="text-lg text-stone-600 dark:text-stone-400 max-w-md">
          Build better habits, track your progress, and stay motivated with
          AI-powered suggestions.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xs sm:max-w-md justify-center">
        <form action={loginAsDemo} className="flex-1">
          <Button
            type="submit"
            className="w-full bg-brand-600 hover:bg-brand-700 text-white h-14 text-lg font-semibold transition-all hover:scale-105 cursor-pointer"
          >
            Demo
          </Button>
        </form>
        <SignInButton mode="modal">
          <Button
            variant="outline"
            className="flex-1 border-brand-200 h-14 text-lg font-semibold bg-white dark:bg-stone-900 dark:border-stone-800 transition-all hover:scale-105 cursor-pointer"
          >
            Sign In
          </Button>
        </SignInButton>
      </div>
    </div>
  );
}
