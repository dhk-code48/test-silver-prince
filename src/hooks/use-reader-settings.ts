"use client";

import { useState, useEffect } from "react";
import { FONT_OPTIONS, ALIGNMENT_OPTIONS } from "@/lib/constants";
import { useTheme } from "next-themes";

export function useReaderSettings(
  novelId: string,
  volIndex: number,
  chapIndex: number
) {
  const { theme, setTheme } = useTheme();
  const [fontSize, setFontSize] = useState(16);
  const [lineHeight, setLineHeight] = useState(1.8);
  const [fontFamily, setFontFamily] = useState(FONT_OPTIONS[0].value);
  const [textAlignment, setTextAlignment] = useState(
    ALIGNMENT_OPTIONS[0].value
  );
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Load settings from localStorage
  useEffect(() => {
    const loadSettings = () => {
      // Font size
      const savedFontSize = localStorage.getItem("reader-font-size");
      if (savedFontSize) {
        setFontSize(Number.parseInt(savedFontSize));
      }

      // Line height
      const savedLineHeight = localStorage.getItem("reader-line-height");
      if (savedLineHeight) {
        setLineHeight(Number.parseFloat(savedLineHeight));
      }

      // Font family
      const savedFontFamily = localStorage.getItem("reader-font-family");
      if (
        savedFontFamily &&
        FONT_OPTIONS.some((f) => f.value === savedFontFamily)
      ) {
        setFontFamily(savedFontFamily);
      }

      // Text alignment
      const savedAlignment = localStorage.getItem("reader-text-alignment");
      if (
        savedAlignment &&
        ALIGNMENT_OPTIONS.some((a) => a.value === savedAlignment)
      ) {
        setTextAlignment(savedAlignment);
      }

      // Check if current chapter is bookmarked
      const bookmarkKey = `${volIndex}-${chapIndex}`;
      const isBookmarked = localStorage.getItem(bookmarkKey) === "true";
      setIsBookmarked(isBookmarked);
    };

    loadSettings();
  }, [volIndex, chapIndex]);

  // Save settings to localStorage when they change
  useEffect(() => {
    localStorage.setItem("reader-font-size", fontSize.toString());
  }, [fontSize]);

  useEffect(() => {
    localStorage.setItem("reader-line-height", lineHeight.toString());
  }, [lineHeight]);

  useEffect(() => {
    localStorage.setItem("reader-font-family", fontFamily);
  }, [fontFamily]);

  useEffect(() => {
    localStorage.setItem("reader-text-alignment", textAlignment);
  }, [textAlignment]);

  // Apply sepia theme
  useEffect(() => {
    if (theme === "sepia") {
      document.documentElement.style.setProperty(
        "--background",
        "hsl(39, 70%, 95%)"
      );
      document.documentElement.style.setProperty(
        "--foreground",
        "hsl(39, 40%, 20%)"
      );
      document.documentElement.style.setProperty("--card", "hsl(39, 70%, 98%)");
      document.documentElement.style.setProperty(
        "--card-foreground",
        "hsl(39, 40%, 20%)"
      );
    } else {
      document.documentElement.style.removeProperty("--background");
      document.documentElement.style.removeProperty("--foreground");
      document.documentElement.style.removeProperty("--card");
      document.documentElement.style.removeProperty("--card-foreground");
    }
  }, [theme]);

  // Toggle bookmark
  const toggleBookmark = () => {
    const bookmarkKey = `${volIndex}-${chapIndex}`;
    const newBookmarkState = !isBookmarked;
    localStorage.setItem(bookmarkKey, newBookmarkState.toString());
    setIsBookmarked(newBookmarkState);
  };

  return {
    fontSize,
    lineHeight,
    fontFamily,
    textAlignment,
    theme,
    isBookmarked,
    toggleBookmark,
    setFontSize,
    setLineHeight,
    setFontFamily,
    setTextAlignment,
    setTheme,
  };
}
