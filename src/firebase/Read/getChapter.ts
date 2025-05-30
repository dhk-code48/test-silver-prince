import { db } from "@/lib/firebaseConfig";
import { Timestamp, doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

export interface chapterProps {
  content: string;
  publishedOn: Timestamp;
  title: string;
  id: string;
  scheduleAt?: string | null;
}

const useChapter = (novelId: string, volumeId: string, chpaterId: string) => {
  const [chapter, setChapter] = useState<chapterProps | null>(null);

  useEffect(() => {
    const ref = doc(
      db,
      "Novels",
      novelId,
      "Volumes",
      volumeId,
      "Chapters",
      chpaterId
    );
    async function getChapter() {
      const doc = await getDoc(ref);

      if (doc.exists()) {
        setChapter({
          id: doc.id,
          ...doc.data(),
          content: doc.data().content,
          publishedOn: doc.data().publishedOn,
          title: doc.data().title,
        });
      }
    }
    getChapter();
  }, [novelId, volumeId, chpaterId]);

  return chapter;
};

export default useChapter;
