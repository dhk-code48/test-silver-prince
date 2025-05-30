import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";

interface CardProps {
  onClick?: () => void;
  src: string;
  to: string;
  title: string;
  tags: string;
}

const NovelCard: FC<CardProps> = ({ onClick, to, src, tags, title }) => {
  return (
    <Link
      href={to}
      className="my-3 text-center cursor-pointer w-full lg:w-[250px]"
      onClick={onClick}
    >
      <Image
        src={src}
        width={200.2}
        height={267.2}
        className="rounded-xl mx-auto mb-3"
        style={{
          backgroundPosition: "100% 100%",
        }}
        alt="background of card"
      />
      <div>
        <h3 className="text-xl font-bold text-slate-700 dark:text-white">
          {title}
        </h3>
        <p className="font-semibold mt-1 text-sm text-slate-700 dark:text-slate-400">
          {tags}
        </p>
      </div>
    </Link>
  );
};

export default NovelCard;
