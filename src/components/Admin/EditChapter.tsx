import React, { FC, useEffect, useState } from "react";
import {
  LuChevronsLeft,
  LuEye,
  LuFileUp,
  LuTrash2,
  LuUpload,
} from "react-icons/lu";
import "suneditor/dist/css/suneditor.min.css";
import SunEditor from "suneditor-react";
import addChapter from "@/firebase/Create/addChapter";
import { useRouter } from "next/navigation";
import { VolumeProps, tabeleOfContents } from "@/firebase/Read/getVolumes";
import { Input } from "../ui/input";
import editChapter from "@/firebase/Update/editChapter";
import useChapter, { chapterProps } from "@/firebase/Read/getChapter";
import BasicSkeleton from "../Skleaton";
import { Button } from "../ui/button";
import deleteChapter from "@/firebase/Delete/deleteChapter";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

interface pageProps {
  novelId: string;
  setPageNovel: () => void;
  pageState: {
    chapterId: string | null;
    volume: VolumeProps | null;
    state: "novel" | "add" | "edit";
  };
}

const EditChapter: FC<pageProps> = ({ novelId, setPageNovel, pageState }) => {
  const chapter = useChapter(
    novelId,
    pageState.volume ? pageState.volume.id : "",
    pageState.chapterId ? pageState.chapterId : ""
  );

  const [content, setContent] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  const [schedule, setSchedule] = useState(false);
  const [scheduleAt, setScheduleAt] = useState<string>("");

  const handleEditorChange = (content: string) => {
    setContent(content);
  };

  useEffect(() => {
    if (chapter !== null) {
      setTitle(chapter.title);
      setContent(chapter.content);
      setSchedule(
        chapter?.scheduleAt
          ? new Date(chapter.scheduleAt)
            ? true
            : false
          : false
      );
      setScheduleAt(chapter?.scheduleAt || "");
    }
  }, [chapter]);

  function handleChapterAddition() {
    if (chapter !== null && pageState.volume !== null) {
      let tableContents: tabeleOfContents[] = pageState.volume.tabeleOfContents;
      tableContents = tableContents.map((item) =>
        item.id === pageState.chapterId
          ? { title: title, id: pageState.chapterId, scheduleAt }
          : item
      );
      editChapter({
        chapter: chapter,
        novelId: novelId,
        chapterTitle: title,
        chapterContent: content,
        volume: pageState.volume,
        scheduleAt,
        tableContents: tableContents,
      }).finally(() => {
        setPageNovel();
        window.location.reload();
      });
    }
  }

  function handleChapterDeletion() {
    if (chapter !== null && pageState.volume !== null) {
      let tableContents: tabeleOfContents[] =
        pageState.volume.tabeleOfContents.filter(
          (item) => item.id !== pageState.chapterId
        );

      const a = prompt(
        "Enter the name of the chapter to delete (i.e) " + chapter.title
      );

      if (a === chapter.title) {
        deleteChapter({
          chapterId: chapter.id,
          volume: pageState.volume,
          novelId: novelId,
          tableContents: tableContents,
        }).finally(() => {
          setPageNovel();
          window.location.reload();
        });
      } else {
        alert("Chapter Name didn't Match");
      }
    }
  }

  return (
    <div className="mb-10">
      <div className="flex justify-between items-center mx-auto p-10 lg:w-[1300px]">
        <p
          onClick={setPageNovel}
          className="inline-block bg-blue-400 px-3 py-1 rounded text-white"
        >
          <LuChevronsLeft size={22} />
        </p>
        <div className="space-x-4 text-black-500">
          <Button
            className="bg-red-700 text-white hover:text-black"
            onClick={handleChapterDeletion}
          >
            <LuTrash2 size={22} className="mx-5" />
          </Button>
          <Button
            className="bg-green-700 text-white hover:text-black"
            onClick={handleChapterAddition}
          >
            <LuUpload size={22} className="mx-5" />
          </Button>
        </div>
      </div>

      {chapter !== null ? (
        <div className="mx-auto max-w-[900px]">
          <Input
            placeholder="Title of an Chapter"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mb-5 px-5 py-2 border rounded outline-blue-100 w-full text-2xl"
          />
          <SunEditor
            setContents={content}
            onChange={handleEditorChange}
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

          <div className="space-y-3 bg-card p-4 rounded-md">
            <div className="flex items-center gap-3">
              <Checkbox
                id="schedule"
                className="border-primary"
                checked={schedule}
                onCheckedChange={(check) =>
                  setSchedule(() => {
                    if (typeof check === "boolean") {
                      if (!check) setScheduleAt("");
                      return check;
                    }
                    setScheduleAt("");
                    return false;
                  })
                }
              />
              <Label htmlFor="schedule" className="font-medium">
                Schedule Post?
              </Label>
            </div>
            {schedule && (
              <Input
                type="datetime-local"
                value={scheduleAt}
                onChange={(e) => setScheduleAt(e.target.value)}
              />
            )}
          </div>
        </div>
      ) : (
        <BasicSkeleton />
      )}
    </div>
  );
};

export default EditChapter;
