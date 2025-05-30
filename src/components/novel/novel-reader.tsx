"use client";

import { useState, useEffect } from "react";
import { useChapter } from "@/hooks/use-novel-data";

import { ReaderHeader } from "@/components/novel/reader-header";
import { ReaderContent } from "@/components/novel/reader-content";
import { ReaderNavigation } from "@/components/novel/reader-navigation";
import { ReaderComments } from "@/components/novel/reader-comments";
import { ReaderSettings } from "@/components/novel/reader-settings";
import { useReaderSettings } from "@/hooks/use-reader-settings";
import { useReaderProgress } from "@/hooks/use-reader-progress";
import { AiOutlineLoading } from "react-icons/ai";
import { VolumeProps } from "@/firebase/Read/getVolumes";

interface NovelReaderProps {
  novelId: string;
  volumes: VolumeProps[];
  volumeIndex: number;
  novelTitle: string;
  chapterIndex: number;
}

export function NovelReader({
  novelId,
  volumes,
  volumeIndex,
  novelTitle,
  chapterIndex,
}: NovelReaderProps) {
  const [chapIndex, setChapIndex] = useState<number>(chapterIndex);
  const [volIndex, setVolIndex] = useState<number>(volumeIndex);
  const [showTOC, setShowTOC] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const {
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
  } = useReaderSettings(novelId, volIndex, chapIndex);

  const { progress, contentRef, showScrollToTop, scrollToTop } =
    useReaderProgress();

  useEffect(() => {
    setChapIndex(chapterIndex);
    setVolIndex(volumeIndex);
  }, [chapterIndex, volumeIndex]);

  const { chapter, isLoading } = useChapter(
    novelId,
    volumes[volIndex]?.id,
    volumes[volIndex]?.tabeleOfContents[chapIndex]?.id
  );

  function handlePrevious() {
    if (chapIndex === 0) {
      if (volIndex > 0) {
        setVolIndex((prev) => prev - 1);
        setChapIndex(volumes[volIndex - 1].tabeleOfContents.length - 1);
      }
    } else {
      setChapIndex((prev) => prev - 1);
    }
    window.scrollTo({
      behavior: "smooth",
      top: 0,
    });
  }

  function handleNext() {
    if (chapIndex === volumes[volIndex]?.tabeleOfContents.length - 1) {
      if (volIndex < volumes.length - 1) {
        setVolIndex((prev) => prev + 1);
        setChapIndex(0);
      }
    } else {
      setChapIndex((prev) => prev + 1);
    }
    window.scrollTo({
      behavior: "smooth",
      top: 0,
    });
  }

  const isPrevDisabled = chapIndex === 0 && volIndex === 0;
  const isNextDisabled =
    volIndex === volumes.length - 1 &&
    chapIndex === volumes[volumes.length - 1].tabeleOfContents.length - 1;

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
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="space-y-10 bg-background min-h-screen">
      {/* Reading progress bar */}
      <div className="top-0 right-0 left-0 z-[5000] fixed bg-background/10 h-1">
        <div
          className="bg-primary h-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <ReaderHeader
        novelTitle={novelTitle}
        chapterTitle={chapter?.title || "Loading..."}
        isBookmarked={isBookmarked}
        toggleBookmark={toggleBookmark}
        shareChapter={shareChapter}
        setShowTOC={setShowTOC}
        showTOC={showTOC}
        setShowComments={setShowComments}
        showComments={showComments}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        fontSize={fontSize}
        lineHeight={lineHeight}
        fontFamily={fontFamily}
        textAlignment={textAlignment}
        theme={theme || "system"}
        setFontSize={setFontSize}
        setLineHeight={setLineHeight}
        setFontFamily={setFontFamily}
        setTextAlignment={setTextAlignment}
        setTheme={setTheme}
      />

      {isLoading ? (
        <div className="flex justify-center">
          <AiOutlineLoading className="animate-spin" size={60} />
        </div>
      ) : (
        <>
          <ReaderNavigation
            chapterTitle={chapter?.title || ""}
            handleNext={handleNext}
            handlePrevious={handlePrevious}
            isPrevDisabled={isPrevDisabled}
            isNextDisabled={isNextDisabled}
          />

          <ReaderContent
            content={chapter?.content || ""}
            fontSize={fontSize}
            lineHeight={lineHeight}
            fontFamily={fontFamily}
            textAlignment={textAlignment as "left" | "center" | "justify"}
            contentRef={contentRef}
          />

          <ReaderNavigation
            noTitle
            handleNext={handleNext}
            handlePrevious={handlePrevious}
            isPrevDisabled={isPrevDisabled}
            isNextDisabled={isNextDisabled}
          />

          <ReaderComments
            chapId={volumes[volIndex]?.tabeleOfContents[chapIndex]?.id}
            novelId={novelId}
            novelTitle={novelTitle}
            volId={volumes[volIndex]?.id}
            showComments={showComments}
            setShowComments={setShowComments}
          />

          <ReaderSettings
            showTOC={showTOC}
            setShowTOC={setShowTOC}
            volumes={volumes}
            volIndex={volIndex}
            chapIndex={chapIndex}
            setVolIndex={setVolIndex}
            setChapIndex={setChapIndex}
            novelTitle={novelTitle}
            isMobileMenuOpen={isMobileMenuOpen}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
            setShowComments={setShowComments}
            isBookmarked={isBookmarked}
            toggleBookmark={toggleBookmark}
            shareChapter={shareChapter}
            scrollToTop={scrollToTop}
            showScrollToTop={showScrollToTop}
          />
        </>
      )}
    </div>
  );
}
