import { TODO } from "@/types/todo";
import React from "react";

function TodoItem(props: { todo: TODO }) {
  const { todo } = props;
  return (
    <li className={`${todo.completed ? "line-through" : ""}`}>
      {todo.id} - {todo.name}
    </li>
  );
}

export default TodoItem;
