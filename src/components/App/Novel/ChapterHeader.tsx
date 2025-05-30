import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { FC } from "react";
import { LuBook, LuChevronLeft, LuChevronRight } from "react-icons/lu";

interface chProps {
  novelId: string;
  chapterTitle: string;
  prevDisable: boolean;
  nextDisable: boolean;
  handlePrevious: () => void;
  handleNext: () => void;
  noTitle?: boolean;
}
const ChapterHeader: FC<chProps> = ({
  chapterTitle,
  prevDisable,
  nextDisable,
  noTitle,
  handleNext,
  handlePrevious,
  novelId,
}) => {
  return (
    <div className="flex flex-wrap-reverse justify-center lg:justify-between items-center gap-5 lg:gap-0">
      {!noTitle && (
        <h1 className="font-bold text-3xl lg:text-left text-center">
          {chapterTitle}
        </h1>
      )}

      <div className="flex gap-10">
        <Button
          disabled={prevDisable}
          onClick={handlePrevious}
          className="gap-2"
          size={"sm"}
          variant={"outline"}
        >
          <LuChevronLeft size={20} />
          Previous
        </Button>
        <Button
          disabled={nextDisable}
          onClick={handleNext}
          className="gap-2"
          size={"sm"}
          variant={"outline"}
        >
          Next <LuChevronRight size={20} />
        </Button>
      </div>
    </div>
  );
};

export default ChapterHeader;
