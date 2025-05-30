import { deleteDoc, doc } from "firebase/firestore";
import { VolumeProps } from "../Read/getVolumes";
import { db } from "@/lib/firebaseConfig";
import { toast } from "@/lib/use-toast";
import { FirebaseError } from "firebase/app";

const deleteVolume = async (novelId: string, volume: VolumeProps) => {
  const a = prompt(
    "Enter the title of the volume to deleted it (i.e) " + volume.name
  );
  if (a === volume.name) {
    await deleteDoc(doc(db, "Novels", novelId, "Volumes", volume.id))
      .finally(() => {
        toast({
          title: "Volume Deleted Successfully !!",
          description: "Your volume has been deleted successfully..",
          variant: "default",
        });
        window.location.reload();
      })
      .catch((error: FirebaseError) => {
        toast({
          title: "Error while deleting !!",
          description: error.message,
          variant: "destructive",
        });
      });
  } else {
    toast({
      title: "Name didn't matched",
      description:
        "Name of the volume you typed didn't matched with original, Please Try Again !!",
      variant: "destructive",
    });
  }
};

export default deleteVolume;
