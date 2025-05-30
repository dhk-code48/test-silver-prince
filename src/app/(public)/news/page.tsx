"use client";

import { type FC, useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { newsProps } from "@/firebase/Read/getNews";
import Head from "next/head";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { useCollectionQuery } from "@tanstack-query-firebase/react/firestore";
import { AdminErrorState } from "@/components/Admin/ErrorState";
import {
  Search,
  Calendar,
  Clock,
  Megaphone,
  ArrowUpRight,
  Sparkles,
  TrendingUp,
  Bell,
  Grid3X3,
  List,
  SortDesc,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { EnhancedAnnouncementCard } from "@/components/shared/announcement";

const News: FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest");

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

  // Filter and sort news
  const filteredAndSortedNews = useMemo(() => {
    if (!news) return [];

    let filtered = news.filter(
      (item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortBy === "oldest") {
      filtered = filtered.reverse();
    }

    return filtered;
  }, [news, searchTerm, sortBy]);

  return (
    <>
      <Head>
        <title>TheSilverPrince | Announcements</title>
        <meta name="description" content="Stay updated with the latest announcements and news from TheSilverPrince" />
      </Head>

      <div className="relative bg-background min-h-screen overflow-hidden">
        {/* Background decorations */}
        <div className="top-0 left-0 absolute bg-gradient-to-br from-primary/10 to-accent/10 opacity-60 blur-3xl rounded-full w-96 h-96 -translate-x-1/2 -translate-y-1/2" />
        <div className="right-0 bottom-0 absolute bg-gradient-to-br from-accent/10 to-chart-2/10 opacity-60 blur-3xl rounded-full w-96 h-96 translate-x-1/2 translate-y-1/2" />

        <MaxWidthWrapper className="z-10 relative py-12">
          {/* Hero Section */}
          <div className="mb-12 text-center">
            <div className="flex justify-center items-center gap-3 mb-6">
              <div className="flex justify-center items-center bg-gradient-to-br from-primary to-accent shadow-lg rounded-2xl w-16 h-16">
                <Bell className="w-8 h-8 text-primary-foreground" />
              </div>
            </div>
            <h1 className="mb-4 font-sans font-bold text-foreground text-4xl md:text-5xl">Latest Announcements</h1>
            <p className="mx-auto max-w-2xl font-sans text-muted-foreground text-lg">
              Stay informed with our latest updates, news, and important announcements from TheSilverPrince
            </p>
          </div>

          {/* Search and Filter Section */}
          <Card className="bg-card/50 backdrop-blur-sm mb-8 border-border">
            <CardContent className="p-6">
              <div className="flex md:flex-row flex-col items-center gap-4">
                {/* Search */}
                <div className="relative flex-1 w-full">
                  <Search className="top-1/2 left-3 absolute w-4 h-4 text-muted-foreground -translate-y-1/2 transform" />
                  <Input
                    placeholder="Search announcements..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-background/50 pl-10 focus:border-primary/50 border-border"
                  />
                </div>

                {/* Controls */}
                <div className="flex items-center gap-2">
                  {/* Sort */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSortBy(sortBy === "newest" ? "oldest" : "newest")}
                    className="hover:border-primary/50 border-border"
                  >
                    <SortDesc className="mr-2 w-4 h-4" />
                    {sortBy === "newest" ? "Newest" : "Oldest"}
                  </Button>

                  {/* View Mode */}
                  <div className="flex border border-border rounded-lg overflow-hidden">
                    <Button
                      variant={viewMode === "grid" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                      className="border-0 rounded-none"
                    >
                      <Grid3X3 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                      className="border-0 rounded-none"
                    >
                      <List className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Stats */}
              {!isLoading && news && (
                <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border">
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <TrendingUp className="w-4 h-4" />
                    <span>{filteredAndSortedNews.length} announcements found</span>
                  </div>
                  {searchTerm && (
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      Searching: &quot;{searchTerm}&quot;
                    </Badge>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Content */}
          {error ? (
            <AdminErrorState title="Unexpected Error!" />
          ) : (
            <div
              className={cn(
                "gap-6",
                viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "flex flex-col space-y-4"
              )}
            >
              {isLoading ? (
                [1, 2, 3, 4, 5, 6].map((index) => (
                  <EnhancedAnnouncementCard
                    key={index}
                    to="#"
                    title=""
                    date={new Date()}
                    description=""
                    id=""
                    isLoading={true}
                    index={index}
                  />
                ))
              ) : filteredAndSortedNews.length > 0 ? (
                filteredAndSortedNews.map((newsItem, index) => (
                  <EnhancedAnnouncementCard
                    key={newsItem.id}
                    to="/news/"
                    title={newsItem.title}
                    date={newsItem.publishedOn.toDate()}
                    description={newsItem.description}
                    id={newsItem.id}
                    index={index}
                  />
                ))
              ) : (
                <div className="col-span-full py-12 text-center">
                  <div className="flex justify-center items-center bg-muted mx-auto mb-4 rounded-full w-16 h-16">
                    <Search className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="mb-2 font-semibold text-foreground text-lg">No announcements found</h3>
                  <p className="text-muted-foreground">
                    {searchTerm
                      ? `No announcements match "${searchTerm}". Try adjusting your search.`
                      : "No announcements available at the moment."}
                  </p>
                  {searchTerm && (
                    <Button variant="outline" onClick={() => setSearchTerm("")} className="mt-4">
                      Clear Search
                    </Button>
                  )}
                </div>
              )}
            </div>
          )}
        </MaxWidthWrapper>
      </div>
    </>
  );
};

export default News;
