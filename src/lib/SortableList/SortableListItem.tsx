import React from "react";
import "./SortableList.css";

interface ISortableListItem {
  index?: number;
  draggable?: any;
  children?: JSX.Element;
  onDragStart?: any;
  onDropItem?: any;
  onClickItem?: any;
}
function SortableListItem({
  index,
  draggable,
  children,
  onDragStart,
  onDropItem,
  onClickItem,
}: ISortableListItem) {
  const onDragStartItem = (e: any) => {
    e.target.classList.add("dragstart");
    onDragStart(index);
  };

  const onDragEnd = (e: any) => e.target.classList.remove("dragstart");
  const onDragOver = (e: any) => e.preventDefault();
  const onDragEnter = (e: any) => {
    e.currentTarget.classList.add("dragover");
  };
  const onDragLeave = (e: any) => e.target.classList.remove("dragover");
  const onDrop = (e: any) => {
    e.target.classList.remove("dragover");
    onDropItem(index);
  };

  return (
    <li
      className="item"
      draggable={draggable ? draggable : false}
      onDragStart={onDragStartItem}
      onDragEnd={onDragEnd}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      {children}
    </li>
  );
}

export default SortableListItem;
