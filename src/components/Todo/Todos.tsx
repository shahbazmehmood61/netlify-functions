import React from "react";
import TodoList from "./TodoList";
import { TODO } from "@/types/todo";

function Todos(props: IProps) {
  const { createTodo, name, setName, completeTodo, todos } = props;
  return (
    <div>
      <form onSubmit={createTodo}>
        <input
          className="border border-black mr-3 py-1 px-3 rounded-md"
          type="text"
          value={name}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value)}
        />
        <button type="submit" className=" bg-gray-400 py-1 px-3 rounded-md">
          Create
        </button>
      </form>
      <TodoList todos={todos} completeTodo={completeTodo} />
    </div>
  );
}

export default Todos;

interface IProps {
  createTodo: (event: React.FormEvent<HTMLFormElement>) => void;
  todos: TODO[];
  completeTodo: (id: number) => void;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
}
