"use client";

import {
  BookOpen,
  List,
  Menu,
  MessageSquare,
  Share2,
  Bookmark,
  BookmarkCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ReaderSettingsDropdown } from "@/components/novel/reader-settings-dropdown";
import Link from "next/link";

interface ReaderHeaderProps {
  novelTitle: string;
  chapterTitle?: string;
  isBookmarked: boolean;
  toggleBookmark: () => void;
  shareChapter: () => void;
  setShowTOC: (show: boolean) => void;
  showTOC: boolean;
  setShowComments: (show: boolean) => void;
  showComments: boolean;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  fontSize: number;
  lineHeight: number;
  fontFamily: string;
  textAlignment: string;
  theme: string;
  setFontSize: (size: number) => void;
  setLineHeight: (height: number) => void;
  setFontFamily: (family: string) => void;
  setTextAlignment: (alignment: string) => void;
  setTheme: (theme: string) => void;
}

export function ReaderHeader({
  novelTitle,
  chapterTitle,
  isBookmarked,
  toggleBookmark,
  shareChapter,
  setShowTOC,
  showTOC,
  setShowComments,
  showComments,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  fontSize,
  lineHeight,
  fontFamily,
  textAlignment,
  theme,
  setFontSize,
  setLineHeight,
  setFontFamily,
  setTextAlignment,
  setTheme,
}: ReaderHeaderProps) {
  return (
    <header className="top-0 z-40 sticky bg-background/95 supports-[backdrop-filter]:bg-background/60 backdrop-blur border-b w-full">
      <div className="flex items-center h-14 container">
        <div className="hidden md:flex mr-4">
          <Link href="/" className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5" />
            <span className="font-bold">TheSilverPrince</span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden mr-2"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu className="w-5 h-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>

        {/* Breadcrumb navigation */}
        <nav className="flex-1 items-center space-x-1 px-4 md:px-0 overflow-x-auto whitespace-nowrap">
          <Link
            href="/"
            className="font-medium text-muted-foreground hover:text-foreground text-sm"
          >
            Home
          </Link>
          <span className="text-muted-foreground">/</span>
          <Link
            href="/novel"
            className="font-medium text-muted-foreground hover:text-foreground text-sm"
          >
            Novels
          </Link>
          <span className="text-muted-foreground">/</span>
          <Link
            href={`/novel/${encodeURIComponent(
              novelTitle.toLowerCase().replace(/\s+/g, "-")
            )}`}
            className="font-medium text-muted-foreground hover:text-foreground text-sm"
          >
            {novelTitle}
          </Link>
          <span className="text-muted-foreground">/</span>
          <span className="font-medium text-sm truncate">{chapterTitle}</span>
        </nav>

        {/* Right side actions */}
        <div className="flex items-center space-x-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleBookmark}
                  className="hidden md:flex"
                >
                  {isBookmarked ? (
                    <BookmarkCheck className="w-5 h-5 text-primary" />
                  ) : (
                    <Bookmark className="w-5 h-5" />
                  )}
                  <span className="sr-only">
                    {isBookmarked ? "Remove bookmark" : "Bookmark"}
                  </span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {isBookmarked ? "Remove bookmark" : "Bookmark this chapter"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={shareChapter}
                  className="hidden md:flex"
                >
                  <Share2 className="w-5 h-5" />
                  <span className="sr-only">Share</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Share this chapter</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* Table of Contents Button */}
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:flex"
            onClick={() => setShowTOC(true)}
          >
            <List className="w-5 h-5" />
            <span className="sr-only">Table of Contents</span>
          </Button>

          {/* Comments Button */}
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:flex"
            onClick={() => setShowComments(true)}
          >
            <MessageSquare className="w-5 h-5" />
            <span className="sr-only">Comments</span>
          </Button>

          {/* Reader Settings Button */}
          <ReaderSettingsDropdown
            fontSize={fontSize}
            lineHeight={lineHeight}
            fontFamily={fontFamily}
            textAlignment={textAlignment}
            theme={theme}
            setFontSize={setFontSize}
            setLineHeight={setLineHeight}
            setFontFamily={setFontFamily}
            setTextAlignment={setTextAlignment}
            setTheme={setTheme}
          />
        </div>
      </div>
    </header>
  );
}
