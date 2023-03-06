import React, { useState, useCallback } from "react";
import { AiOutlineArrowDown } from "react-icons/ai";
import { ITodo } from "../../interface/todoList";
import SortableList from "../../lib/SortableList/SortableList";
import useTodoLater from "../../store/laterStore";
import useTodo from "../../store/todoStore";
import "./TodoBox.css";
import TodoItem from "./TodoItem";
import { BiMessageSquareAdd } from "react-icons/bi";
function TodoBox() {
  const [addContent, setAddContent] = useState<string>("");

  const { todoList, addTodoList, deleteAllTodo, changeList } = useTodo();
  const { addAllLaterTodoList } = useTodoLater();

  const onClickAddBtn = useCallback(() => {
    if (addContent.length <= 0) {
      return;
    }
    const todo = {
      content: addContent,
      isToday: true,
    };
    addTodoList(todo);
    setAddContent("");
  }, [addContent, addTodoList]);

  const onClickMoveAllLater = useCallback(() => {
    deleteAllTodo();
    addAllLaterTodoList(todoList);
  }, [addAllLaterTodoList, deleteAllTodo, todoList]);

  const onDropItem = useCallback(
    (newTodoList: ITodo[]) => {
      changeList(newTodoList);
    },
    [changeList]
  );

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
          Today
        </strong>
        <span className="lzTodayHeader__btn" onClick={onClickMoveAllLater}>
          <AiOutlineArrowDown />
        </span>
      </div>
      <div className="lzTodoBody">
        <SortableList
          data={todoList}
          onDropItem={onDropItem}
          renderItem={(item: ITodo, index: any) => (
            <TodoItem
              value={item.content}
              idx={index}
              key={item.content + index}
            />
          )}
        />
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

export default TodoBox;
