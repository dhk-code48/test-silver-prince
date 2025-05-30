import { db } from "@/lib/firebaseConfig";
import { collection, serverTimestamp, addDoc } from "firebase/firestore";

export interface addNovelProps {
  title: string;
  synopsis: string;
  banner: string;
  tags: string;
  rating: string;
  webLink: string;
}

const addNovel = async ({
  title,
  synopsis,
  webLink,
  rating,
  banner,
  tags,
}: addNovelProps) => {
  const novelsRef = collection(db, "Novels");
  await addDoc(novelsRef, {
    title: title,
    synopsis: synopsis,
    author: "The Silver Prince",
    publishedOn: serverTimestamp(),
    webLink: webLink,
    banner: banner,
    rating: rating,
    tags: tags,
  });
};
export default addNovel;
