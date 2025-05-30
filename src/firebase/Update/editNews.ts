import { db } from "@/lib/firebaseConfig";
import { Timestamp, setDoc, doc } from "firebase/firestore";

export interface addNovelProps {
  title: string;
  description: string;
  content: string;
  newsId: string;
  publishedOn: Timestamp;
}

const editNews = async ({
  publishedOn,
  title,
  content,
  description,
  newsId,
}: addNovelProps) => {
  const newsRef = doc(db, "Announcements", newsId);
  await setDoc(newsRef, {
    title: title,
    publishedOn: Timestamp.fromDate(new Date(publishedOn.toDate())),
    content: content,
    description: description,
    author: "The Silver Prince",
  });
};
export default editNews;
