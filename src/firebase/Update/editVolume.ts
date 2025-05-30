import { db } from "@/lib/firebaseConfig";
import { toast } from "@/lib/use-toast";
import { FirebaseError } from "firebase/app";
import { Timestamp, doc, setDoc } from "firebase/firestore";
import { VolumeProps } from "../Read/getVolumes";

interface novelProps {
  novelId: string;
  publishedOn: Timestamp;
  volumeId: string;
  volume: VolumeProps;
  volumeName: string;
}

const editVolume = async ({
  volumeName,
  volume,
  novelId,
  volumeId,
  publishedOn,
}: novelProps) => {
  setDoc(doc(db, "Novels", novelId, "Volumes", volumeId), {
    ...volume,
    tableContents: volume.tabeleOfContents || [],
    timestamp: Timestamp.fromDate(new Date(publishedOn.toDate())),
    name: volumeName,
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
export default editVolume;
