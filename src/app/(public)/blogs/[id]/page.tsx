import type { SilverPrinceBlog } from "@/lib/types";

import type { Metadata, ResolvingMetadata } from "next";
import { Suspense } from "react";
import BlogLoading from "./loading";
import BlogContent from "../_components/blog-content";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};
// Generate metadata for SEO
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const props = await params;
  const url = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";

  // Fetch blog data from Firestore
  try {
    const blogSnapshot = await fetch(`${url}/api/blog/${props.id}`).then(
      (res) => {
        if (!res.ok) throw new Error("Failed to fetch blog");
        return res.json();
      }
    );

    const blog = blogSnapshot.data as SilverPrinceBlog;

    if (!blog) {
      return {
        title: "Blog Not Found",
        description: "The requested blog could not be found",
      };
    }

    // Use the blog's SEO fields
    return {
      title: blog.seoTitle || blog.title,
      description: blog.seoDescription || blog.description,
      openGraph: {
        title: blog.seoTitle || blog.title,
        description: blog.seoDescription || blog.description,
        images: [
          {
            url: blog.ogImage || blog.banner,
            width: 1200,
            height: 630,
            alt: blog.title,
          },
        ],
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: blog.seoTitle || blog.title,
        description: blog.seoDescription || blog.description,
        images: [blog.ogImage || blog.banner],
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Pokemon Novel Blog",
      description: "Read our latest Pokemon novel blog posts",
    };
  }
}

export default async function BlogViewPage({ params }: Props) {
  const props = await params;
  return (
    <Suspense fallback={<BlogLoading />}>
      <BlogContent id={props.id} />
    </Suspense>
  );
}
