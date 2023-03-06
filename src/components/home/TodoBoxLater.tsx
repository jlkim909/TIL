import React, { useState, useCallback } from "react";
import useTodoLater from "../../store/laterStore";
import "./TodoBox.css";
import TodoLaterItem from "./TodoLaterItem";
import { BiMessageSquareAdd } from "react-icons/bi";

function TodoBoxLater() {
  const [addContent, setAddContent] = useState<string>("");

  const { laterList, addLaterTodoList } = useTodoLater();
  const onClickAddBtn = useCallback(() => {
    if (addContent.length <= 0) {
      return;
    }
    const todo = {
      content: addContent,
      isToday: true,
    };
    addLaterTodoList(todo);
    setAddContent("");
  }, [addContent, addLaterTodoList]);

  const onKeyEnter = useCallback(
    (e: any) => {
      if (e.key === "Enter") {
        onClickAddBtn();
      }
    },
    [onClickAddBtn]
  );

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div className="lzTodayHeader">
        <strong className="lzNeonWhite" style={{ cursor: "default" }}>
          Later
        </strong>
      </div>
      <div className="lzTodoBody">
        <ul className="lzTodoBody__list">
          {laterList.map((todo, idx) => (
            <TodoLaterItem
              value={todo.content}
              idx={idx}
              key={todo.content + idx}
            />
          ))}
        </ul>
        <div className="lzTodoAdd">
          <input
            className="lzTodoAdd__input"
            value={addContent}
            onChange={(e) => setAddContent(e.target.value)}
            onKeyUp={onKeyEnter}
          />
          <button className="lzTodoAdd__btn" onClick={onClickAddBtn}>
            <BiMessageSquareAdd />
          </button>
        </div>
      </div>
    </div>
  );
}

export default TodoBoxLater;
