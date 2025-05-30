"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { FC } from "react";

interface linkProps {
  label: string;
  className?: string;
  to?: string | null;
}

const NavLink: FC<linkProps> = ({ label, className, to }) => {
  const path = usePathname();
  const selected = path === to;
  return (
    <Link
      href={to ? to : "/"}
      className={cn(
        "font-medium transition-colors hover:text-red-600 relative group",
        className,
        selected && "text-primary font-semibold"
      )}
    >
      {label}
      <span className="-bottom-1 left-0 absolute bg-red-600 w-0 group-hover:w-full h-0.5 transition-all"></span>
    </Link>
  );
};

export default NavLink;
