"use client";
import { Button } from "@/components/ui/button";
import React, { FC, useEffect, useRef, useState } from "react";
import { AiOutlineMenuFold } from "react-icons/ai";
import { LuMenu } from "react-icons/lu";
import ThemeToggle from "../ThemeToggle";
import { VolumeProps, tabeleOfContents } from "@/firebase/Read/getVolumes";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface sideProps {
  tableOfContents: tabeleOfContents[];
  volIndex: number;
  chapIndex: number;
  volumes: VolumeProps[];
  novelId: string;
  handleChapArr: (c: number, v: number) => void;
}

const SideBar: FC<sideProps> = ({
  tableOfContents,
  volIndex,
  novelId,
  volumes,
  chapIndex,
  handleChapArr,
}) => {
  const [drawerState, setDrawerState] = useState(false);
  const [selectedVol, setSelectedVol] = useState<number>(volIndex);

  useEffect(() => {
    setSelectedVol(volIndex);
  }, [volIndex]);

  const tcContainer = useRef(null);

  useEffect(() => {
    if (tcContainer.current !== null) {
      const scrollToChapter = () => {
        const chapterElement = document.getElementById(`chap-${chapIndex}`);
        if (chapterElement) {
          chapterElement.scrollIntoView({ behavior: "smooth" });
        }
      };
      scrollToChapter();
    }
  }, [chapIndex]);

  return (
    <div className="top-[45px] right-10 lg:right-0 z-40 fixed lg:bg-gray-200 dark:bg-slate-900 lg:h-screen">
      <div className="flex lg:flex-col justify-center items-center gap-5 w-[50px] lg:h-screen">
        <Button
          variant={"ghost"}
          onClick={() => setDrawerState((prev) => !prev)}
        >
          <AiOutlineMenuFold size={20} />
        </Button>
        <div className="flex">
          <ThemeToggle />
        </div>
      </div>
      {drawerState && (
        <div
          ref={tcContainer}
          className="top-20 right-0 lg:right-[70px] fixed bg-gray-200 dark:bg-slate-900 p-5 pb-20 rounded w-[80%] lg:w-[400px] h-screen overflow-y-scroll scrollbar"
        >
          <h1 className="font-bold text-2xl">Table of Contents</h1>
          <Select
            value={selectedVol.toString()}
            onValueChange={(e) => setSelectedVol(parseInt(e))}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a Volume" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Volumes</SelectLabel>
                {volumes !== null ? (
                  volumes.map((volume, index) => {
                    return (
                      <SelectItem
                        className="py-4 text-[16px]"
                        defaultChecked={index === volIndex}
                        key={index + volume.id}
                        value={index.toString()}
                      >
                        {volume.name}
                      </SelectItem>
                    );
                  })
                ) : (
                  <SelectItem value="apple">Loading....</SelectItem>
                )}
              </SelectGroup>
            </SelectContent>
          </Select>
          <div>
            {volumes[selectedVol].tabeleOfContents.map((chapter, index) => (
              <p
                onClick={() => handleChapArr(selectedVol, index)}
                className="block hover:bg-gray-300 dark:hover:bg-slate-800 my-5 p-5 border border-gray-300 dark:border-gray-700 rounded-lg"
                key={index}
                id={`chap-${index}`}
              >
                {chapter.title}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SideBar;
