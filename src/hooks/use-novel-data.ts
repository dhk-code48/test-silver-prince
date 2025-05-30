"use client";

import { useState, useEffect } from "react";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { tabeleOfContents, VolumeProps } from "@/firebase/Read/getVolumes";

export interface NovelData {
  id: string;
  title: string;
  synopsis: string;
  // Add other fields as needed
}

export interface ChapterData {
  id: string;
  title: string;
  content: string;
  publishedOn: {
    seconds: number;
    nanoseconds: number;
  };
}

export function useNovel(novelId: string) {
  const [novel, setNovel] = useState<NovelData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchNovel() {
      try {
        setIsLoading(true);
        const novelRef = doc(db, "Novels", novelId);
        const novelDoc = await getDoc(novelRef);

        if (novelDoc.exists()) {
          setNovel({
            id: novelDoc.id,
            ...novelDoc.data(),
          } as NovelData);
        } else {
          setError(new Error("Novel not found"));
        }
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to fetch novel")
        );
      } finally {
        setIsLoading(false);
      }
    }

    if (novelId) {
      fetchNovel();
    }
  }, [novelId]);

  return { novel, isLoading, error };
}

export function useVolumes(novelId: string) {
  const [volumes, setVolumes] = useState<VolumeProps[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchVolumes() {
      try {
        setIsLoading(true);
        const volumesRef = collection(db, "Novels", novelId, "Volumes");
        const volumesSnapshot = await getDocs(volumesRef);

        const volumesData: VolumeProps[] = [];

        for (const volumeDoc of volumesSnapshot.docs) {
          const tocRef = collection(
            db,
            "Novels",
            novelId,
            "Volumes",
            volumeDoc.id,
            "TableOfContents"
          );
          const tocSnapshot = await getDocs(tocRef);

          const toc: tabeleOfContents[] = tocSnapshot.docs.map((doc) => ({
            id: doc.id,
            title: doc.data().title,
          }));

          volumesData.push({
            id: volumeDoc.id,
            name: volumeDoc.data().name,
            publishedOn: volumeDoc.data().publishedOn,
            tabeleOfContents: toc,
          });
        }

        setVolumes(volumesData);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to fetch volumes")
        );
      } finally {
        setIsLoading(false);
      }
    }

    if (novelId) {
      fetchVolumes();
    }
  }, [novelId]);

  return { volumes, isLoading, error };
}

export function useChapter(
  novelId: string,
  volumeId?: string,
  chapterId?: string
) {
  const [chapter, setChapter] = useState<ChapterData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchChapter() {
      if (!volumeId || !chapterId) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const chapterRef = doc(
          db,
          "Novels",
          novelId,
          "Volumes",
          volumeId,
          "Chapters",
          chapterId
        );
        const chapterDoc = await getDoc(chapterRef);

        if (chapterDoc.exists()) {
          setChapter({
            id: chapterDoc.id,
            ...chapterDoc.data(),
          } as ChapterData);
        } else {
          setError(new Error("Chapter not found"));
        }
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to fetch chapter")
        );
      } finally {
        setIsLoading(false);
      }
    }

    fetchChapter();
  }, [novelId, volumeId, chapterId]);

  return { chapter, isLoading, error };
}
