import { useEffect, useState } from "react";
import {
  Timestamp,
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";

export interface newsProps {
  content: string;
  description: string;
  id: string;
  date: Timestamp;
  title: string;
  state: boolean;
  publishedOn: Timestamp;
}
const useNews = () => {
  const [news, setNews] = useState<newsProps[] | null>(null);

  useEffect(() => {
    const ref = query(
      collection(db, "Announcements"),
      orderBy("publishedOn", "asc")
    );

    async function getNews() {
      const docs = await getDocs(ref);
      const novelsData: newsProps[] = [];

      docs.forEach((doc) => {
        const data = doc.data();
        novelsData.push({
          date: data.publishedOn,
          id: doc.id,
          state: data.state,
          title: data.title,
          content: data.content,
          description: data.description,
          publishedOn: data.publishedOn,
        });
      });

      setNews(novelsData);
    }

    getNews();
  }, []);

  return news;
};

export default useNews;
