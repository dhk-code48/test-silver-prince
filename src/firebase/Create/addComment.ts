import { db } from "@/lib/firebaseConfig";
import { collection, serverTimestamp, addDoc } from "firebase/firestore";

interface pageProps {
  novelId: string;
  volId: string;
  message: string;
  chapterId: string;
  novelTitle: string;
  user: any;
}

const addComment = async ({ novelId, volId, message, novelTitle, chapterId, user }: pageProps) => {
  const docRef = collection(db, "Novels", novelId, "Volumes", volId, "Chapters", chapterId, "Comments");
  await addDoc(docRef, {
    message: message,
    displayName: user?.displayName,
    photoUrl: user.photoURL,
    timestamp: serverTimestamp(),
  });
  addDoc(collection(db, "Users", user.uid, "Comments"), {
    displayName: user?.displayName,
    message: message,
    novelId: novelId,
    novelTitle: novelTitle,
    photoUrl: user.photoURL,
    volId: volId,
    chapterId: chapterId,
  });
};
export default addComment;
