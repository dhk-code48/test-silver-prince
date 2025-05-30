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
import React, { FC, useEffect, useState, use } from "react";
import { useForm } from "react-hook-form";
import SunEditor from "suneditor-react";
import useNewsData from "@/firebase/Read/getNewsData";
import BasicSkeleton from "@/components/Skleaton";
import editNews from "@/firebase/Update/editNews";
import deleteNews from "@/firebase/Delete/deleteNews";

interface pageProps {
  params: Promise<{
    newsId: string;
  }>;
}

const EditNews: FC<pageProps> = (props) => {
  const params = use(props.params);
  const route = useRouter();
  const news = useNewsData(params.newsId);

  const [content, setContent] = useState("");
  const [title, seTtitle] = useState("");
  const [description, setDescription] = useState("");

  const handleEditorChange = (content: string) => {
    setContent(content);
  };

  function handleSubmit() {
    if (news !== null) {
      editNews({
        newsId: params.newsId,
        publishedOn: news.publishedOn,
        title: title,
        description: description,
        content: content,
      })
        .then(() => {
          toast({
            title: "Editing Please Wait a second !!",
            description: "Your New news is being edited",
            variant: "default",
          });
        })
        .finally(() => {
          toast({
            title: "Edited Successfully !!",
            description: "Your New news has been edited successfully",
            variant: "default",
          });
          route.push("/admin/news");
        })
        .catch((e) => {
          toast({
            title: "Error while editing",
            description: e.message,
            variant: "destructive",
          });
        });
    }
  }

  function handleNewsDeletion() {
    deleteNews(params.newsId)
      .then(() => {
        route.push("/admin/news");
      })
      .finally(() => {
        window.location.reload;
      });
  }

  useEffect(() => {
    if (news !== null) {
      setContent(news.content);
      setDescription(news.description);
      seTtitle(news.title);
    }
  }, [news]);

  return (
    <>
      <div className="bg-white dark:bg-paper mx-auto p-10 rounded-lg lg:w-[900px] min-h-[calc(100vh-80px)]">
        {news !== null ? (
          <>
            <Input
              value={title}
              onChange={(e) => seTtitle(e.target.value)}
              placeholder="Title Goes Here ..."
              className="font-bold text-3xl"
            />
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description Goes Here ..."
              className="my-5 text-muted-foreground"
            />
            <SunEditor
              setContents={content}
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
            <div className="flex justify-between items-center py-10">
              <div className="space-x-4">
                <Button
                  onClick={handleSubmit}
                  className="bg-yellow-600 hover:bg-yellow-700"
                >
                  Edit News
                </Button>
                <Link
                  className={buttonVariants({ variant: "outline" })}
                  href={"/admin/news"}
                >
                  Go Back
                </Link>
              </div>
              <Button
                onClick={handleNewsDeletion}
                className="bg-red-600 hover:bg-red-700 w-auto text-white"
              >
                Delete News
              </Button>
            </div>
          </>
        ) : (
          <BasicSkeleton />
        )}
      </div>
    </>
  );
};
export default EditNews;
