"use client";
import MenuBar from "@/components/Admin/MenuBar";
import Rating from "@/components/App/Novel/Rating";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import addNews from "@/firebase/Create/addNews";
import addNovel from "@/firebase/Create/addNovel";
import { toast } from "@/lib/use-toast";
import "suneditor/dist/css/suneditor.min.css";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import SunEditor from "suneditor-react";

type FormData = {
  title: string;
  description: string;
};

const AddNews: FC = () => {
  const route = useRouter();
  const { register, handleSubmit } = useForm<FormData>();
  const [content, setContent] = useState("");

  const handleEditorChange = (content: string) => {
    setContent(content);
  };

  const onSubmit = handleSubmit((data) => {
    addNews({
      title: data.title,
      description: data.description,
      content: content,
    })
      .then(() => {
        toast({
          title: "Adding Please Wait a second !!",
          description: "Your New Novel is being added",
          variant: "default",
        });
      })
      .finally(() => {
        toast({
          title: "Added Successfully !!",
          description: "Your New Novel has been Added successfully",
          variant: "default",
        });
        route.push("/admin/news");
      })
      .catch((e) => {
        toast({
          title: "Error while adding",
          description: e.message,
          variant: "destructive",
        });
      });
  });

  return (
    <div className="bg-white dark:bg-paper mx-auto p-10 rounded-lg lg:w-[900px] min-h-[calc(100vh-80px)]">
      <form onSubmit={onSubmit}>
        <Input
          {...register("title")}
          placeholder="Title Goes Here ..."
          className="font-bold text-3xl"
        />
        <Textarea
          {...register("description")}
          placeholder="Description Goes Here ..."
          className="my-5 text-muted-foreground"
        />
        <SunEditor
          onChange={handleEditorChange}
          placeholder="Content of Announcements"
          setAllPlugins={true}
          setDefaultStyle="font-family:Merriweather; font-size:18px; line-height:32.8px"
          setOptions={{
            font: [
              "Merriweather",
              "Angkor",
              "'Nunito Sans'",
              "'Slabo 27px'",
              "Lobster",
            ],
            buttonList: [
              ["font", "fontSize", "formatBlock"],
              ["fontColor", "hiliteColor", "textStyle"],
              ["paragraphStyle"],
              [
                "bold",
                "underline",
                "italic",
                "strike",
                "subscript",
                "superscript",
              ],
              ["fontColor", "hiliteColor"],
              ["removeFormat"],
              "/", // Line break
              ["outdent", "indent"],
              ["align", "horizontalRule", "list", "lineHeight"],
              ["table", "link", "image", "video", "audio"],
              ["fullScreen", "showBlocks", "codeView"],
              ["preview"],
              ["undo", "redo"],
            ],
          }}
        />
        <div className="space-x-4 py-10">
          <Button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Add News
          </Button>
          <Link
            className={buttonVariants({ variant: "outline" })}
            href={"/admin/news"}
          >
            Go Back
          </Link>
        </div>
      </form>
    </div>
  );
};
export default AddNews;
