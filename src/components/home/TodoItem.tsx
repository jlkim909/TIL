import React, { useState, useCallback } from "react";
import {
  AiFillEdit,
  AiFillCaretDown,
  AiFillDelete,
  AiOutlineEdit,
} from "react-icons/ai";
import useTodoLater from "../../store/laterStore";
import useTodo from "../../store/todoStore";

interface ITodoItem {
  value: string;
  idx: number;
}
function TodoItem({ value, idx }: ITodoItem) {
  const [mode, setMode] = useState<"view" | "edit">("view");
  const [context, setContext] = useState<string>(value);

  const { editTodo, setSelectedIndex, deleteTodo } = useTodo();
  const { addLaterTodoList } = useTodoLater();

  const onClickEdit = useCallback(() => {
    setSelectedIndex(idx);
    console.log(idx);
    setMode("edit");
  }, [idx, setSelectedIndex]);

  const onClickEditDone = useCallback(() => {
    editTodo(idx, { content: context });
    setMode("view");
  }, [editTodo, context, idx]);

  const onClickDelete = useCallback(() => {
    deleteTodo(idx);
  }, [deleteTodo, idx]);

  const onClickChangeDay = useCallback(() => {
    deleteTodo(idx);
    addLaterTodoList({ content: value });
  }, [addLaterTodoList, deleteTodo, idx, value]);

  return (
    <div className="lzTodoItem">
      <input
        className="lzTodoItem__input"
        value={context}
        onChange={(e) => setContext(e.target.value)}
        readOnly={mode === "view"}
        style={{ color: mode === "edit" ? "var(--lemonSorbet)" : "white" }}
      />
      {mode === "view" && (
        <div className="lzTodoItem__buttonList">
          <button
            className="lzTodoItem__btn lzTodoItem__btn--edit"
            onClick={onClickEdit}
          >
            <AiFillEdit />
          </button>
          <button
            className="lzTodoItem__btn lzTodoItem__btn--down"
            onClick={onClickChangeDay}
          >
            <AiFillCaretDown />
          </button>
          <button
            className="lzTodoItem__btn lzTodoItem__btn--delete"
            onClick={onClickDelete}
          >
            <AiFillDelete />
          </button>
        </div>
      )}
      {mode === "edit" && (
        <button
          className="lzTodoItem__btn lzTodoItem__btn--edit"
          onClick={onClickEditDone}
        >
          <AiOutlineEdit />
        </button>
      )}
    </div>
  );
}

export default TodoItem;
