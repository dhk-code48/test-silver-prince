"use client";

import React, { useMemo } from "react";
import { useCollectionQuery } from "@tanstack-query-firebase/react/firestore";

import { blogsRef } from "@/lib/firestore-ref";
import { SilverPrinceBlog } from "@/lib/types";

import { AdminEmptyState } from "@/components/Admin/EmptyState";
import { AdminLoadingState } from "@/components/Admin/LoadingState";
import { AdminErrorState } from "@/components/Admin/ErrorState";
import AddBlog from "@/components/Admin/add-blog";
import { BlogCard } from "@/components/Admin/blog-card";

const AdminBlogPage = () => {
  const { data, isLoading, isError, error, refetch } = useCollectionQuery(
    blogsRef,
    {
      queryKey: ["blogs"],
    }
  );

  const blogs: SilverPrinceBlog[] = useMemo(
    () =>
      data?.docs.map(
        (doc) => ({ ...doc.data(), id: doc.id } as SilverPrinceBlog)
      ) || [],
    [data?.docs]
  );

  if (isError) {
    return (
      <AdminErrorState
        title="Error Loading Blogs"
        description="We encountered a problem while fetching your blogs"
        error={error}
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <div className="flex-1 px-4 py-8">
      <div className="flex sm:flex-row flex-col justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="font-bold text-3xl tracking-tight">Blogs</h1>
          <p className="mt-1 text-muted-foreground">
            Manage the blogs that appear on your website.
          </p>
        </div>
        <AddBlog afterSubmit={() => refetch()} />
      </div>

      {isLoading || !data ? (
        <AdminLoadingState
          title="Loading  Blogs"
          description="Please wait while we fetch your  blogs"
          loadingMessage="Retrieving blogs from the database..."
        />
      ) : data.empty ? (
        <AdminEmptyState
          title="No Blogs Found"
          description="You haven't created any  blogs yet."
          actionLabel="Add Your First Blog"
          onAction={() => document.getElementById("add-blog-button")?.click()}
        />
      ) : (
        <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} onRefetch={() => refetch()} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminBlogPage;
