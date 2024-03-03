// completeTask.js
const fs = require("fs").promises;
const path = require("path");

module.exports.handler = async (event, context) => {
  try {
    // Parse request body
    const { taskId } = JSON.parse(event.body);

    // Read todos from file
    const todosPath = path.join(__dirname, "../..", "public", "data", "todos.json");
    const todosData = await fs.readFile(todosPath, "utf-8");
    const { todos } = JSON.parse(todosData);

    // Mark task as complete
    const updatedTodos = todos.map((task) =>
      task.id === taskId ? { ...task, completed: true } : task
    );

    // Write updated todos to file
    await fs.writeFile(todosPath, JSON.stringify({ todos: updatedTodos }, null, 2));

    return {
      statusCode: 200,
      body: JSON.stringify({ id: taskId }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};
