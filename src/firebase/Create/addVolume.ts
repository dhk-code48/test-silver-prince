import { db } from "@/lib/firebaseConfig";
import { toast } from "@/lib/use-toast";
import { FirebaseError } from "firebase/app";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

async function addVolume(novelId: string, volumeName: string) {
  await addDoc(collection(db, "Novels", novelId, "Volumes"), {
    name: volumeName,
    timestamp: serverTimestamp(),
    tableContents: [],
  })
    .finally(() => {
      toast({
        title: "Volume Added Successfully !!",
        description: "Your new volume has been added successfully",
        variant: "default",
      });
    })
    .catch((error: FirebaseError) => {
      toast({
        title: "Error !!",
        description: error.message,
        variant: "destructive",
      });
    });
}
export default addVolume;
