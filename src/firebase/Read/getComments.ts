import { db } from "@/lib/firebaseConfig";
import {
  Timestamp,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";

export interface commentProps {
  displayName: string;
  photoUrl: string;
  timestamp: Timestamp;
  message: string;
  id: string;
}
const useComments = (novelId: string, volId: string, chapterId: string) => {
  const [comments, setComments] = useState<commentProps[] | null>(null);
  useEffect(() => {
    const commentsRef = query(
      collection(
        db,
        "Novels",
        novelId,
        "Volumes",
        volId,
        "Chapters",
        chapterId,
        "Comments"
      ),
      orderBy("timestamp", "desc")
    );
    onSnapshot(commentsRef, (snapshot) => {
      const commentArr: commentProps[] = [];
      snapshot.docs.forEach((doc) => {
        if (doc.exists()) {
          const data = doc.data();
          commentArr.push({
            displayName: data.displayName,
            id: data.id,
            message: data.message,
            photoUrl: data.photoUrl,
            timestamp: data.timestamp,
          });
        }
      });
      setComments(commentArr);
    });
  }, [chapterId, novelId, volId]);
  return comments;
};

export default useComments;
