"use client";
import React, { FC, useEffect, useState } from "react";
import { Button, buttonVariants } from "../ui/button";
import { LuPlus, LuTrash2 } from "react-icons/lu";
import Image from "next/image";
import { Input } from "../ui/input";
import Rating from "../App/Novel/Rating";
import { Textarea } from "../ui/textarea";
import Link from "next/link";
import deleteNovel from "@/firebase/Delete/deleteNovel";
import { useRouter } from "next/navigation";
import editNovel from "@/firebase/Update/editNovelInfo";
import { useForm } from "react-hook-form";
import { novelProps } from "@/firebase/Read/getNovelData";
import { VolumeProps } from "@/firebase/Read/getVolumes";
import BasicSkeleton from "../Skleaton";
import AdminVolCollapse from "../App/AdminVolCollapse";
import addVolume from "@/firebase/Create/addVolume";
import { toast } from "@/lib/use-toast";
import { chapterProps } from "@/firebase/Read/getChapter";

type FormData = {
  banner: string;
  title: string;
  tags: string;
  rating: string;
  synopsis: string;
  webLink: string;
};
interface pageProps {
  setPageAdd: (vol: VolumeProps) => void;
  setPageEdit: (vol: VolumeProps, chapterId: string) => void;
  novel: novelProps;
  volumes: VolumeProps[];
}

const AdminNovelInfo: FC<pageProps> = ({
  setPageEdit,
  novel,
  setPageAdd,
  volumes,
}) => {
  const route = useRouter();

  const {
    register,
    setValue,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = handleSubmit((data) => {
    if (novel !== null) {
      editNovel({
        banner: data.banner,
        novelId: novel.id,
        publishedOn: new Date(novel.date.toDate()),
        synopsis: data.synopsis,
        tags: data.tags,
        webLink: data.webLink,
        title: data.title,
        rating: parseFloat(data.rating),
      }).finally(() => {
        route.push("/admin/novel");
      });
    }
  });
  const [bannerSrc, setBannerSrc] = useState<string | undefined>(
    getValues("banner")
  );

  // State to hold the rating
  const [rating, setRating] = useState<number | undefined>(
    parseFloat(getValues("rating"))
  );

  useEffect(() => {
    if (novel !== null) {
      setValue("banner", novel.banner);
      setValue("rating", novel.rating);
      setValue("tags", novel.tags);
      setValue("tags", novel.tags);
      setValue("title", novel.title);
      setValue("synopsis", novel.synopsis);
      setValue("webLink", novel.webLink);
      setBannerSrc(novel.banner);
      setRating(parseFloat(novel.rating));
    }
  }, [novel, setValue]);

  function handleNovelDeletion() {
    if (novel !== null) {
      deleteNovel(novel.id, novel.title).finally(() => {
        route.push("/admin/novel");
      });
    }
  }

  function handleVolumeAddition() {
    const volName = prompt("Enter New Volume Name");
    if (volName && novel !== null) {
      addVolume(novel.id, volName).finally(() => {
        window.location.reload();
      });
    } else {
      toast({
        title: "Error",
        description: "Invalid volume name",
        variant: "destructive",
      });
    }
  }

  // function handleVolDeletion(vol) {
  //   const a = prompt(
  //     "Enter the title of the volume to deleted it (i.e) " + vol.name
  //   );
  //   if (a === vol.name) {
  //     deleteDoc(doc(db, "Novels", novel[0].id, "Volumes", vol.id));
  //   }
  // }

  return (
    <div className="mx-auto pt-10 lg:w-[70%]">
      <div className="flex justify-end">
        <Button onClick={handleNovelDeletion} className="gap-2 bg-red-500">
          Delete Novel <LuTrash2 size={18} />
        </Button>
      </div>
      <form onSubmit={onSubmit} className="flex justify-stretch gap-10 mt-10">
        <div>
          <Image
            src={bannerSrc || "/banner.jpg"}
            width={300}
            height={400}
            className="rounded-xl"
            alt="background of card"
          />
          <Input
            {...register("banner", {
              onChange: (e) => {
                setBannerSrc(e.target.value);
              },
            })}
            className="mt-4"
            placeholder="Source Image for Banner"
          />
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <Input {...register("title")} className="font-bold text-3xl" />
            <Input
              {...register("tags")}
              className="mt-1 text-muted-foreground"
            />
            <div className="flex items-center gap-5 mt-8 w-auto">
              <Rating rating={rating || 0} />
              <Input
                type="text"
                {...register("rating", {
                  onChange: (e) => {
                    setRating(parseFloat(e.target.value));
                  },
                })}
                className="w-12"
              />{" "}
              <p className="flex text-lg cursor-pointer">
                <Input
                  {...register("webLink")}
                  className="text-blue-500"
                  placeholder="Link To Webnovel"
                />
              </p>
            </div>
          </div>
          <h1 className="pb-2 font-bold text-xl">Synopsis</h1>
          <Textarea
            placeholder="Synopsis Goes Here...."
            {...register("synopsis")}
          />
          <div className="flex gap-4 pb-10">
            <Button
              type="submit"
              className="bg-green-700 hover:bg-green-800 text-white"
            >
              Save Changes
            </Button>
            <Link
              type="submit"
              className={buttonVariants({ variant: "outline" })}
              href={"/admin/novel"}
            >
              Go Back
            </Link>
          </div>
        </div>
      </form>

      {volumes !== null ? (
        volumes.map((vol, index) => {
          return (
            <AdminVolCollapse
              setPageAdd={setPageAdd}
              setPageEdit={setPageEdit}
              volume={vol}
              index={index}
              novelId={novel.id}
              key={index + vol.id}
            />
          );
        })
      ) : (
        <BasicSkeleton />
      )}
      <Button onClick={handleVolumeAddition} className="gap-2 my-10">
        Add Volume <LuPlus />
      </Button>
    </div>
  );
};

export default AdminNovelInfo;
