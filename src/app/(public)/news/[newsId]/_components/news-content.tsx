"use client";

import { formatDate } from "@/app/(public)/blogs/_components/blog-header";
import { db } from "@/lib/firebaseConfig";
import { toast } from "@/lib/use-toast";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { LuCalendar } from "react-icons/lu";

export interface NewsProps {
  content: string;
  description: string;
  date: any;
  id: string;
  state: string;
  title: string;
  publishedOn: any;
}

interface NewsContentProps {
  newsId: string;
}

export default function NewsContent({ newsId }: NewsContentProps) {
  const [news, setNews] = useState<NewsProps | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setIsLoading(true);
        const newsRef = doc(db, "Announcements", newsId);
        const newsSnapshot = await getDoc(newsRef);

        if (!newsSnapshot.exists()) {
          toast({
            title: "Not Available!",
            description:
              "Sorry, the news article you are looking for is not available",
            variant: "destructive",
          });
          router.push("/news");
          return;
        }

        const data = newsSnapshot.data();
        setNews({
          content: data.content,
          description: data.description,
          date: data.publishedOn,
          id: newsSnapshot.id,
          state: data.state,
          title: data.title,
          publishedOn: data.publishedOn,
        });
      } catch (err) {
        console.error("Error fetching news:", err);
        setError("Failed to load news article. Please try again later.");
        toast({
          title: "Error",
          description: "Failed to load news article. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, [newsId, router]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center bg-white dark:bg-paper mx-auto p-10 rounded-lg lg:w-[900px] min-h-[calc(100vh-80px)]">
        <AiOutlineLoading size={30} className="animate-spin" />
      </div>
    );
  }

  if (error || !news) {
    return (
      <div className="bg-white dark:bg-paper mx-auto p-10 rounded-lg lg:w-[900px] min-h-[calc(100vh-80px)]">
        <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-md text-red-800 dark:text-red-200">
          {error || "News article not found"}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-paper mx-auto p-10 rounded-lg lg:w-[900px] min-h-[calc(100vh-80px)]">
      <h1 className="font-bold text-2xl tracking-wide">{news.title}</h1>
      <p className="flex items-center gap-2 mt-1 text-muted-foreground text-sm">
        <LuCalendar />
        {formatDate(news.date.toDate())}
      </p>
      <div
        className="mt-5 text-muted-foreground"
        dangerouslySetInnerHTML={{ __html: news.description }}
      />
      <div
        className="dark:prose-invert mt-10 max-w-none prose prose-sm"
        dangerouslySetInnerHTML={{ __html: news.content }}
      />
    </div>
  );
}
