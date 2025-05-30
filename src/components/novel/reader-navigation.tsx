"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ReaderNavigationProps {
  chapterTitle?: string
  handleNext: () => void
  handlePrevious: () => void
  isPrevDisabled: boolean
  isNextDisabled: boolean
  noTitle?: boolean
}

export function ReaderNavigation({
  chapterTitle,
  handleNext,
  handlePrevious,
  isPrevDisabled,
  isNextDisabled,
  noTitle = false,
}: ReaderNavigationProps) {
  return (
    <div className="container mx-auto max-w-3xl">
      {!noTitle && chapterTitle && (
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{chapterTitle}</h1>
        </div>
      )}

      <div className="flex justify-between items-center my-4">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={isPrevDisabled}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Previous</span>
        </Button>

        <Button variant="outline" onClick={handleNext} disabled={isNextDisabled} className="flex items-center gap-2">
          <span>Next</span>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
