"use client";

import MenuBar from "@/components/Admin/MenuBar";
import AnnouncementCard from "@/components/App/Announcement";
import BasicSkeleton from "@/components/Skleaton";
import { buttonVariants } from "@/components/ui/button";
import useNews from "@/firebase/Read/getNews";
import Link from "next/link";
import React, { FC } from "react";
import { LuPlus } from "react-icons/lu";

const News: FC = () => {
  const news = useNews();

  return (
    <div>
      <div className="p-10">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-3xl tracking-tight">News</h2>
          <Link
            className={buttonVariants({
              className: "gap-2",
            })}
            href={"/admin/news/add"}
          >
            Add News <LuPlus size={18} />
          </Link>
        </div>
        <div className="flex flex-wrap gap-10 mt-5">
          {news !== null ? (
            news.map((news, index) => {
              return (
                <AnnouncementCard
                  key={index + news.id}
                  to="/admin/news/"
                  title={news.title}
                  date={news.date.toDate()}
                  description={news.description}
                  id={news.id}
                />
              );
            })
          ) : (
            <BasicSkeleton />
          )}
        </div>
      </div>
    </div>
  );
};

export default News;
