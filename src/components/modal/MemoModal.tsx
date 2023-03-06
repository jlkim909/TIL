import React, { useState, useEffect, useMemo, useCallback } from "react";
import { debounce } from "underscore";
import Draggable from "../../lib/Draggable/Draggable";
import "./MemoModal.css";

interface IMemoModal {
  onClose: () => void;
}
function MemoModal({ onClose }: IMemoModal) {
  const [memoData, setMemoData] = useState<string>("");
  const onChangeMemo = useMemo(
    () =>
      debounce(
        (e: any) =>
          localStorage.setItem("memoData", JSON.stringify(e.target.value)),
        500
      ),
    []
  );

  const onChangePosition = useCallback((x: number, y: number) => {
    localStorage.setItem("memoPosition", JSON.stringify({ x: x, y: y }));
  }, []);

  useEffect(() => {
    const localMemoData = localStorage.getItem("memoData");
    setMemoData(localMemoData ? JSON.parse(localMemoData) : "");
  }, []);

  return (
    <Draggable
      containerClass="lzMemo"
      headerClass="lzMemo__header"
      onClickClose={onClose}
      onMove={onChangePosition}
    >
      <textarea
        className="lzMemo__input"
        spellCheck="false"
        defaultValue={memoData}
        onChange={onChangeMemo}
      />
    </Draggable>
  );
}

export default MemoModal;
