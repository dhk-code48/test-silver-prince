"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCollectionQuery } from "@tanstack-query-firebase/react/firestore";

import { slidesRef } from "@/lib/firestore-ref";
import { SilverPrinceSlide } from "@/lib/types";
import { AdminErrorState } from "../Admin/ErrorState";
import { Skeleton } from "../ui/skeleton";

// Define the slide type
interface Slide {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
}

export default function AppSlider() {
  const { data, isLoading, isError, error, refetch } = useCollectionQuery(
    slidesRef,
    {
      queryKey: ["slides"],
    }
  );

  const slides: SilverPrinceSlide[] = useMemo(
    () =>
      data?.docs.map(
        (doc) => ({ ...doc.data(), id: doc.id } as SilverPrinceSlide)
      ) || [],
    [data?.docs]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  // Initialize Embla carousel with autoplay plugin
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      skipSnaps: false,
    },
    [
      Autoplay({
        delay: 6000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  if (isError) {
    return (
      <AdminErrorState
        title="Error Loading Slides"
        description="We encountered a problem while fetching your carousel slides"
        error={error}
        onRetry={() => refetch()}
      />
    );
  }
  return (
    <div className="relative rounded-lg overflow-hidden">
      {/* Main carousel */}
      <div className="relative" ref={emblaRef}>
        <div className="flex">
          {isLoading ? (
            <Skeleton className="size-full animate-pulse" />
          ) : (
            slides.map((slide) => (
              <div key={slide.id} className="relative flex-[0_0_100%] min-w-0">
                {/* Image with gradient overlay */}
                <div className="relative w-full aspect-[21/9] overflow-hidden">
                  <Image
                    src={slide.banner || "/placeholder.svg"}
                    alt={slide.title}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                </div>

                {/* Content overlay */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={
                      slide.id + "-" + (selectedIndex === slides.indexOf(slide))
                    }
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: selectedIndex === slides.indexOf(slide) ? 1 : 0,
                      y: selectedIndex === slides.indexOf(slide) ? 0 : 20,
                    }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="right-0 bottom-0 left-0 absolute p-6 md:p-8 lg:p-10"
                  >
                    <div className="max-w-3xl text-left">
                      <h2 className="mb-2 md:mb-4 font-bold text-white text-xl md:text-3xl lg:text-4xl">
                        {slide.title}
                      </h2>
                      <p className="mb-4 md:mb-6 text-white/80 text-sm md:text-base truncate line-clamp-2 md:line-clamp-3">
                        {slide.description}
                      </p>
                      <Button
                        asChild
                        size="sm"
                        className="gap-2 px-6 rounded-full"
                      >
                        <Link href={slide.link}>
                          <Play className="w-4 h-4" />
                          More
                        </Link>
                      </Button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Navigation buttons */}
      <button
        onClick={scrollPrev}
        className="top-1/2 left-4 absolute bg-black/30 hover:bg-black/50 backdrop-blur-sm p-3 rounded-full text-white hover:scale-110 transition-all -translate-y-1/2 duration-200"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={scrollNext}
        className="top-1/2 right-4 absolute bg-black/30 hover:bg-black/50 backdrop-blur-sm p-3 rounded-full text-white hover:scale-110 transition-all -translate-y-1/2 duration-200"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots navigation */}
      <div className="top-4 right-0 left-0 absolute flex justify-center gap-2">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              selectedIndex === index
                ? "bg-primary w-4 scale-110"
                : "bg-white/50 hover:bg-white/80"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
