"use client";

import useNovel from "@/firebase/Read/getNovelData";
import useVolumes, { type VolumeProps } from "@/firebase/Read/getVolumes";
import { useSearchParams } from "next/navigation";
import { type FC, useEffect, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import NovelInfo from "./NovelInfo";
import { NovelReader } from "@/components/novel/novel-reader";

interface PageProps {
  params: { id: string };
}

const now = new Date();

const Novel: FC<PageProps> = (props) => {
  const params = props.params;
  const searchParams = useSearchParams();
  const [chapterIndex, setChapterIndex] = useState(0);
  const [volumeIndex, setVolumeIndex] = useState(0);

  useEffect(() => {
    const chapArr = JSON.parse(
      searchParams.get("chapter")?.toString() || "[0,0]"
    );
    setVolumeIndex(chapArr[0]);
    setChapterIndex(chapArr[1]);
  }, [searchParams]);

  const novel = useNovel(params.id);
  const volumes = useVolumes(params.id);

  const letNewVolumes: VolumeProps[] = volumes.map((volume) => {
    const newTOC = volume.tabeleOfContents.filter((chapter) => {
      const scheduledAt = chapter.scheduleAt
        ? new Date(chapter.scheduleAt) // Convert ISO string to Date
        : null;

      return (
        !scheduledAt || scheduledAt <= now // show if not scheduled or already due
      );
    });

    return {
      ...volume,
      tabeleOfContents: newTOC,
    };
  });

  // Remove the Head component as it's not compatible with App Router
  // Instead, use metadata in a separate file

  return (
    <div className="mx-auto py-10 lg:w-[70%]">
      {novel !== null && letNewVolumes !== null ? (
        <>
          {searchParams.get("chapter") === null ? (
            <NovelInfo novel={novel} volumes={letNewVolumes} id={params.id} />
          ) : (
            <NovelReader
              novelTitle={novel.title}
              volumeIndex={volumeIndex}
              volumes={letNewVolumes}
              chapterIndex={chapterIndex}
              novelId={params.id}
            />
          )}
        </>
      ) : (
        <div className="flex justify-center items-center mt-10">
          <AiOutlineLoading className="animate-spin" size={40} />
        </div>
      )}
    </div>
  );
};

export default Novel;
