import React, { useState, useCallback } from "react";
import {
  AiFillEdit,
  AiFillCaretUp,
  AiFillDelete,
  AiOutlineEdit,
} from "react-icons/ai";
import useTodoLater from "../../store/laterStore";
import useTodo from "../../store/todoStore";

interface ITodoItem {
  value: string;
  idx: number;
}
function TodoLaterItem({ value, idx }: ITodoItem) {
  const [mode, setMode] = useState<"view" | "edit">("view");
  const [context, setContext] = useState<string>(value);
  const { addTodoList } = useTodo();
  const { editLaterTodo, setSelectedIndex, deleteLaterTodo } = useTodoLater();

  const onClickEdit = useCallback(() => {
    setSelectedIndex(idx);
    setMode("edit");
  }, [idx, setSelectedIndex]);

  const onClickEditDone = useCallback(() => {
    editLaterTodo(idx, { content: context });
    setMode("view");
  }, [editLaterTodo, context, idx]);

  const onClickDelete = useCallback(() => {
    deleteLaterTodo(idx);
  }, [deleteLaterTodo, idx]);

  const onClickChangeDay = useCallback(() => {
    deleteLaterTodo(idx);
    addTodoList({ content: value });
  }, [addTodoList, deleteLaterTodo, idx, value]);

  return (
    <li className="lzTodoItem lzTodoItem--later">
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
            <AiFillCaretUp />
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
    </li>
  );
}

export default TodoLaterItem;
