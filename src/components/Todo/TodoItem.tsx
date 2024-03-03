import { TODO } from "@/types/todo";
import React from "react";

function TodoItem(props: { todo: TODO; completeTodo: (id: number) => void }) {
  const { todo, completeTodo } = props;
  return (
    <li className={`${todo.completed ? "line-through" : ""}`}>
      {todo.id} - {todo.name}{" "}
      <button className="ml-5" onClick={() => completeTodo(todo.id)}>
        Complete
      </button>
    </li>
  );
}

export default TodoItem;
