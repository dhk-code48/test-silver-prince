import { db } from "@/lib/firebaseConfig";
import { toast } from "@/lib/use-toast";
import { collection, serverTimestamp, addDoc } from "firebase/firestore";

export interface addNovelProps {
  title: string;
  description: string;
  content: string;
}

const addNews = async ({ title, content, description }: addNovelProps) => {
  const newsRef = collection(db, "Announcements");
  await addDoc(newsRef, {
    title: title,
    content: content,
    description: description,
    author: "The Silver Prince",
    publishedOn: serverTimestamp(),
  });
};
export default addNews;
