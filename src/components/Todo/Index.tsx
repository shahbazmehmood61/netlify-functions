"use client";
import { TODO } from "@/types/todo";
import React, { useEffect, useState } from "react";
import TodoList from "./TodoList";

function Index() {
  const [name, setName] = useState<string>("");
  const [todos, setTodos] = useState<TODO[]>([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  function fetchTodos() {
    fetch("/.netlify/functions/getTodos")
      .then((response) => response.json())
      .then((data) => setTodos(data))
      .catch((error) => console.error("Error fetching todos:", error));
  }

  function createTodo(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    fetch("/.netlify/functions/createTodo", {
      method: "POST",
      body: JSON.stringify({ taskName: name }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Update todos state with the newly created todo
        setTodos((prevTodos) => [...prevTodos, data]);
        // Clear the input field
        setName("");
      })
      .catch((error) => console.error("Error creating todo:", error));
  }

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
      <TodoList todos={todos} />
    </div>
  );
}

export default Index;
