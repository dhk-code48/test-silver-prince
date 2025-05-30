"use client";

import { db } from "@/lib/firebaseConfig";
import { toast } from "@/lib/use-toast";
import { DocumentReference, Timestamp, doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

export interface novelProps {
  title: string;
  date: Timestamp;
  id: string;
  state: boolean;
  banner: string;
  tags: string;
  synopsis: string;
  webLink: string;
  rating: string;
}
const useNovel = (id: string) => {
  const [novel, setNovel] = useState<novelProps | null>(null);

  useEffect(() => {
    async function getNovel(ref: DocumentReference) {
      const doc = await getDoc(ref);
      if (doc.exists()) {
        const data = doc.data();
        setNovel({
          date: data.publishedOn,
          id: doc.id,
          state: data.state,
          title: data.title,
          banner: data.banner,
          tags: data.tags,
          synopsis: data.synopsis,
          rating: data.rating,
          webLink: data.webLink,
        });
      }
    }
    try {
      const ref = doc(db, "Novels", id);
      getNovel(ref);
    } catch {
      toast({
        title: "Not Available !!",
        description: "Sorry the data you are searching is not available",
        variant: "destructive",
      });
    }
  }, [id]);
  return novel;
};

export default useNovel;
