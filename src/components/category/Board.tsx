import React, { useState, useCallback } from "react";
import ReactQuill from "react-quill";
import "./quill.custom.css";
import "./Board.css";
import CopyToClipboard from "react-copy-to-clipboard";

interface IBoard {
  data: string;
}
function Board({ data }: IBoard) {
  const [content, setContent] = useState<string>("");
  const [mode, setMode] = useState<"edit" | "post">("post");

  const onClickPostEdit = useCallback(() => {
    setContent(data);
    setMode("edit");
  }, [data]);

  const onClickPrintEdit = useCallback(() => {
    alert("클립보드에 복사되었습니다.");
  }, []);

  return (
    <div className="lzBox">
      <div className="lzStudyBox">
        {mode === "post" ? (
          <button onClick={onClickPostEdit}>edit</button>
        ) : (
          <div>
            <CopyToClipboard text={content}>
              <button onClick={onClickPrintEdit}>출력</button>
            </CopyToClipboard>
            <button onClick={() => setMode("post")}>취소</button>
          </div>
        )}
        {mode === "post" ? (
          <div
            className="lzDataBox"
            dangerouslySetInnerHTML={{
              __html: data,
            }}
          ></div>
        ) : (
          <ReactQuill
            value={content}
            onChange={setContent}
            modules={{
              toolbar: [
                ["image"],
                ["bold", "italic", "underline", "strike"], // toggled buttons
                ["blockquote", "code-block"],

                [{ header: 1 }, { header: 2 }], // custom button values
                [{ list: "ordered" }, { list: "bullet" }],
                [{ script: "sub" }, { script: "super" }], // superscript/subscript
                [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
                [{ direction: "rtl" }], // text direction

                [{ size: ["small", false, "large", "huge"] }], // custom dropdown
                [{ header: [1, 2, 3, 4, 5, 6, false] }],

                [{ color: [] }, { background: [] }], // dropdown with defaults from theme
                [{ font: [] }],
                [{ align: [] }],

                ["clean"], // remove formatting button
              ],
            }}
          />
        )}
      </div>
    </div>
  );
}

export default Board;
