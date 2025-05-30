"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { doc, type Timestamp } from "firebase/firestore";
import { useDocumentQuery } from "@tanstack-query-firebase/react/firestore";
import { db } from "@/lib/firebaseConfig";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  ArrowLeft,
  Share2,
  Bookmark,
  BookmarkCheck,
  Star,
} from "lucide-react";
import Image from "next/image";
import { SilverPrinceBlog } from "@/lib/types";

export default function BlogDetailPage() {
  const params = useParams();
  const router = useRouter();
  const blogId = params.id as string;

  const [isBookmarked, setIsBookmarked] = useState(false);

  // Create a reference to the specific blog document
  const blogRef = doc(db, "Blogs", blogId);

  // Fetch the blog using tanstack-query-firebase
  const { data, isLoading, isError } = useDocumentQuery(blogRef, {
    queryKey: ["blog", blogId],
  });

  // Convert the data to a more usable format
  const blog = useMemo(
    () => (data ? ({ ...data.data(), id: data.id } as SilverPrinceBlog) : null),
    [data]
  );

  // Check if blog is bookmarked on load
  useEffect(() => {
    if (blog) {
      // Check local storage for bookmark status
      const bookmarks = JSON.parse(
        localStorage.getItem("bookmarkedBlogs") || "[]"
      );
      setIsBookmarked(bookmarks.includes(blog.id));
    }
  }, [blog]);

  // Toggle bookmark status
  const toggleBookmark = () => {
    const bookmarks = JSON.parse(
      localStorage.getItem("bookmarkedBlogs") || "[]"
    );

    if (isBookmarked) {
      const updatedBookmarks = bookmarks.filter(
        (id: string) => id !== blog?.id
      );
      localStorage.setItem("bookmarkedBlogs", JSON.stringify(updatedBookmarks));
    } else {
      bookmarks.push(blog?.id);
      localStorage.setItem("bookmarkedBlogs", JSON.stringify(bookmarks));
    }

    setIsBookmarked(!isBookmarked);
  };

  // Share blog
  const shareBlog = () => {
    if (navigator.share) {
      navigator.share({
        title: blog?.title,
        text: blog?.description,
        url: window.location.href,
      });
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  // Format date
  const formatDate = (timestamp: Timestamp) => {
    const date = timestamp?.toDate();
    return date?.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Calculate read time (approximately 200 words per minute)
  const calculateReadTime = (content: string) => {
    const wordCount = content?.trim()?.split(/\s+/)?.length;
    const readTime = Math.ceil(wordCount / 200);
    return readTime < 1 ? 1 : readTime;
  };

  // Scroll progress indicator
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.offsetHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;

      const progressBar = document.getElementById("scroll-progress");
      if (progressBar) {
        progressBar.style.width = `${scrollPercent}%`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isLoading) {
    return (
      <div className="mx-auto px-4 py-12 container">
        <div className="mx-auto max-w-3xl">
          <Skeleton className="mb-8 w-48 h-8" />
          <Skeleton className="mb-4 w-full h-12" />
          <Skeleton className="mb-8 w-3/4 h-6" />
          <Skeleton className="mb-8 rounded-lg w-full h-64" />
          <div className="space-y-4">
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-3/4 h-4" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !blog || blog.draft) {
    return (
      <div className="mx-auto px-4 py-12 text-center container">
        <div className="bg-card mx-auto p-8 border border-border rounded-xl max-w-md">
          <div className="inline-flex justify-center items-center bg-red-100 dark:bg-red-900/20 mb-4 rounded-full w-16 h-16 text-red-600 dark:text-red-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2 className="mb-4 font-bold text-2xl">Blog not found</h2>
          <p className="mb-6 text-muted-foreground">
            The blog you&apos;re looking for doesn&apos;t exist or has been
            removed.
          </p>
          <Button onClick={() => router.push("/blogs")}>
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Blogs
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-background to-background/80 pb-16 min-h-screen">
      {/* Scroll Progress Bar */}
      <div className="top-0 right-0 left-0 z-50 fixed bg-background/10 h-1">
        <div
          id="scroll-progress"
          className="bg-gradient-to-r from-purple-500 to-pink-500 w-0 h-full"
        ></div>
      </div>

      {/* Back Button */}
      <div className="mx-auto px-4 pt-8 container">
        <Button
          variant="ghost"
          className="group hover:bg-background/80 mb-6"
          onClick={() => router.push("/blogs")}
        >
          <ArrowLeft className="mr-2 w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to Blogs
        </Button>
      </div>

      {/* Hero Section */}
      <div className="w-full">
        <div className="mx-auto px-4 container">
          <div className="mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {blog.featured && (
                <Badge className="flex items-center gap-1 bg-primary/80 hover:bg-primary mb-4 w-fit">
                  <Star className="fill-current w-3 h-3" />
                  Featured
                </Badge>
              )}

              <h1 className="mb-4 font-bold text-3xl md:text-4xl lg:text-5xl">
                {blog.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 mb-6 text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(blog.createdAt)}</span>
                </div>

                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{calculateReadTime(blog.content)} min read</span>
                </div>

                {blog.updatedAt &&
                  blog.updatedAt.seconds !== blog.createdAt.seconds && (
                    <div className="flex items-center gap-1">
                      <span className="text-sm">
                        Updated: {formatDate(blog.updatedAt)}
                      </span>
                    </div>
                  )}
              </div>
            </motion.div>

            {blog.banner && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="shadow-xl mb-8 rounded-xl overflow-hidden"
              >
                <Image
                  width={1980}
                  height={1024}
                  src={blog.banner || "/placeholder.svg"}
                  alt={blog.title}
                  className="w-full h-auto object-cover"
                />
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Blog Content */}
      <div className="mx-auto px-4 py-8 container">
        <div className="mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-8"
          >
            <p className="mb-8 text-xl leading-relaxed">{blog.description}</p>

            {/* Blog content - using dangerouslySetInnerHTML for HTML content */}
            <div
              className="dark:prose-invert max-w-none font-serif prose prose-lg"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </motion.div>

          {/* Engagement Actions */}
          <div className="flex flex-wrap justify-between items-center my-8 py-4 border-t border-b border-border">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-1"
                onClick={toggleBookmark}
              >
                {isBookmarked ? (
                  <BookmarkCheck className="fill-current w-4 h-4 text-primary" />
                ) : (
                  <Bookmark className="w-4 h-4" />
                )}
                <span>{isBookmarked ? "Saved" : "Save"}</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-1"
                onClick={shareBlog}
              >
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
