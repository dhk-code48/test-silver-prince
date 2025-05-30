"use client";

import type { newsProps } from "@/firebase/Read/getNews";
import { db } from "@/lib/firebaseConfig";
import { useCollectionQuery } from "@tanstack-query-firebase/react/firestore";
import { collection, orderBy, query } from "firebase/firestore";
import Link from "next/link";
import AnnouncementCard from "../App/Announcement";
import { AdminErrorState } from "../Admin/ErrorState";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useEffect, useState } from "react";
import { EnhancedAnnouncementCard } from "../shared/announcement";

const LandingNews = () => {
  const [api, setApi] = useState<CarouselApi>();

  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const ref = query(collection(db, "Announcements"), orderBy("publishedOn", "desc"));
  const { data, isLoading, error } = useCollectionQuery(ref, {
    queryKey: ["News"],
  });

  const news: newsProps[] | undefined = data?.docs.map(
    (doc) =>
      ({
        ...doc.data(),
        id: doc.id,
      } as newsProps)
  );

  // Responsive breakpoints
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isTablet = useMediaQuery("(min-width: 768px)");

  // Calculate how many items to show based on screen size
  const itemsToShow = isDesktop ? 3 : isTablet ? 2 : 1;

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-2xl">Announcements</h3>
        <Link href="/news" className="text-red-600 hover:underline">
          View all
        </Link>
      </div>

      {error ? (
        <AdminErrorState title="Unexpected Error!" />
      ) : (
        <div className="relative">
          <Carousel
            opts={{
              align: "start",
              slidesToScroll: itemsToShow,
            }}
            setApi={setApi}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {isLoading
                ? [1, 2, 3, 4].map((index) => (
                    <CarouselItem
                      key={index}
                      className={`pl-4 ${isDesktop ? "basis-1/3" : isTablet ? "basis-1/2" : "basis-full"}`}
                    >
                      <EnhancedAnnouncementCard to="#" title="" date={new Date()} description="" id="" />
                    </CarouselItem>
                  ))
                : news?.map((newsItem, index) => (
                    <CarouselItem
                      key={index + newsItem.id}
                      className={`pl-4 ${isDesktop ? "basis-1/3" : isTablet ? "basis-1/2" : "basis-full"}`}
                    >
                      <EnhancedAnnouncementCard
                        to="/news/"
                        title={newsItem.title}
                        date={newsItem.publishedOn.toDate()}
                        description={newsItem.description}
                        id={newsItem.id}
                      />
                    </CarouselItem>
                  ))}
            </CarouselContent>
            <div className="hidden md:block top-1/2 -left-12 absolute -translate-y-1/2">
              <CarouselPrevious />
            </div>
            <div className="hidden md:block top-1/2 -right-12 absolute -translate-y-1/2">
              <CarouselNext />
            </div>

            {/* Mobile navigation (inside the carousel) */}
            <div className="md:hidden top-1/2 left-0 absolute -translate-y-1/2">
              <CarouselPrevious />
            </div>
            <div className="md:hidden top-1/2 right-0 absolute -translate-y-1/2">
              <CarouselNext />
            </div>

            {/* Indicators */}
            <div className="flex justify-center gap-1 mt-4">
              {!isLoading &&
                news &&
                news.length > 0 &&
                Array.from({
                  length: Math.ceil(news.length / itemsToShow),
                }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      const api = (document.querySelector("[data-embla-api]") as any)?.__emblaApi;
                      if (api) api.scrollTo(index);
                    }}
                    className={`h-2 w-2 rounded-full transition-colors ${
                      Math.floor(current / count) === index ? "bg-red-600" : "bg-gray-300"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
            </div>
          </Carousel>
        </div>
      )}
    </div>
  );
};

export default LandingNews;
