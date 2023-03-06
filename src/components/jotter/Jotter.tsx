import React, { useState, useCallback, useEffect, useMemo } from "react";
import ReactQuill from "react-quill";
import "../category/quill.custom.css";
import "../category/Board.css";
import CopyToClipboard from "react-copy-to-clipboard";
import { debounce } from "underscore";

function Jotter() {
  const [content, setContent] = useState<string>("");

  const onClickPrintEdit = useCallback(() => {
    alert("클립보드에 복사되었습니다.");
  }, []);

  const onChangeContent = useMemo(
    () =>
      debounce((e: any) => {
        setContent(e);
        localStorage.setItem("jotter", JSON.stringify(e));
      }, 1000),
    []
  );

  useEffect(() => {
    const localMemoData = localStorage.getItem("jotter");
    setContent(localMemoData ? JSON.parse(localMemoData) : "");
  }, []);

  return (
    <div className="lzBox">
      <div className="lzStudyBox">
        <div>
          <CopyToClipboard text={content}>
            <button onClick={onClickPrintEdit}>출력</button>
          </CopyToClipboard>
        </div>
        <ReactQuill
          value={content}
          onChange={onChangeContent}
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
      </div>
    </div>
  );
}

export default Jotter;
