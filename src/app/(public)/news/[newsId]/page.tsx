import { Suspense } from "react";
import type { Metadata } from "next";
import { db } from "@/lib/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

import NewsContent from "./_components/news-content";
import NewsLoading from "./_components/loading";

interface NewsPageProps {
  params: Promise<{
    newsId: string;
  }>;
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: NewsPageProps): Promise<Metadata> {
  try {
    const { newsId } = await params;
    const newsRef = doc(db, "Announcements", newsId);
    const newsSnapshot = await getDoc(newsRef);

    if (!newsSnapshot.exists()) {
      return {
        title: "News Not Found | The SilverPrince",
        description: "The requested news article could not be found",
      };
    }

    const newsData = newsSnapshot.data();

    return {
      title: `${newsData.title} | The SilverPrince`,
      description: newsData.description,
      openGraph: {
        title: `${newsData.title} | The SilverPrince`,
        description: newsData.description,
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: `${newsData.title} | The SilverPrince`,
        description: newsData.description,
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "News | The SilverPrince",
      description: "Latest news and announcements from The SilverPrince",
    };
  }
}

export default async function NewsPage({ params }: NewsPageProps) {
  const { newsId } = await params;
  return (
    <Suspense fallback={<NewsLoading />}>
      <NewsContent newsId={newsId} />
    </Suspense>
  );
}
