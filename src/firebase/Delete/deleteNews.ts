import { db } from "@/lib/firebaseConfig";
import { toast } from "@/lib/use-toast";
import { FirebaseError } from "firebase/app";
import { doc, deleteDoc } from "firebase/firestore";

const deleteNews = async (newsId: string) => {
  const novelsRef = doc(db, "Announcements", newsId);
  const state = confirm("Are You Sure You want To Delete it !");
  if (state) {
    await deleteDoc(novelsRef)
      .finally(() => {
        toast({
          title: "Deleted Successfully !!",
          description: "Your news has been deleted",
          variant: "default",
        });
      })
      .catch((e: FirebaseError) => {
        toast({
          title: "There is an error while deleting news",
          description: e.message,
          variant: "destructive",
        });
      });
  } else {
    toast({
      title: "Deletion Cancled !!",
      description: "You news is not deleted...",
      variant: "destructive",
    });
  }
};
export default deleteNews;
