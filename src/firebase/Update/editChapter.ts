import { db } from "@/lib/firebaseConfig";
import { setDoc, doc, Timestamp } from "firebase/firestore";
import { VolumeProps, tabeleOfContents } from "../Read/getVolumes";
import { chapterProps } from "../Read/getChapter";
import { toast } from "@/lib/use-toast";
import { FirebaseError } from "firebase/app";

interface editProps {
  volume: VolumeProps;
  chapter: chapterProps;
  chapterTitle: string;
  chapterContent: string;
  scheduleAt: string | null;

  novelId: string;
  tableContents: tabeleOfContents[];
}

const editChapter = async ({
  novelId,
  chapterTitle,
  chapterContent,
  volume,
  tableContents,
  chapter,
  scheduleAt,
}: editProps) => {
  const chapterRef = doc(
    db,
    "Novels",
    novelId,
    "Volumes",
    volume.id,
    "Chapters",
    chapter.id
  );

  await setDoc(chapterRef, {
    ...chapter,
    publishedOn: Timestamp.fromDate(new Date(chapter.publishedOn.toDate())),
    title: chapterTitle,
    content: chapterContent,
    scheduleAt,
  }).then(() => {
    setDoc(doc(db, "Novels", novelId, "Volumes", volume.id), {
      ...volume,
      timestamp: Timestamp.fromDate(volume.publishedOn.toDate()),
      tableContents: tableContents,
    })
      .finally(() => {
        toast({
          title: "Chapter Edited Successfully !!",
          description: "Your new chapter has been edited successfully",
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
  });
};

export default editChapter;
