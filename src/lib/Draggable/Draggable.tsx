import React, { useState, useMemo, useCallback, useEffect } from "react";
import { debounce } from "underscore";
import { MdDragHandle } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";

interface IDraggable {
  children: any;
  containerClass?: string | undefined;
  headerClass?: string | undefined;
  onClickClose?: () => void;
  onMove: (x: number, y: number) => void;
}
function Draggable({
  children,
  containerClass,
  headerClass,
  onClickClose,
  onMove,
}: IDraggable) {
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: -500,
    y: -500,
  });
  const [clickPosition, setClickPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const Move = useMemo(
    () => debounce((x: number, y: number) => onMove(x, y), 500),
    [onMove]
  );
  const onMouseMove = useCallback(
    (e: any) => {
      setPosition({
        x: e.clientX - clickPosition.x,
        y: e.clientY - clickPosition.y,
      });
      Move(e.clientX - clickPosition.x, e.clientY - clickPosition.y);
    },
    [setPosition, clickPosition, Move]
  );

  const removeMouse = useCallback(() => {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", removeMouse);
    document.removeEventListener("mouseleave", removeMouse);
  }, [onMouseMove]);
  const onMouseDownMemoHandle = useCallback(
    (e: any) => {
      const { left, top } = e.target.getBoundingClientRect();
      setClickPosition({ x: e.clientX - left, y: e.clientY - top });
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", removeMouse);
      document.body.addEventListener("mouseleave", removeMouse);
    },
    [onMouseMove, removeMouse]
  );

  useEffect(() => {
    const localMemoPosition = localStorage.getItem("memoPosition");
    setPosition(
      localMemoPosition ? JSON.parse(localMemoPosition) : { x: 0, y: 0 }
    );
  }, []);

  return (
    <div
      className={containerClass}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        position: "absolute",
        zIndex: 10,
      }}
    >
      <div className={headerClass}>
        <span onMouseDown={onMouseDownMemoHandle}>
          <MdDragHandle />
        </span>
        <span onClick={onClickClose}>
          <AiOutlineClose />
        </span>
      </div>
      {children}
    </div>
  );
}

export default Draggable;
