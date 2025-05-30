import { db } from "@/lib/firebaseConfig";
import { toast } from "@/lib/use-toast";
import { FirebaseError } from "firebase/app";
import { Timestamp, doc, serverTimestamp, setDoc } from "firebase/firestore";

interface novelProps {
  title: string;
  synopsis: string;
  banner: string;
  tags: string;
  novelId: string;
  publishedOn: Date;
  rating: number;
  webLink: string;
}

const editNovel = async ({
  title,
  synopsis,
  webLink,
  banner,
  tags,
  novelId,
  rating,
  publishedOn,
}: novelProps) => {
  const novelRef = doc(db, "Novels", novelId);
  await setDoc(novelRef, {
    title: title,
    synopsis: synopsis,
    author: "The Silver Prince",
    publishedOn: Timestamp.fromDate(publishedOn),
    rating: rating,
    banner: banner,
    webLink: webLink,
    tags: tags,
  })
    .finally(() => {
      toast({
        title: "Edited Successfully !!",
        description: "Your novel has been edited",
        variant: "default",
      });
    })
    .catch((e: FirebaseError) => {
      toast({
        title: "There is an error while editing nove;",
        description: e.message,
        variant: "destructive",
      });
    });
};
export default editNovel;
