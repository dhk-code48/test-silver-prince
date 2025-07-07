"use client";

import { db } from "@/lib/firebaseConfig";
import { useCollectionQuery } from "@tanstack-query-firebase/react/firestore";
import { collection, orderBy, query, Timestamp } from "firebase/firestore";
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
import { SilverPrinceBlog } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Calendar, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { CgArrowTopRight } from "react-icons/cg";

const LandingBlogs = () => {
  const [api, setApi] = useState<CarouselApi>();
  const router = useRouter();

  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const ref = query(collection(db, "Blogs"), orderBy("createdAt", "desc"));
  const { data, isLoading, error, refetch } = useCollectionQuery(ref, {
    queryKey: ["Blogs"],
  });

  const blogs: SilverPrinceBlog[] | undefined = data?.docs.map(
    (doc) =>
      ({
        ...doc.data(),
        id: doc.id,
      } as SilverPrinceBlog)
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

  const formatDate = (timestamp: Timestamp) => {
    if (!timestamp) return "Unknown date";
    try {
      const date = timestamp.toDate();
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return "Unknown date";
    }
  };

  const calculateReadTime = (content: string) => {
    if (!content) return 1;
    const wordCount = content.trim().split(/\s+/).length;
    return Math.ceil(wordCount / 200) || 1;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-2xl">Blogs</h3>
        <Link href="/blogs" className="text-red-600 hover:underline">
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
                      className={`pl-4 ${
                        isDesktop
                          ? "basis-1/3"
                          : isTablet
                          ? "basis-1/2"
                          : "basis-full"
                      }`}
                    >
                      <EnhancedAnnouncementCard
                        to="#"
                        title=""
                        date={new Date()}
                        description=""
                        id=""
                      />
                    </CarouselItem>
                  ))
                : blogs?.map((blog, index) => (
                    <CarouselItem
                      key={index + blog.id}
                      className={`pl-4 ${
                        isDesktop
                          ? "basis-1/3"
                          : isTablet
                          ? "basis-1/2"
                          : "basis-full"
                      }`}
                    >
                      <motion.div
                        key={blog.id}
                        whileHover={{ y: -8 }}
                        className="group cursor-pointer"
                        onClick={() => router.push(`/blogs/${blog.id}`)}
                      >
                        <Card className="bg-card/50 hover:shadow-xl backdrop-blur-sm border-border/50 h-full overflow-hidden transition-all duration-300">
                          <div className="relative aspect-[16/10] overflow-hidden">
                            <Image
                              width={400}
                              height={250}
                              src={
                                blog.banner ||
                                "/placeholder.svg?height=250&width=400"
                              }
                              alt={blog.title || "Blog post"}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          </div>

                          <CardHeader className="space-y-3">
                            <CardTitle className="group-hover:text-primary line-clamp-2 transition-colors duration-200">
                              {blog.title || "Untitled"}
                            </CardTitle>
                            <CardDescription className="flex items-center gap-4 text-xs">
                              <span className="flex items-center gap-1.5">
                                <Calendar className="w-3.5 h-3.5" />
                                {formatDate(blog.createdAt)}
                              </span>
                              <span className="flex items-center gap-1.5">
                                <Clock className="w-3.5 h-3.5" />
                                {calculateReadTime(blog.content)} min read
                              </span>
                            </CardDescription>
                          </CardHeader>

                          <CardContent>
                            <p className="text-muted-foreground line-clamp-3 leading-relaxed">
                              {blog.description || "No description available."}
                            </p>
                          </CardContent>

                          <CardFooter>
                            <Link
                              href={`/blogs/${blog.id}`}
                              className="group/link inline-flex items-center gap-2 hover:gap-3 font-medium text-primary text-sm transition-all duration-200"
                              onClick={(e) => e.stopPropagation()}
                            >
                              Read More
                              <CgArrowTopRight className="w-4 h-4 group-hover/link:rotate-45 transition-transform duration-200" />
                            </Link>
                          </CardFooter>
                        </Card>
                      </motion.div>
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
                blogs &&
                blogs.length > 0 &&
                Array.from({
                  length: Math.ceil(blogs.length / itemsToShow),
                }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      const api = (
                        document.querySelector("[data-embla-api]") as any
                      )?.__emblaApi;
                      if (api) api.scrollTo(index);
                    }}
                    className={`h-2 w-2 rounded-full transition-colors ${
                      Math.floor(current / count) === index
                        ? "bg-red-600"
                        : "bg-gray-300"
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

export default LandingBlogs;
