"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Search,
  BookmarkCheck,
  Clock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { VolumeProps } from "@/firebase/Read/getVolumes";

interface TableOfContentsProps {
  showTOC: boolean;
  setShowTOC: (show: boolean) => void;
  volumes: VolumeProps[];
  volIndex: number;
  chapIndex: number;
  setVolIndex: (index: number) => void;
  setChapIndex: (index: number) => void;
  novelTitle: string;
}

type SortOrder = "newest" | "oldest";

export function TableOfContents({
  showTOC,
  setShowTOC,
  volumes,
  volIndex,
  chapIndex,
  setVolIndex,
  setChapIndex,
  novelTitle,
}: TableOfContentsProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("oldest");
  const [bookmarkedChapters, setBookmarkedChapters] = useState<
    { volIndex: number; chapIndex: number }[]
  >([]);
  const [recentChapters, setRecentChapters] = useState<
    { volIndex: number; chapIndex: number }[]
  >([]);

  // Load bookmarks and recent chapters from localStorage
  useEffect(() => {
    // Load bookmarks
    const loadBookmarks = () => {
      const bookmarks: { volIndex: number; chapIndex: number }[] = [];
      for (let v = 0; v < volumes.length; v++) {
        for (let c = 0; c < volumes[v].tabeleOfContents.length; c++) {
          const isBookmarked = localStorage.getItem(`${v}-${c}`) === "true";
          if (isBookmarked) {
            bookmarks.push({ volIndex: v, chapIndex: c });
          }
        }
      }
      setBookmarkedChapters(bookmarks);
    };

    // Load recent chapters (simplified implementation)
    const loadRecent = () => {
      const recentString = localStorage.getItem("recentChapters");
      if (recentString) {
        try {
          setRecentChapters(JSON.parse(recentString));
        } catch (e) {
          console.error("Failed to parse recent chapters", e);
        }
      }
    };

    loadBookmarks();
    loadRecent();
  }, [volumes]);

  // Add current chapter to recent when TOC opens
  useEffect(() => {
    if (showTOC) {
      const currentChapter = { volIndex, chapIndex };
      setRecentChapters((prev) => {
        const filtered = prev.filter(
          (c) => !(c.volIndex === volIndex && c.chapIndex === chapIndex)
        );
        const updated = [currentChapter, ...filtered].slice(0, 5);
        localStorage.setItem("recentChapters", JSON.stringify(updated));
        return updated;
      });
    }
  }, [showTOC, volIndex, chapIndex]);

  // Filter and sort volumes and chapters based on search query and sort order
  const filteredVolumes = useMemo(() => {
    if (!searchQuery.trim()) {
      // Just sort the volumes if no search query
      return [...volumes].sort((a, b) => {
        if (sortOrder === "newest") {
          return b.publishedOn.seconds - a.publishedOn.seconds;
        } else {
          return a.publishedOn.seconds - b.publishedOn.seconds;
        }
      });
    }

    // Filter volumes and chapters based on search query
    return volumes
      .map((volume) => {
        // Filter chapters that match the search query
        const filteredChapters = volume.tabeleOfContents.filter((chapter) =>
          chapter.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

        // If any chapters match, return the volume with only matching chapters
        if (filteredChapters.length > 0) {
          return {
            ...volume,
            tabeleOfContents: filteredChapters,
          };
        }

        // If volume name matches, return the volume with all chapters
        if (volume.name.toLowerCase().includes(searchQuery.toLowerCase())) {
          return volume;
        }

        // Otherwise, return null (will be filtered out)
        return null;
      })
      .filter(Boolean) as VolumeProps[];
  }, [volumes, searchQuery, sortOrder]);

  const navigateToChapter = (volumeIndex: number, chapterIndex: number) => {
    setVolIndex(volumeIndex);
    setChapIndex(chapterIndex);
    setShowTOC(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigateToFirstChapter = () => {
    if (sortOrder === "newest") {
      // Navigate to the newest chapter
      const newestVolIndex = 0;
      const newestChapIndex = 0;
      navigateToChapter(newestVolIndex, newestChapIndex);
    } else {
      // Navigate to the oldest chapter
      navigateToChapter(0, 0);
    }
  };

  const navigateToLatestChapter = () => {
    if (sortOrder === "newest") {
      // Navigate to the oldest chapter
      navigateToChapter(0, 0);
    } else {
      // Navigate to the newest chapter
      const latestVolIndex = filteredVolumes.length - 1;
      const latestChapIndex =
        filteredVolumes[latestVolIndex].tabeleOfContents.length - 1;
      navigateToChapter(latestVolIndex, latestChapIndex);
    }
  };

  return (
    <Sheet open={showTOC} onOpenChange={setShowTOC}>
      <SheetContent
        side="right"
        className="p-0 w-[300px] sm:w-[400px] overflow-hidden"
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b">
            <SheetTitle className="font-bold text-xl">
              Table of Contents
            </SheetTitle>

            {/* Search for chapters */}
            <div className="relative mt-2">
              <Search className="top-1/2 left-2 absolute w-4 h-4 text-muted-foreground -translate-y-1/2 transform" />
              <Input
                placeholder="Search chapters..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <ScrollArea className="flex-1 p-4 h-[calc(100vh-200px)]">
            <div className="space-y-4">
              {/* Quick access section */}
              <div className="mb-6">
                <h3 className="mb-2 font-medium text-muted-foreground text-sm">
                  QUICK ACCESS
                </h3>
                <div className="gap-2 grid grid-cols-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="justify-start"
                    disabled={bookmarkedChapters.length === 0}
                    onClick={() => {
                      if (bookmarkedChapters.length > 0) {
                        navigateToChapter(
                          bookmarkedChapters[0].volIndex,
                          bookmarkedChapters[0].chapIndex
                        );
                      }
                    }}
                  >
                    <BookmarkCheck className="mr-2 w-4 h-4 text-primary" />
                    Bookmarks{" "}
                    {bookmarkedChapters.length > 0 &&
                      `(${bookmarkedChapters.length})`}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="justify-start"
                    disabled={recentChapters.length <= 1}
                    onClick={() => {
                      if (recentChapters.length > 1) {
                        navigateToChapter(
                          recentChapters[1].volIndex,
                          recentChapters[1].chapIndex
                        );
                      }
                    }}
                  >
                    <Clock className="mr-2 w-4 h-4" />
                    Recent
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="justify-start"
                    onClick={navigateToFirstChapter}
                  >
                    <ChevronLeft className="mr-2 w-4 h-4" />
                    First
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="justify-start"
                    onClick={navigateToLatestChapter}
                  >
                    <ChevronRight className="mr-2 w-4 h-4" />
                    Latest
                  </Button>
                </div>
              </div>

              {/* Current position indicator */}
              <div className="bg-muted/50 mb-6 p-3 rounded-lg">
                <h3 className="mb-1 font-medium text-sm">CURRENT POSITION</h3>
                <div className="text-sm">
                  <div className="font-medium">{novelTitle}</div>
                  <div className="mt-1 text-muted-foreground text-xs">
                    {volumes[volIndex]?.name} • Chapter {chapIndex + 1} of{" "}
                    {volumes[volIndex]?.tabeleOfContents?.length}
                  </div>
                  <div className="bg-muted mt-2 rounded-full w-full h-1.5">
                    <div
                      className="bg-primary rounded-full h-1.5"
                      style={{
                        width: `${
                          ((chapIndex + 1) /
                            volumes[volIndex]?.tabeleOfContents?.length) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Search results count */}
              {searchQuery && (
                <div className="mb-4 text-sm">
                  Found{" "}
                  {filteredVolumes.reduce(
                    (count, vol) => count + vol.tabeleOfContents.length,
                    0
                  )}{" "}
                  chapters
                </div>
              )}

              {/* Volumes accordion */}
              {filteredVolumes.length > 0 ? (
                filteredVolumes.map((volume, index) => (
                  <Accordion
                    key={volume.id}
                    type="single"
                    collapsible
                    defaultValue={
                      (searchQuery && volume.tabeleOfContents.length > 0) ||
                      volumes.findIndex((v) => v.id === volume.id) === volIndex
                        ? volume.id
                        : undefined
                    }
                  >
                    <AccordionItem value={volume.id} className="border-b-0">
                      <AccordionTrigger className="py-2 hover:no-underline">
                        <div className="flex items-center">
                          <div className="flex justify-center items-center bg-primary/10 mr-2 rounded-full w-6 h-6 text-primary text-xs">
                            {index + 1}
                          </div>
                          <span>{volume.name}</span>
                          {volumes[volIndex]?.id === volume.id && (
                            <Badge
                              variant="secondary"
                              className="bg-primary/10 ml-2 text-primary"
                            >
                              Current
                            </Badge>
                          )}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pt-1 pb-3">
                        <div className="space-y-1 ml-8">
                          {volume.tabeleOfContents.map(
                            (chapter, chapterIndex) => {
                              const originalVolumeIndex = volumes.findIndex(
                                (v) => v.id === volume.id
                              );
                              const isCurrentChapter =
                                originalVolumeIndex === volIndex &&
                                volumes[volIndex].tabeleOfContents.findIndex(
                                  (c) => c.id === chapter.id
                                ) === chapIndex;
                              const isBookmarked =
                                localStorage.getItem(
                                  `${originalVolumeIndex}-${chapterIndex}`
                                ) === "true";

                              return (
                                <Button
                                  key={chapter.id}
                                  variant={
                                    isCurrentChapter ? "default" : "ghost"
                                  }
                                  className={cn(
                                    "w-full justify-start text-left h-auto py-2",
                                    isCurrentChapter &&
                                      "bg-primary text-primary-foreground"
                                  )}
                                  onClick={() => {
                                    const volumeIndex = volumes.findIndex(
                                      (v) => v.id === volume.id
                                    );
                                    const chapterIndex = volumes[
                                      volumeIndex
                                    ].tabeleOfContents.findIndex(
                                      (c) => c.id === chapter.id
                                    );
                                    navigateToChapter(
                                      volumeIndex,
                                      chapterIndex
                                    );
                                  }}
                                >
                                  <div className="flex items-center w-full">
                                    <span className="opacity-70 mr-2 text-xs">
                                      {chapterIndex + 1}.
                                    </span>
                                    <span className="flex-1 truncate text-wrap">
                                      {chapter.title}
                                    </span>
                                    {isBookmarked && !isCurrentChapter && (
                                      <BookmarkCheck className="ml-2 w-3.5 h-3.5 text-primary shrink-0" />
                                    )}
                                    {isCurrentChapter && (
                                      <ChevronRight className="ml-2 w-4 h-4 shrink-0" />
                                    )}
                                  </div>
                                </Button>
                              );
                            }
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ))
              ) : (
                <div className="py-8 text-muted-foreground text-center">
                  No chapters found matching &quot;{searchQuery}&quot;
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Bottom actions */}
          <div className="mt-auto p-4 border-t">
            <div className="flex justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowTOC(false)}
              >
                Close
              </Button>
              <Button
                size="sm"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                Back to Top
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
