"use client";

import AddChapter from "@/components/Admin/AddChapter";
import EditChapter from "@/components/Admin/EditChapter";
import AdminNovelInfo from "@/components/Admin/NovelInfo";
import BasicSkeleton from "@/components/Skleaton";
import { VolumeProps } from "@/firebase/Read/getVolumes";
import useNovel from "@/firebase/Read/getNovelData";
import useVolumes from "@/firebase/Read/getVolumes";

import React, { FC, useState } from "react";

interface pageProps {
  params: {
    novelId: string;
  };
}

interface pageState {
  chapterId: string | null;
  volume: VolumeProps | null;
  state: "novel" | "add" | "edit";
}
const AdminNovelClient: FC<pageProps> = ({ params }) => {
  const [pageState, setPageState] = useState<pageState>({
    state: "novel",
    volume: null,
    chapterId: null,
  });

  function setPageAdd(vol: VolumeProps) {
    setPageState({ volume: vol, state: "add", chapterId: null });
  }

  function setPageNovel() {
    setPageState({ volume: null, chapterId: null, state: "novel" });
  }

  function setPageEdit(vol: VolumeProps, chapter: string) {
    setPageState({ volume: vol, chapterId: chapter, state: "edit" });
  }

  const novel = useNovel(params.novelId);
  const volumes = useVolumes(params.novelId);

  if (!novel) return <BasicSkeleton />;

  return (
    <>
      {pageState.state === "novel" && (
        <AdminNovelInfo
          setPageAdd={setPageAdd}
          setPageEdit={setPageEdit}
          novel={novel}
          volumes={volumes}
        />
      )}
      {pageState.state === "add" && pageState.volume && (
        <AddChapter
          novelId={novel.id}
          setPageNovel={setPageNovel}
          vol={pageState.volume}
        />
      )}
      {pageState.state === "edit" &&
        pageState.volume &&
        pageState.chapterId && (
          <EditChapter
            novelId={novel.id}
            pageState={pageState}
            setPageNovel={setPageNovel}
          />
        )}
    </>
  );
};

export default AdminNovelClient;
