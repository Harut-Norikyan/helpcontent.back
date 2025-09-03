const fs = require('fs');
const path = require('path');

const todosFile = path.join(__dirname, '../data', 'todos.json');

// Get all todos
exports.getTodos = (req, res) => {
  fs.readFile(todosFile, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading todos file');
    }

    const todosArray = JSON.parse(data);
    res.type('application/json');
    res.json(todosArray);
  });
};

// Get a single todo by ID
exports.getTodoById = (req, res) => {
  const id = parseInt(req.params.id);

  fs.readFile(todosFile, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading todos file');
    }

    const todosArray = JSON.parse(data);
    const todo = todosArray.find(t => t.id === id);

    if (!todo) {
      return res.status(404).send('Todo not found');
    }

    res.type('application/json');
    res.json(todo);
  });
};
