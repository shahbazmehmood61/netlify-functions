// deleteTask.js
const fs = require('fs').promises;
const path = require('path');

exports.handler = async (event, context) => {
  try {
    // Parse request body
    const { taskId } = JSON.parse(event.body);

    // Read todos from file
    const todosPath = path.join(__dirname, 'data', 'todos.json');
    const todosData = await fs.readFile(todosPath, 'utf-8');
    const todos = JSON.parse(todosData);

    // Delete task
    const updatedTodos = todos.filter(task => task.id !== taskId);

    // Write updated todos to file
    await fs.writeFile(todosPath, JSON.stringify(updatedTodos, null, 2));

    return {
      statusCode: 200,
      body: JSON.stringify({ id: taskId }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};
