"use client";
import React, { FC, useEffect, useRef, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { VolumeProps, tabeleOfContents } from "@/firebase/Read/getVolumes";
import { chapterProps } from "@/firebase/Read/getChapter";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { DocumentReference } from "firebase/firestore";
import ChapterHeader from "@/components/App/Novel/ChapterHeader";
import ChapterNav from "@/components/App/Novel/ChapterNav";
import SideBar from "@/components/App/Navbar/SideBar";
import NovelComments from "@/components/App/Navbar/NovelComments";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  Bookmark,
  BookmarkCheck,
  ChevronLeft,
  ChevronRight,
  Clock,
  List,
  Menu,
  MessageSquare,
  Moon,
  Search,
  Settings,
  Share2,
  Sun,
  Type,
} from "lucide-react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

interface pageProps {
  novelId: string;
  volumes: VolumeProps[];
  volumeIndex: number;
  novelTitle: string;
  chapterIndex: number;
}

// Font options
const fontOptions = [
  { name: "Default", value: "font-sans" },
  { name: "Serif", value: "font-serif" },
  { name: "Mono", value: "font-mono" },
];

// Theme options
const themeOptions = [
  { name: "System", value: "system" },
  { name: "Light", value: "light" },
  { name: "Dark", value: "dark" },
  { name: "Sepia", value: "sepia" },
];

// Text alignment options
const alignmentOptions = [
  { icon: AlignLeft, value: "text-left" },
  { icon: AlignCenter, value: "text-center" },
  { icon: AlignJustify, value: "text-justify" },
];

const Chapter: FC<pageProps> = ({
  novelTitle,
  novelId,
  volumeIndex,
  chapterIndex,
  volumes,
}) => {
  const [chapIndex, setChapIndex] = useState<number>(chapterIndex);
  const [volIndex, setVolIndex] = useState<number>(volumeIndex);
  const [toc, setToc] = useState<tabeleOfContents[]>([]);

  const [chapter, setChapter] = useState<chapterProps | null>(null);

  // ========== //
  const params = useParams();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [fontSize, setFontSize] = useState(16);
  const [lineHeight, setLineHeight] = useState(1.8);
  const [fontFamily, setFontFamily] = useState(fontOptions[0].value);
  const [textAlignment, setTextAlignment] = useState(alignmentOptions[0].value);
  const [showTOC, setShowTOC] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [progress, setProgress] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // ========== //

  useEffect(() => {
    setToc(volumes[volIndex].tabeleOfContents);
  }, [volumes, volIndex]);

  useEffect(() => {
    setChapIndex(chapterIndex);
    setVolIndex(volumeIndex);
  }, [chapterIndex, volumeIndex]);

  function handleChapArr(v: number, c: number) {
    setVolIndex(v);
    setChapIndex(c);
  }

  useEffect(() => {
    async function getChapter(ref: DocumentReference) {
      const doc = await getDoc(ref);

      if (doc.exists()) {
        setChapter({
          id: doc.id,
          content: doc.data().content,
          publishedOn: doc.data().publishedOn,
          title: doc.data().title,
        });
      }
    }
    if (volumes !== null && toc[chapIndex]) {
      console.log("TOC", toc);
      const ref = doc(
        db,
        "Novels",
        novelId,
        "Volumes",
        volumes[volIndex].id,
        "Chapters",
        toc[chapIndex].id
      );
      getChapter(ref);
    }
  }, [chapIndex, volIndex, volumes, toc, novelId]);

  function handlePrevious() {
    if (chapIndex === 0) {
      setVolIndex((prev) => prev - 1);
      setChapIndex(volumes[volIndex - 1].tabeleOfContents.length - 1);
    } else {
      setChapIndex((prev) => prev - 1);
    }
    window.scrollTo({
      behavior: "smooth",
      top: 0,
    });
  }
  function handleNext() {
    if (chapIndex === toc.length - 1) {
      setVolIndex((prev) => prev + 1);
      setChapIndex(0);
    } else {
      setChapIndex((prev) => prev + 1);
    }
    window.scrollTo({
      behavior: "smooth",
      top: 0,
    });
  }

  // ================ //

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      // Show/hide scroll to top button
      if (window.scrollY > 300) {
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }

      // Calculate reading progress
      if (contentRef.current) {
        const contentHeight = contentRef.current.scrollHeight;
        const windowHeight = window.innerHeight;
        const scrollPosition = window.scrollY;
        const currentProgress = Math.min(
          Math.round((scrollPosition / (contentHeight - windowHeight)) * 100),
          100
        );
        setProgress(currentProgress || 0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toggle bookmark
  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    localStorage.setItem(
      `${volIndex}-${chapterIndex}`,
      JSON.stringify(!isBookmarked)
    );
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Share functionality
  const shareChapter = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `${novelTitle} - ${chapter?.title}`,
          text: `Check out this chapter from ${novelTitle}!`,
          url: window.location.href,
        })
        .catch((err) => {
          console.error("Error sharing:", err);
        });
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

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

  // ================ //

  return (
    <div className="space-y-10 bg-background min-h-screen">
      {/* Reading progress bar */}
      <div className="top-0 right-0 left-0 z-[5000] fixed bg-background/10 h-1">
        <div
          className="bg-primary h-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Header */}
      <header className="top-0 z-40 sticky bg-background/95 supports-[backdrop-filter]:bg-background/60 backdrop-blur border-b w-full">
        <div className="flex items-center h-14 container">
          <div className="hidden md:flex mr-4">
            <Link href="/" className="flex items-center space-x-2">
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
              href={`/novel/${novelId}`}
              className="font-medium text-muted-foreground hover:text-foreground text-sm"
            >
              {novelTitle}
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="font-medium text-sm truncate">
              {chapter?.title}
            </span>
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
            {/* Table of Contents Button */}
            <Sheet open={showTOC} onOpenChange={setShowTOC}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="hidden md:flex">
                  <List className="w-5 h-5" />
                  <span className="sr-only">Table of Contents</span>
                </Button>
              </SheetTrigger>
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
                        onChange={(e) => {
                          // In a real app, implement search functionality
                          console.log("Searching for:", e.target.value);
                        }}
                      />
                    </div>
                  </div>

                  <ScrollArea className="flex-1 p-4 h-[calc(100vh-140px)]">
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
                          >
                            <BookmarkCheck className="mr-2 w-4 h-4 text-primary" />
                            Bookmarks
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="justify-start"
                          >
                            <Clock className="mr-2 w-4 h-4" />
                            Recent
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="justify-start"
                            onClick={() => {
                              // In a real app, navigate to the first chapter
                              console.log("Navigate to first chapter");
                            }}
                          >
                            <ChevronLeft className="mr-2 w-4 h-4" />
                            First
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="justify-start"
                            onClick={() => {
                              // In a real app, navigate to the latest chapter
                              console.log("Navigate to latest chapter");
                            }}
                          >
                            <ChevronRight className="mr-2 w-4 h-4" />
                            Latest
                          </Button>
                        </div>
                      </div>

                      {/* Current position indicator */}
                      <div className="bg-muted/50 mb-6 p-3 rounded-lg">
                        <h3 className="mb-1 font-medium text-sm">
                          CURRENT POSITION
                        </h3>
                        <div className="text-sm">
                          <div className="font-medium">{novelTitle}</div>
                          <div className="mt-1 text-muted-foreground text-xs">
                            {volumes[volIndex]?.name} • Chapter {chapIndex} of{" "}
                            {volumes[volIndex]?.tabeleOfContents?.length}
                          </div>
                          <div className="bg-muted mt-2 rounded-full w-full h-1.5">
                            <div
                              className="bg-primary rounded-full h-1.5"
                              style={{
                                width: `${
                                  (chapIndex /
                                    volumes[volIndex]?.tabeleOfContents
                                      ?.length) *
                                  100
                                }%`,
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>

                      {/* Volumes accordion */}
                      {volumes.map((volume, index) => (
                        <Accordion
                          key={volume.name}
                          type="single"
                          collapsible
                          defaultValue={
                            volume.tabeleOfContents.some(
                              (_, i) => i === chapIndex
                            )
                              ? volume.name
                              : undefined
                          }
                        >
                          <AccordionItem
                            value={volume.name}
                            className="border-b-0"
                          >
                            <AccordionTrigger className="py-2 hover:no-underline">
                              <div className="flex items-center">
                                <div className="flex justify-center items-center bg-primary/10 mr-2 rounded-full w-6 h-6 text-primary text-xs">
                                  {index + 1}
                                </div>
                                <span>{volume.name}</span>
                                {volume.tabeleOfContents.some(
                                  (_, i) => i === chapIndex
                                ) && (
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
                                  (chapter, chapterIndex) => (
                                    <Button
                                      key={chapter.id}
                                      variant={
                                        chapterIndex === chapIndex
                                          ? "default"
                                          : "ghost"
                                      }
                                      className={cn(
                                        "w-full justify-start text-left h-auto py-2",
                                        chapterIndex === chapIndex &&
                                          "bg-primary text-primary-foreground"
                                      )}
                                      onClick={() => {
                                        // In a real app, navigate to the chapter
                                        console.log(
                                          `Navigate to: ${chapter.id}`
                                        );
                                        setShowTOC(false);
                                      }}
                                    >
                                      <div className="flex items-center w-full">
                                        <span className="opacity-70 mr-2 text-xs">
                                          {chapterIndex + 1}.
                                        </span>
                                        <span className="flex-1 truncate text-wrap">
                                          {chapter.title}
                                        </span>
                                        {chapterIndex === chapIndex && (
                                          <ChevronRight className="ml-2 w-4 h-4 shrink-0" />
                                        )}
                                      </div>
                                    </Button>
                                  )
                                )}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      ))}
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
                        onClick={() =>
                          window.scrollTo({ top: 0, behavior: "smooth" })
                        }
                      >
                        Back to Top
                      </Button>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            {/* Comments Button */}
            <Drawer open={showComments} onOpenChange={setShowComments}>
              <DrawerTrigger asChild>
                <Button variant="ghost" size="icon" className="hidden md:flex">
                  <MessageSquare className="w-5 h-5" />
                  <span className="sr-only">Comments</span>
                </Button>
              </DrawerTrigger>
              <DrawerContent className="max-h-[85vh]">
                <DrawerHeader>
                  <DrawerTitle className="font-bold text-xl">
                    Comments
                  </DrawerTitle>
                </DrawerHeader>
                <div className="px-4 pb-4">
                  <NovelComments
                    chapId={volumes[volIndex].tabeleOfContents[chapIndex].id}
                    novelId={novelId}
                    novelTitle={novelTitle}
                    volId={volumes[volIndex].id}
                  />
                </div>
              </DrawerContent>
            </Drawer>

            {/* Reader Settings Button */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Settings className="w-5 h-5" />
                  <span className="sr-only">Settings</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[240px]">
                <div className="space-y-4 p-2">
                  <div>
                    <h4 className="mb-1 font-medium text-sm">Font Size</h4>
                    <div className="flex items-center space-x-2">
                      <Type className="w-4 h-4" />
                      <Slider
                        value={[fontSize]}
                        min={12}
                        max={24}
                        step={1}
                        onValueChange={(value) => setFontSize(value[0])}
                      />
                    </div>
                  </div>

                  <div>
                    <h4 className="mb-1 font-medium text-sm">Line Height</h4>
                    <div className="flex items-center space-x-2">
                      <AlignJustify className="w-4 h-4" />
                      <Slider
                        value={[lineHeight * 10]}
                        min={15}
                        max={25}
                        step={1}
                        onValueChange={(value) => setLineHeight(value[0] / 10)}
                      />
                    </div>
                  </div>

                  <div>
                    <h4 className="mb-1 font-medium text-sm">Font Family</h4>
                    <div className="flex flex-wrap gap-2">
                      {fontOptions.map((font) => (
                        <Button
                          key={font.value}
                          variant={
                            fontFamily === font.value ? "default" : "outline"
                          }
                          size="sm"
                          onClick={() => setFontFamily(font.value)}
                          className="flex-1"
                        >
                          {font.name}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="mb-1 font-medium text-sm">Text Alignment</h4>
                    <div className="flex gap-2">
                      {alignmentOptions.map((align) => (
                        <Button
                          key={align.value}
                          variant={
                            textAlignment === align.value
                              ? "default"
                              : "outline"
                          }
                          size="sm"
                          onClick={() => setTextAlignment(align.value)}
                          className="flex-1"
                        >
                          <align.icon className="w-4 h-4" />
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="mb-1 font-medium text-sm">Theme</h4>
                    <div className="flex flex-wrap gap-2">
                      {themeOptions.map((t) => (
                        <Button
                          key={t.value}
                          variant={theme === t.value ? "default" : "outline"}
                          size="sm"
                          onClick={() => setTheme(t.value)}
                          className="flex-1"
                        >
                          {t.value === "light" && (
                            <Sun className="mr-1 w-4 h-4" />
                          )}
                          {t.value === "dark" && (
                            <Moon className="mr-1 w-4 h-4" />
                          )}
                          {t.name}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {chapter !== null ? (
        <>
          <ChapterHeader
            nextDisable={
              volIndex === volumes.length - 1 &&
              chapIndex ===
                volumes[volumes.length - 1].tabeleOfContents.length - 1
            }
            prevDisable={chapIndex === 0 && volIndex === 0}
            chapterTitle={chapter.title}
            handleNext={handleNext}
            handlePrevious={handlePrevious}
            novelId={novelId}
          />
          <p
            className="mx-auto pb-20 font-body dark:text-white text-justify chapter"
            style={{ fontSize: "18px", lineHeight: "34.8px" }}
            dangerouslySetInnerHTML={{ __html: chapter.content }}
          />
          <ChapterHeader
            noTitle
            prevDisable={chapIndex === 0 && volIndex === 0}
            nextDisable={
              volIndex === volumes.length - 1 &&
              chapIndex ===
                volumes[volumes.length - 1].tabeleOfContents.length - 1
            }
            chapterTitle={chapter.title}
            handleNext={handleNext}
            handlePrevious={handlePrevious}
            novelId={novelId}
          />
          <NovelComments
            chapId={volumes[volIndex].tabeleOfContents[chapIndex].id}
            novelId={novelId}
            novelTitle={novelTitle}
            volId={volumes[volIndex].id}
          />
        </>
      ) : (
        <div className="flex justify-center">
          <AiOutlineLoading className="animate-spin" size={60} />
        </div>
      )}
    </div>
  );
};

export default Chapter;
