import React from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

const RichTextEditor = ({
  onChange,
  value,
}: {
  onChange: (e: string) => void;
  value: string;
}) => {
  return (
    <SunEditor
      onChange={onChange}
      placeholder="Content of Blog"
      setContents={value}
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
          ["bold", "underline", "italic", "strike", "subscript", "superscript"],
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
  );
};

export default RichTextEditor;
