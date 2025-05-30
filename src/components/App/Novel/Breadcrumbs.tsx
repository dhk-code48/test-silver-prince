import Link from "next/link";
import React, { FC } from "react";

interface bcProps {
  id: string;
  title: string;
  volume: string;
  chapter?: string;
}
const Breadcrumbs: FC<bcProps> = ({ id, title, chapter, volume }) => {
  return (
    <div className="flex flex-wrap items-center gap-1 md:gap-2 p-3 md:p-5 lg:px-0 text-muted-foreground">
      {!chapter && (
        <Link
          href={"/" + id}
          className={
            chapter
              ? "text-sm lg:text-base text-muted-foreground "
              : "text-foreground "
          }
        >
          Home {" / "}
        </Link>
      )}
      <Link
        href={"/novel/" + id}
        className={
          chapter
            ? "text-sm lg:text-base text-muted-foreground "
            : "text-foreground "
        }
      >
        {title}
      </Link>
      {volume && (
        <p className="text-muted-foreground text-sm lg:text-base">
          <span>/</span>

          {volume}
        </p>
      )}
      {chapter && (
        <>
          <span>/</span>
          <p className="text-foreground text-sm lg:text-base">
            {" "}
            {chapter}
          </p>{" "}
        </>
      )}
    </div>
  );
};

export default Breadcrumbs;
