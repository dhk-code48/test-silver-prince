import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { FC } from "react";
import Collapse from "./Collapse";
import { VolumeProps } from "@/firebase/Read/getVolumes";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface props {
  className?: string;
  synopsis: string;
  id: string;
  volumes: VolumeProps[];
  novelId: string;
}
const Tab: FC<props> = ({
  id,
  novelId,
  className,
  synopsis,
  volumes,
  ...props
}) => {
  let lastVal: number = 0;
  return (
    <Tabs
      defaultValue={"about"}
      className={cn("w-[400px] overflow-hidden", className)}
      {...props}
    >
      <TabsList className="flex justify-start bg-background h-auto text-left">
        <TabsTrigger
          className="px-10 border-r font-bold data-[state=active]:text-blue-500 text-xl"
          value="about"
        >
          About
        </TabsTrigger>
        <TabsTrigger
          className="px-10 border-l font-bold data-[state=active]:text-blue-500 text-xl"
          value="tabelContents"
        >
          Table Of Contents
        </TabsTrigger>
      </TabsList>
      <TabsContent value="about" className="px-5 pt-10">
        <h1 className="pb-2 font-bold text-xl">Synopsis</h1>
        <p className="text-lg text-justify">{synopsis}</p>
      </TabsContent>
      <TabsContent value="tabelContents">
        <div>
          <Link
            href={`/novel/${novelId}?chapter=[${volumes?.length - 1},${
              volumes[volumes?.length - 1]?.tabeleOfContents.length - 1
            }]`}
            className="group block hover:bg-blue-400 mt-8 px-0 lg:px-10 py-5 border-y rounded-xl cursor-pointer"
          >
            <Button
              className="mb-3 rounded-full font-bold"
              size={"sm"}
              variant={"outline"}
            >
              Recent Released Chapter
            </Button>
            <p className="text-[20px] text-black-600 group-hover:text-white">
              Volume : {volumes[volumes.length - 1]?.name} || Chapter :
              {
                volumes[volumes.length - 1]?.tabeleOfContents[
                  volumes[volumes?.length - 1]?.tabeleOfContents.length - 1
                ].title
              }
            </p>
          </Link>

          {volumes.map((vol, index) => {
            const lastChapterIndex =
              index === 0
                ? 0
                : lastVal +
                  volumes[index - 1].tabeleOfContents.length -
                  volumes[0].tabeleOfContents.length;
            lastVal =
              index !== 0 ? volumes[index - 1].tabeleOfContents.length : 0;
            return (
              <Collapse
                novelId={id}
                volume={vol}
                index={index}
                chapterIndex={lastChapterIndex}
                title={vol.name}
                key={vol.id + index}
              />
            );
          })}
        </div>
      </TabsContent>
    </Tabs>
  );
};
export default Tab;
