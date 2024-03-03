import { TODO } from "@/types/todo";
import React from "react";
import TodoItem from "./TodoItem";

function TodoList(props: { todos: TODO[]; completeTodo: (id: number) => void }) {
  const { todos, completeTodo } = props;

  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} completeTodo={completeTodo} />
      ))}
    </ul>
  );
}

export default TodoList;
