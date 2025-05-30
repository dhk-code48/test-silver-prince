"use client"

import { useState, useEffect, useRef } from "react"

export function useReaderProgress() {
  const [progress, setProgress] = useState(0)
  const [showScrollToTop, setShowScrollToTop] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      // Show/hide scroll to top button
      if (window.scrollY > 300) {
        setShowScrollToTop(true)
      } else {
        setShowScrollToTop(false)
      }

      // Calculate reading progress
      if (contentRef.current) {
        const contentHeight = contentRef.current.scrollHeight
        const windowHeight = window.innerHeight
        const scrollPosition = window.scrollY
        const currentProgress = Math.min(Math.round((scrollPosition / (contentHeight - windowHeight)) * 100), 100)
        setProgress(currentProgress || 0)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return {
    progress,
    contentRef,
    showScrollToTop,
    scrollToTop,
  }
}
