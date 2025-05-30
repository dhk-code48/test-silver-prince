"use client";

import { useState, useMemo, useEffect } from "react";
import { useCollectionQuery } from "@tanstack-query-firebase/react/firestore";
import { collection, query, Timestamp, where } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Calendar, Clock } from "lucide-react";
import { useDebounce } from "@/hooks/use-debounce";
import Image from "next/image";
import { SilverPrinceBlog } from "@/lib/types";
import Link from "next/link";
import { CgArrowTopRight } from "react-icons/cg";

export default function BlogsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const blogsRef = collection(db, "Blogs");
  const blogsQuery = query(blogsRef, where("draft", "==", false));

  const { data, isLoading, isError, error } = useCollectionQuery(blogsQuery, {
    queryKey: ["blogs"],
  });

  const filteredBlogs = useMemo(() => {
    const blogs: SilverPrinceBlog[] =
      data?.docs.map(
        (doc) => ({ ...doc.data(), id: doc.id } as SilverPrinceBlog)
      ) || [];

    if (!debouncedSearchTerm) return blogs;

    return blogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        blog.description
          .toLowerCase()
          .includes(debouncedSearchTerm.toLowerCase())
    );
  }, [data?.docs, debouncedSearchTerm]);

  const formatDate = (timestamp: Timestamp) => {
    const date = timestamp.toDate();
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const calculateReadTime = (content: string) => {
    const wordCount = content.trim().split(/\s+/).length;
    return Math.ceil(wordCount / 200) || 1;
  };

  return (
    <div className="space-y-5 mt-5 min-h-screen">
      <section className="relative w-full overflow-hidden">
        <div className="z-10 relative space-y-5 mx-auto container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="bg-clip-text bg-gradient-to-r from-primary/60 to-primary font-bold text-transparent text-4xl md:text-5xl leading-16">
              Our Blog
            </h1>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Discover the latest stories and insights from our team.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto px-4 py-8 container">
        <div className="bg-card shadow-lg mb-8 p-4 border border-border/50 rounded-xl">
          <div className="relative">
            <motion.div animate={{ scale: isSearchFocused ? 0.97 : 1 }}>
              <Search
                className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${
                  isSearchFocused ? "text-primary" : "text-muted-foreground"
                }`}
              />
              <Input
                placeholder="Search blogs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="pl-10"
              />
            </motion.div>
          </div>
        </div>

        {isLoading && (
          <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="w-full aspect-video" />
                <CardHeader>
                  <Skeleton className="w-3/4 h-6" />
                  <Skeleton className="w-1/3 h-4" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="w-full h-4" />
                  <Skeleton className="w-full h-4" />
                  <Skeleton className="w-2/3 h-4" />
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {isError && (
          <div className="bg-card p-8 border border-border rounded-xl text-center">
            <p className="text-red-500">
              {error?.message || "Error loading blogs"}
            </p>
          </div>
        )}

        {!isLoading && !isError && (
          <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence>
              {filteredBlogs.map((blog) => (
                <motion.div
                  key={blog.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  layout
                >
                  <Card className="border-border/50 h-full overflow-hidden">
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        width={1980}
                        height={1024}
                        src={blog.banner || "/placeholder.svg"}
                        alt={blog.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle>{blog.title}</CardTitle>
                      <CardDescription className="flex gap-4 mt-2">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {formatDate(blog.createdAt)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {calculateReadTime(blog.content)} min read
                        </span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground line-clamp-3">
                        {blog.description}
                      </p>
                    </CardContent>
                    <CardFooter className="font-medium text-primary text-sm">
                      <Link
                        href={`/blogs/${blog.id}`}
                        className="flex items-center gap-2"
                      >
                        Read More <CgArrowTopRight className="size-4" />{" "}
                      </Link>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </section>
    </div>
  );
}
