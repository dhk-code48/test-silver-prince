import { doc, deleteDoc, setDoc, Timestamp } from "firebase/firestore";
import { VolumeProps, tabeleOfContents } from "../Read/getVolumes";
import { db } from "@/lib/firebaseConfig";

interface deleteProps {
  novelId: string;
  volume: VolumeProps;
  chapterId: string;
  tableContents: tabeleOfContents[];
}

const deleteChapter = async ({
  novelId,
  volume,
  tableContents,
  chapterId,
}: deleteProps) => {
  const chapterRef = doc(
    db,
    "Novels",
    novelId,
    "Volumes",
    volume.id,
    "Chapters",
    chapterId
  );
  deleteDoc(chapterRef).then(() => {
    setDoc(doc(db, "Novels", novelId, "Volumes", volume.id), {
      ...volume,
      timestamp: Timestamp.fromDate(volume.publishedOn.toDate()),
      tableContents: tableContents,
    });
  });
};

export default deleteChapter;
