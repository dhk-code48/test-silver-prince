import { db } from "@/lib/firebaseConfig";
import { toast } from "@/lib/use-toast";
import { FirebaseError } from "firebase/app";
import { doc, deleteDoc } from "firebase/firestore";

const deleteNovel = async (novelId: string, novelTitle: string) => {
  const novelsRef = doc(db, "Novels", novelId);
  const userTyped = prompt(
    "Type Novel Title To Deleted (i.e " + novelTitle + ")"
  );
  if (userTyped === novelTitle) {
    deleteDoc(novelsRef)
      .finally(() => {
        toast({
          title: "Deleted Successfully !!",
          description: "Your novel has been deleted",
          variant: "default",
        });
      })
      .catch((e: FirebaseError) => {
        toast({
          title: "There is an error while deleting novel",
          description: e.message,
          variant: "destructive",
        });
      });
  } else {
    toast({
      title: "Title didn't matched",
      description: "Name of the title didn't matched, Please try again",
      variant: "destructive",
    });
  }
};
export default deleteNovel;
