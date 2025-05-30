"use client";

import { db } from "@/lib/firebaseConfig";
import type { SilverPrinceBlog } from "@/lib/types";
import { useDocumentQuery } from "@tanstack-query-firebase/react/firestore";
import { collection, doc } from "firebase/firestore";
import { useMemo } from "react";
import BlogHeader from "./blog-header";
import Image from "next/image";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type BlogContentProps = {
  id: string;
};

export default function BlogContent({ id }: BlogContentProps) {
  const { data, isLoading, isError, error } = useDocumentQuery(
    doc(collection(db, "Blogs"), id),
    {
      queryKey: ["blogs", id],
    }
  );

  console.log(" === FETCHING FROM FIRESTORE DATABASE === ");

  const blog: SilverPrinceBlog | undefined = useMemo(
    () => data && ({ ...data?.data(), id: data?.id } as SilverPrinceBlog),
    [data]
  );

  if (isLoading) {
    return <div className="bg-muted/20 h-screen animate-pulse"></div>;
  }

  if (isError || !blog) {
    return (
      <div className="mx-auto px-4 py-12 max-w-4xl container">
        <Alert variant="destructive">
          <AlertCircle className="w-4 h-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error?.message ||
              "Failed to load blog post. Please try again later."}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (blog.draft) {
    return (
      <div className="mx-auto px-4 py-12 max-w-4xl container">
        <Alert>
          <AlertCircle className="w-4 h-4" />
          <AlertTitle>Draft Post</AlertTitle>
          <AlertDescription>
            This post is currently in draft mode and not published yet.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <article className="mx-auto px-4 py-12 max-w-4xl container">
      <BlogHeader blog={blog} />

      {/* Banner Image */}
      <div className="relative my-8 rounded-lg w-full h-[400px] overflow-hidden">
        <Image
          src={blog.banner || "/placeholder.svg"}
          alt={blog.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Blog Content */}
      <div
        className="dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-primary prose prose-lg"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </article>
  );
}
