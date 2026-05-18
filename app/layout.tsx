import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Aside from "@/components/nav/aside";
import Logo from "@/components/nav/logo";
import Tabs from "@/components/nav/tabs";
import AsideFooter from "@/components/nav/aside-footer";
import TopNav from "@/components/nav/top-nav";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ClerkProvider, Show } from "@clerk/nextjs";
import { cookies } from "next/headers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Habit Tracker",
  description: "Track your habits and achieve your goals.",
  icons: {
    icon: "/icon.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const isDemo = cookieStore.get("demo_mode")?.value === "true";

  return (
    <html lang="en" className={` h-full`} suppressHydrationWarning>
      {/* h-full here is critical to ensure the body can fill the screen */}

      <body
        className={`${inter.className}  h-full flex flex-col md:flex-row antialiased w-full`}
      >
        {/* 1. ASIDE: Fixed width, glass style, stays on the left */}
        <ClerkProvider
          dynamic
          appearance={{
            baseTheme: undefined, // Will be managed by ThemeProvider if we could, but ClerkProvider is outside
          }}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {isDemo ? (
              <div className="hidden md:flex flex-col w-64 h-full glass border-r border-brand-100/20 dark:bg-stone-800">
                <div className="bg-white dark:bg-stone-800">
                  <Logo />
                </div>
                <hr className="slate-300" />
                <Aside className="flex-1" />
                <AsideFooter />
              </div>
            ) : (
              <Show when="signed-in">
                <div className="hidden md:flex flex-col w-64 h-full glass border-r border-brand-100/20 dark:bg-stone-800">
                  <div className="bg-white dark:bg-stone-800">
                    <Logo />
                  </div>
                  <hr className="slate-300" />
                  <Aside className="flex-1" />
                  <AsideFooter />
                </div>
              </Show>
            )}
            {/* MOBILE TABS: Only visible on small screens (below md) */}

            <main className="bg-brand-100/50 dark:bg-black flex-1 h-full overflow-y-auto flex flex-col">
              {isDemo ? (
                <TopNav />
              ) : (
                <Show when="signed-in">
                  <TopNav />
                </Show>
              )}
              <div className="p-8 flex-1">{children}</div>
            </main>

            {isDemo ? (
              <div className="md:hidden w-full">
                <Tabs />
              </div>
            ) : (
              <Show when="signed-in">
                <div className="md:hidden w-full">
                  <Tabs />
                </div>
              </Show>
            )}
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
