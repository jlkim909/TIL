import React, { useCallback, useState, useEffect } from "react";
import SortableListItem from "./SortableListItem";
import "./SortableList.css";
import "../../components/home/TodoBox.css";

interface ISortableList {
  data: any;
  onDropItem?: any;
  onClickItem?: any;
  renderItem: any;
}
function SortableList({
  data,
  onDropItem,
  onClickItem,
  renderItem,
}: ISortableList) {
  const [startIndex, setStartInder] = useState<number>(0);
  const [listData, setListData] = useState<any>(data);

  useEffect(() => {
    setListData(data);
  }, [data]);
  const onDragStart = (index: number) => setStartInder(index);

  const onDrop = useCallback(
    (dropIndex: number) => {
      const dragItem = listData[startIndex];
      let list = [...listData];
      list.splice(startIndex, 1);
      const newListData =
        startIndex < dropIndex
          ? [
              ...list.slice(0, dropIndex),
              dragItem,
              ...list.slice(dropIndex, list.length),
            ]
          : [
              ...list.slice(0, dropIndex),
              dragItem,
              ...list.slice(dropIndex, list.length),
            ];
      setListData(newListData);
      onDropItem(newListData);
    },
    [startIndex, onDropItem, listData]
  );

  return (
    <ul className="lzTodoBody__list">
      {listData.map((item: any, index: any) => (
        <SortableListItem
          key={index + item.content}
          index={index}
          draggable={true}
          onDragStart={onDragStart}
          onDropItem={onDrop}
          onClickItem={onClickItem}
        >
          {renderItem(item, index)}
        </SortableListItem>
      ))}
      <SortableListItem
        key={listData.length}
        index={listData.length}
        draggable={false}
        onDropItem={onDrop}
      />
    </ul>
  );
}

export default SortableList;
