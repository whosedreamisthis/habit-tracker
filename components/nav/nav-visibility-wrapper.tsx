"use client";

import { usePathname } from "next/navigation";
import React from "react";

interface NavVisibilityWrapperProps {
  children: React.ReactNode;
}

export default function NavVisibilityWrapper({
  children,
}: NavVisibilityWrapperProps) {
  const pathname = usePathname();

  // Hide navigation components on the home page (landing page)
  if (pathname === "/") {
    return null;
  }

  return <>{children}</>;
}
