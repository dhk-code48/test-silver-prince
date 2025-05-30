"use client";

import {
  ArrowUp,
  Bookmark,
  BookmarkCheck,
  Home,
  List,
  MessageSquare,
  Share2,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { TableOfContents } from "@/components/novel/table-of-contents";

import { motion, AnimatePresence } from "framer-motion";
import { VolumeProps } from "@/firebase/Read/getVolumes";
import Link from "next/link";

interface ReaderSettingsProps {
  showTOC: boolean;
  setShowTOC: (show: boolean) => void;
  volumes: VolumeProps[];
  volIndex: number;
  chapIndex: number;
  setVolIndex: (index: number) => void;
  setChapIndex: (index: number) => void;
  novelTitle: string;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  setShowComments: (show: boolean) => void;
  isBookmarked: boolean;
  toggleBookmark: () => void;
  shareChapter: () => void;
  scrollToTop: () => void;
  showScrollToTop: boolean;
}

export function ReaderSettings({
  showTOC,
  setShowTOC,
  volumes,
  volIndex,
  chapIndex,
  setVolIndex,
  setChapIndex,
  novelTitle,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  setShowComments,
  isBookmarked,
  toggleBookmark,
  shareChapter,
  scrollToTop,
  showScrollToTop,
}: ReaderSettingsProps) {
  return (
    <>
      {/* Table of Contents */}
      <TableOfContents
        showTOC={showTOC}
        setShowTOC={setShowTOC}
        volumes={volumes}
        volIndex={volIndex}
        chapIndex={chapIndex}
        setVolIndex={setVolIndex}
        setChapIndex={setChapIndex}
        novelTitle={novelTitle}
      />

      {/* Mobile menu */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent side="left" className="w-[250px]">
          <SheetHeader className="mb-4">
            <SheetTitle className="font-bold text-xl">Menu</SheetTitle>
          </SheetHeader>
          <div className="space-y-4">
            <Button variant="ghost" className="justify-start w-full" asChild>
              <Link href="/">
                <Home className="mr-2 w-4 h-4" />
                Home
              </Link>
            </Button>
            <Button variant="ghost" className="justify-start w-full" asChild>
              <Link href="/novel">
                <List className="mr-2 w-4 h-4" />
                Novels
              </Link>
            </Button>
            <Separator />
            <Button
              variant="ghost"
              className="justify-start w-full"
              onClick={() => {
                setShowTOC(true);
                setIsMobileMenuOpen(false);
              }}
            >
              <List className="mr-2 w-4 h-4" />
              Table of Contents
            </Button>
            <Button
              variant="ghost"
              className="justify-start w-full"
              onClick={() => {
                setShowComments(true);
                setIsMobileMenuOpen(false);
              }}
            >
              <MessageSquare className="mr-2 w-4 h-4" />
              Comments
            </Button>
            <Button
              variant="ghost"
              className="justify-start w-full"
              onClick={toggleBookmark}
            >
              {isBookmarked ? (
                <BookmarkCheck className="mr-2 w-4 h-4 text-primary" />
              ) : (
                <Bookmark className="mr-2 w-4 h-4" />
              )}
              {isBookmarked ? "Bookmarked" : "Bookmark"}
            </Button>
            <Button
              variant="ghost"
              className="justify-start w-full"
              onClick={shareChapter}
            >
              <Share2 className="mr-2 w-4 h-4" />
              Share
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Mobile action buttons */}
      <div className="md:hidden right-4 bottom-4 fixed flex flex-col gap-2">
        <Button
          size="icon"
          className="shadow-lg rounded-full"
          onClick={() => setShowTOC(true)}
        >
          <List className="w-5 h-5" />
          <span className="sr-only">Table of Contents</span>
        </Button>
      </div>

      {/* Scroll to top button */}
      <AnimatePresence>
        {showScrollToTop && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="bottom-4 left-4 z-50 fixed"
          >
            <Button
              size="icon"
              className="shadow-lg rounded-full"
              onClick={scrollToTop}
            >
              <ArrowUp className="w-5 h-5" />
              <span className="sr-only">Scroll to top</span>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
