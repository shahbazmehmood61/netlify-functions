"use client";
import { TODO } from "@/types/todo";
import React, { useEffect, useState } from "react";
import Todos from "./Todos";

function Index() {
  const [name, setName] = useState<string>("");
  const [todos, setTodos] = useState<TODO[]>([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  function fetchTodos() {
    fetch("/.netlify/functions/getTodos")
      .then((response) => response.json())
      .then((data) => {
        if (data && !data.error) {
          setTodos(data.todos);
        }
      })
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

  function completeTodo(id: number) {
    fetch("/.netlify/functions/completeTodo", {
      method: "POST",
      body: JSON.stringify({ taskId: id }),
    })
      .then((response) => response.json())
      .then(() => {
        setTodos((prevTodos) =>
          prevTodos.map((todo) => (todo.id === id ? { ...todo, completed: true } : todo))
        );
      })
      .catch((error) => console.error("Error creating todo:", error));
  }

  const props = { createTodo, name, setName, completeTodo, todos };

  return <Todos {...props} />;
}

export default Index;
