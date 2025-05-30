"use client";

import MenuBar from "@/components/Admin/MenuBar";
import NovelCard from "@/components/App/Novel/NovelCard";
import BasicSkeleton from "@/components/Skleaton";
import { Button, buttonVariants } from "@/components/ui/button";
import useNovels from "@/firebase/Read/getNovels";
import Link from "next/link";
import React, { FC } from "react";
import { LuPlus } from "react-icons/lu";

const AdminNovels: FC = () => {
  const novels = useNovels();

  return (
    <div className="p-10">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-3xl tracking-tight">Novels</h2>
        <Link
          className={buttonVariants({
            className: "gap-2",
          })}
          href={"/admin/novel/add"}
        >
          Add Novel <LuPlus size={18} />
        </Link>
      </div>
      <div className="flex flex-wrap gap-10 mt-5">
        {novels !== null ? (
          novels.map((novel, index) => {
            return (
              <NovelCard
                key={index + novel.id}
                to={"/admin/novel/" + novel.id}
                src={novel.banner}
                tags={novel.tags}
                title={novel.title}
              />
            );
          })
        ) : (
          <BasicSkeleton />
        )}
      </div>
    </div>
  );
};

export default AdminNovels;
