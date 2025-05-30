"use client";

import { db } from "@/lib/firebaseConfig";
import { toast } from "@/lib/use-toast";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { newsProps } from "./getNews";

const useNewsData = (id: string) => {
  const [news, setNews] = useState<newsProps | null>(null);

  useEffect(() => {
    const ref = doc(db, "Announcements", id);
    async function getNews() {
      const doc = await getDoc(ref);
      if (doc.exists()) {
        const data = doc.data();
        setNews({
          content: data.content,
          description: data.description,
          date: data.publishedOn,
          id: doc.id,
          state: data.state,
          title: data.title,
          publishedOn: data.publishedOn,
        });
      } else {
        toast({
          title: "Not Available !!",
          description: "Sorry the data you are searching is not available",
          variant: "destructive",
        });
      }
    }
    getNews();
  }, [id]);
  return news;
};

export default useNewsData;
