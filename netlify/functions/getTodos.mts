// functions/getTodos.js

const fs = require("fs").promises;
const path = require("path");

exports.handler = async (event, context) => {
  try {
    // Read todos from file
    const todosPath = path.join(__dirname, "data", "todos.json");
    const todosData = await fs.readFile(todosPath, "utf-8");
    const todos = JSON.parse(todosData);

    return {
      statusCode: 200,
      body: JSON.stringify(todos),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};
