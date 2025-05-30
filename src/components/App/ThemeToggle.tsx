"use client";

import * as React from "react";
import { LuMoon, LuSun } from "react-icons/lu";
import { useTheme } from "next-themes";

const ThemeToggle: React.FC = () => {
  const { setTheme } = useTheme();

  return (
    <>
      <LuSun
        onClick={() => setTheme("dark")}
        className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
      />
      <LuMoon
        onClick={() => setTheme("light")}
        className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
      />
    </>
  );
};
export default ThemeToggle;
