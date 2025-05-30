"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { RefObject } from "react";

interface ReaderContentProps {
  content: string;
  fontSize: number;
  lineHeight: number;
  fontFamily: string;
  textAlignment: "left" | "center" | "justify";
  contentRef: RefObject<HTMLDivElement | null>;
}

export function ReaderContent({
  content,
  fontSize,
  lineHeight,
  fontFamily,
  textAlignment,
  contentRef,
}: ReaderContentProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      ref={contentRef}
      className={cn(
        "prose prose-lg space-y-5 dark:prose-invert mx-auto max-w-4xl pb-20 px-4 reader-custom-style",
        fontFamily
      )}
      style={{
        ["--reader-font-size" as any]: `${fontSize}px`,
        ["--reader-line-height" as any]: lineHeight,
        ["--reader-text-align" as any]: textAlignment,
      }}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
