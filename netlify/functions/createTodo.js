// createTask.js
const fs = require("fs").promises;
const path = require("path");

module.exports.handler = async (event, context) => {
  try {
    // Parse request body
    const { taskName } = JSON.parse(event.body);

    // Read todos from file
    const todosPath = path.join(__dirname, "../..", "public", "data", "todos.json");
    const todosData = await fs.readFile(todosPath, "utf-8");
    const { todos } = JSON.parse(todosData);
    console.log(todos);
    // Create new task
    const newTask = { id: Date.now(), name: taskName, completed: false };
    todos.push(newTask);

    // Write updated todos to file
    await fs.writeFile(todosPath, JSON.stringify({ todos }, null, 2));

    return {
      statusCode: 200,
      body: JSON.stringify(newTask),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};
