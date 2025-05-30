import { db } from "@/lib/firebaseConfig";
import { toast } from "@/lib/use-toast";
import {
  Timestamp,
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";

export interface chapterProps {
  content: string;
  id: string;
  publishedOn: Timestamp | null;
  state: boolean;
  title: string;
}

const useChapters = (novelId: string, volumeId: string): chapterProps[] => {
  const [chapters, setChapters] = useState<chapterProps[]>([]);
  useEffect(() => {
    const ref = query(
      collection(db, "Novels", novelId, "Volumes", volumeId, "Chapters"),
      orderBy("publishedOn", "desc")
    );
    async function getVolume() {
      const docs = await getDocs(ref);
      const volumeData: chapterProps[] = [];
      docs.forEach((doc) => {
        const data = doc.data();
        if (doc.exists()) {
          volumeData.push({
            content: data.content,
            title: data.title,
            id: doc.id,
            state: data.state,
            publishedOn: data.publishedOn,
          });
        } else {
          toast({
            title: "404 Not Found",
            description:
              "Sorry data you are trying to get is not available yet",
            variant: "destructive",
          });
        }
      });
      setChapters(volumeData);
    }
    getVolume();
  }, [volumeId, novelId]);

  return chapters;
};

export default useChapters;
