import React, { FC, useState } from "react";
import { LuChevronsLeft, LuEye, LuFileUp, LuUpload } from "react-icons/lu";
import "suneditor/dist/css/suneditor.min.css";
import SunEditor from "suneditor-react";
import addChapter from "@/firebase/Create/addChapter";
import { useRouter } from "next/navigation";
import { VolumeProps } from "@/firebase/Read/getVolumes";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

interface pageProps {
  novelId: string;
  vol: VolumeProps;
  setPageNovel: () => void;
}

const AddChapter: FC<pageProps> = ({ novelId, vol, setPageNovel }) => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [schedule, setSchedule] = useState(false);
  const [scheduleAt, setScheduleAt] = useState<string>("");

  const handleEditorChange = (content: string) => {
    setContent(content);
  };

  function handleChapterAddition() {
    // console.log("toc", vol.tabeleOfContents);
    addChapter({
      novelId: novelId,
      title: title,
      content: content,
      volume: vol,
      scheduleAt: scheduleAt,
    }).finally(() => {
      setPageNovel();
    });
  }

  return (
    <div>
      <div className="flex justify-between items-center mx-auto p-10 lg:w-[1300px]">
        <p
          onClick={setPageNovel}
          className="inline-block bg-blue-400 px-3 py-1 rounded text-white"
        >
          <LuChevronsLeft size={22} />
        </p>
        <div className="text-black-500">
          <button onClick={handleChapterAddition}>
            <LuUpload size={22} className="mx-5" />
          </button>
        </div>
      </div>

      <div className="space-y-5 mx-auto max-w-[900px]">
        <Input
          placeholder="Title of an Chapter"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mb-5 px-5 py-2 border rounded outline-blue-100 w-full text-2xl"
        />
        <SunEditor
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
                setSchedule(typeof check === "boolean" ? check : false)
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
    </div>
  );
};

export default AddChapter;
