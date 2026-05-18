import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Aside from "@/components/nav/aside";
import Logo from "@/components/nav/logo";
import Tabs from "@/components/nav/tabs";
import AsideFooter from "@/components/nav/aside-footer";
import TopNav from "@/components/nav/top-nav";
import NavVisibilityWrapper from "@/components/nav/nav-visibility-wrapper";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
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
        className={`${inter.className}  h-full flex flex-col md:flex-row antialiased w-full overflow-hidden bg-brand-100/50 dark:bg-black`}
      >
        {/* 1. ASIDE: Fixed width, glass style, stays on the left */}
        <ClerkProvider
          dynamic
          appearance={{
            baseTheme: undefined, // Will be managed by ThemeProvider if we could, but ClerkProvider is outside
          }}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {/* Desktop Sidebar: Only rendered on larger screens */}
            <NavVisibilityWrapper>
              <div className="hidden md:flex flex-col w-64 h-full glass border-r border-brand-100/20 dark:bg-stone-800 shrink-0">
                <div className="bg-white dark:bg-stone-800">
                  <Logo />
                </div>
                <hr className="slate-300" />
                <Aside className="flex-1" />
                <AsideFooter isDemo={isDemo} />
              </div>
            </NavVisibilityWrapper>

            <main className="flex-1 flex flex-col min-h-0 overflow-hidden relative w-full shrink-1 bg-brand-100/50 dark:bg-black">
              <NavVisibilityWrapper>
                <TopNav isDemo={isDemo} />
              </NavVisibilityWrapper>
              <div className="flex-1 overflow-y-auto relative">{children}</div>
            </main>

            <NavVisibilityWrapper>
              <div className="md:hidden w-full sticky bottom-0 z-50 shrink-0">
                <Tabs />
              </div>
            </NavVisibilityWrapper>
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
