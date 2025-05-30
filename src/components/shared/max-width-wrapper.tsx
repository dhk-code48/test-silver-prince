"use client";
import { ReactNode } from "react";

import { cn } from "@/lib/utils";

export default function MaxWidthWrapper({
  className,
  children,
  large = false,
  small = false,
}: {
  className?: string;
  large?: boolean;
  small?: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className={cn("container mx-auto p-4", large ? "max-w-screen-2xl" : "max-w-6xl", small && "max-w-4xl", className)}
    >
      {children}
    </div>
  );
}
