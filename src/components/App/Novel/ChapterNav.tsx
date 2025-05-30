import Image from "next/image";
import React, { FC } from "react";
import Breadcrumbs from "./Breadcrumbs";
import ThemeToggle from "../ThemeToggle";
import Link from "next/link";

interface navProps {
  novelTitle: string;
  novelId: string;
  title: string;
  volume: string;
}

const ChapterNav: FC<navProps> = ({ novelTitle, title, novelId, volume }) => {
  return (
    <div className="z-20 place-content-center grid w-full">
      <Breadcrumbs
        id={novelId}
        title={novelTitle}
        chapter={title}
        volume={volume}
      />
    </div>
  );
};

export default ChapterNav;
