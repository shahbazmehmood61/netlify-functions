// functions/getTodos.js

const fs = require("fs").promises;
const path = require("path");

module.exports.handler = async (event, context) => {
  try {
    // Read todos from file
    const todosPath = path.join(__dirname, "../..", "public", "data", "todos.json");
    console.log(todosPath, "todosPath");
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
