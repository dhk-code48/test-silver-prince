import { db } from "@/lib/firebaseConfig";
import {
  addDoc,
  collection,
  doc,
  Timestamp,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { VolumeProps } from "../Read/getVolumes";
import { FirebaseError } from "firebase/app";
import { toast } from "@/lib/use-toast";

interface chapterProps {
  novelId: string;
  volume: VolumeProps;
  title: string;
  content: string;
  scheduleAt?: string;
}

const addChapter = async ({
  novelId,
  title,
  content,
  scheduleAt,
  volume,
}: chapterProps) => {
  const chaptersRef = collection(
    db,
    "Novels",
    novelId,
    "Volumes",
    volume.id,
    "Chapters"
  );
  const tableContents =
    typeof volume.tabeleOfContents === "undefined"
      ? []
      : volume.tabeleOfContents;

  await addDoc(chaptersRef, {
    title: title,
    content: content,
    publishedOn: serverTimestamp(),
    scheduleAt,
  })
    .then((e) => {
      tableContents.push({ title: title, id: e.id, scheduleAt });
      setDoc(doc(db, "Novels", novelId, "Volumes", volume.id), {
        ...volume,
        timestamp: Timestamp.fromDate(volume.publishedOn.toDate()),
        tableContents: tableContents,
      });
    })
    .finally(() => {
      toast({
        title: "Chapter Added Successfully !!",
        description: "Your new chapter has been added successfully",
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
};

export default addChapter;
