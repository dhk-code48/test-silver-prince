"use client";

import { useState, useMemo, useEffect } from "react";
import { useCollectionQuery } from "@tanstack-query-firebase/react/firestore";
import { collection, query, type Timestamp, where } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Calendar, Clock, Filter, SortAsc, SortDesc, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { useDebounce } from "@/hooks/use-debounce";
import Image from "next/image";
import type { SilverPrinceBlog } from "@/lib/types";
import Link from "next/link";
import { CgArrowTopRight } from "react-icons/cg";
import { useRouter } from "next/navigation";

const BLOGS_PER_PAGE = 9;

export default function BlogsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "title">("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [_totalBlogs, setTotalBlogs] = useState(0);

  // Replace the existing blogsQuery and data fetching logic with:
  const blogsRef = collection(db, "Blogs");
  const blogsQuery = query(blogsRef, where("draft", "==", false));

  const {
    data: allBlogsData,
    isLoading,
    isError,
    error,
  } = useCollectionQuery(blogsQuery, {
    queryKey: ["all-blogs"],
  });

  // Update the filteredBlogs logic:
  const filteredAndSortedBlogs = useMemo(() => {
    const blogs: SilverPrinceBlog[] =
      allBlogsData?.docs.map((doc) => ({ ...doc.data(), id: doc.id } as SilverPrinceBlog)) || [];

    // First filter by search term
    let filtered = blogs;
    if (debouncedSearchTerm) {
      filtered = blogs.filter(
        (blog) =>
          blog.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
          blog.description.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );
    }

    // Then sort
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return b.createdAt.seconds - a.createdAt.seconds;
        case "oldest":
          return a.createdAt.seconds - b.createdAt.seconds;
        case "title":
          return a.title.localeCompare(b.title);
        default:
          return b.createdAt.seconds - a.createdAt.seconds;
      }
    });

    return sorted;
  }, [allBlogsData?.docs, debouncedSearchTerm, sortBy]);

  // Update pagination logic:
  const totalFilteredBlogs = filteredAndSortedBlogs.length;
  const totalPages = Math.ceil(totalFilteredBlogs / BLOGS_PER_PAGE);
  const startIndex = (currentPage - 1) * BLOGS_PER_PAGE;
  const endIndex = startIndex + BLOGS_PER_PAGE;
  const paginatedBlogs = filteredAndSortedBlogs.slice(startIndex, endIndex);

  // Reset current page when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm, sortBy]);
  const router = useRouter();

  // Remove the separate totalBlogs useEffect and replace with:
  const totalBlogs = allBlogsData?.docs.length || 0;

  const formatDate = (timestamp: Timestamp) => {
    const date = timestamp.toDate();
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const calculateReadTime = (content: string) => {
    const wordCount = content.trim().split(/\s+/).length;
    return Math.ceil(wordCount / 200) || 1;
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const clearSearch = () => {
    setSearchTerm("");
    setCurrentPage(1);
  };

  return (
    <div className="bg-gradient-to-br from-background via-background to-muted/20 min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0" />
        <div className="z-10 relative mx-auto px-4 container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 text-center"
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full font-medium text-primary text-sm">
              <Sparkles className="w-4 h-4" />
              Latest Stories & Insights
            </div>
            <h1 className="bg-clip-text bg-gradient-to-r from-foreground via-foreground to-foreground/70 font-bold text-transparent text-5xl md:text-7xl">
              Our Blog
            </h1>
            <p className="mx-auto max-w-2xl text-muted-foreground text-xl leading-relaxed">
              Discover the latest stories, insights, and knowledge from our team of experts.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="mx-auto px-4 pb-8 container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-card/50 shadow-lg backdrop-blur-sm p-6 border border-border/50 rounded-2xl"
        >
          <div className="flex md:flex-row flex-col items-center gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <motion.div
                animate={{
                  scale: isSearchFocused ? 1.02 : 1,
                  boxShadow: isSearchFocused ? "0 0 0 2px hsl(var(--primary))" : "none",
                }}
                transition={{ duration: 0.2 }}
                className="relative rounded-xl overflow-hidden"
              >
                <Search
                  className={`absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors ${
                    isSearchFocused ? "text-primary" : "text-muted-foreground"
                  }`}
                />
                <Input
                  placeholder="Search blogs, topics, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className="bg-background/80 focus:bg-background py-3 pr-4 pl-12 border-0 text-base transition-colors"
                />
                {searchTerm && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearSearch}
                    className="top-1/2 right-2 absolute p-0 w-7 h-7 -translate-y-1/2"
                  >
                    ×
                  </Button>
                )}
              </motion.div>
            </div>

            {/* Sort Options */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Filter className="w-4 h-4" />
                Sort by:
              </div>
              <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">
                    <div className="flex items-center gap-2">
                      <SortDesc className="w-4 h-4" />
                      Newest First
                    </div>
                  </SelectItem>
                  <SelectItem value="oldest">
                    <div className="flex items-center gap-2">
                      <SortAsc className="w-4 h-4" />
                      Oldest First
                    </div>
                  </SelectItem>
                  <SelectItem value="title">
                    <div className="flex items-center gap-2">
                      <SortAsc className="w-4 h-4" />
                      A-Z
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Search Results Info */}
          {debouncedSearchTerm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-4 pt-4 border-t border-border/50"
            >
              <p className="text-muted-foreground text-sm">
                Found <span className="font-semibold text-foreground">{totalFilteredBlogs}</span> results for{" "}
                <span className="font-semibold text-primary">"{debouncedSearchTerm}"</span>
              </p>
            </motion.div>
          )}
        </motion.div>
      </section>

      {/* Blog Grid */}
      <section className="mx-auto px-4 pb-16 container">
        {isLoading && (
          <div className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(BLOGS_PER_PAGE)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
              >
                <Card className="h-full overflow-hidden">
                  <Skeleton className="w-full aspect-[16/10]" />
                  <CardHeader className="space-y-3">
                    <Skeleton className="w-3/4 h-6" />
                    <div className="flex gap-2">
                      <Skeleton className="w-20 h-4" />
                      <Skeleton className="w-16 h-4" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Skeleton className="w-full h-4" />
                      <Skeleton className="w-full h-4" />
                      <Skeleton className="w-2/3 h-4" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {isError && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-destructive/10 p-8 border border-destructive/20 rounded-2xl text-center"
          >
            <p className="font-medium text-destructive">
              {error?.message || "Error loading blogs. Please try again later."}
            </p>
          </motion.div>
        )}

        {!isLoading && !isError && (
          <>
            <AnimatePresence mode="wait">
              <motion.div
                key={`${sortBy}-${currentPage}-${debouncedSearchTerm}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              >
                {paginatedBlogs.map((blog, index) => (
                  <motion.div
                    key={blog.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ y: -8 }}
                    className="group"
                    onClick={() => router.push(`/blogs/${blog.id}`)}
                  >
                    <Card className="bg-card/50 hover:shadow-primary/5 hover:shadow-xl backdrop-blur-sm border-border/50 h-full overflow-hidden transition-all duration-300">
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <Image
                          width={400}
                          height={250}
                          src={blog.banner || "/placeholder.svg?height=250&width=400"}
                          alt={blog.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>

                      <CardHeader className="space-y-3">
                        <CardTitle className="group-hover:text-primary line-clamp-2 transition-colors duration-200">
                          {blog.title}
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
                        <p className="text-muted-foreground line-clamp-3 leading-relaxed">{blog.description}</p>
                      </CardContent>

                      <CardFooter>
                        <Link
                          href={`/blogs/${blog.id}`}
                          className="group/link inline-flex items-center gap-2 hover:gap-3 font-medium text-primary text-sm transition-all duration-200"
                        >
                          Read More
                          <CgArrowTopRight className="w-4 h-4 group-hover/link:rotate-45 transition-transform duration-200" />
                        </Link>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* No Results */}
            {paginatedBlogs.length === 0 && !isLoading && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-16 text-center"
              >
                <div className="flex justify-center items-center bg-muted mx-auto mb-6 rounded-full w-24 h-24">
                  <Search className="w-10 h-10 text-muted-foreground" />
                </div>
                <h3 className="mb-2 font-semibold text-xl">
                  {debouncedSearchTerm ? "No blogs found" : "No blogs available"}
                </h3>
                <p className="mb-6 text-muted-foreground">
                  {debouncedSearchTerm
                    ? "Try adjusting your search terms or browse all blogs."
                    : "Check back later for new content."}
                </p>
                {debouncedSearchTerm && (
                  <Button onClick={clearSearch} variant="outline">
                    Clear Search
                  </Button>
                )}
              </motion.div>
            )}

            {/* Pagination */}
            {totalPages > 1 && paginatedBlogs.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex justify-center items-center gap-2 mt-12"
              >
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const pageNum = i + 1;
                    return (
                      <Button
                        key={pageNum}
                        variant={currentPage === pageNum ? "default" : "ghost"}
                        size="sm"
                        onClick={() => handlePageChange(pageNum)}
                        className="w-10 h-10"
                      >
                        {pageNum}
                      </Button>
                    );
                  })}

                  {totalPages > 5 && (
                    <>
                      <span className="px-2 text-muted-foreground">...</span>
                      <Button
                        variant={currentPage === totalPages ? "default" : "ghost"}
                        size="sm"
                        onClick={() => handlePageChange(totalPages)}
                        className="w-10 h-10"
                      >
                        {totalPages}
                      </Button>
                    </>
                  )}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="gap-2"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </motion.div>
            )}
          </>
        )}
      </section>
    </div>
  );
}
