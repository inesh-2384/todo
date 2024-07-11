const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3007; // Choose any port you prefer

// Middleware to parse JSON bodies
app.use(bodyParser.json());

let todoList = []; // In-memory storage for simplicity; you might use a database in a real application

// Endpoint to get all TODO items
app.get('/todos', (req, res) => {
  res.json(todoList);
});

// Endpoint to add a new TODO item
app.post('/todos', (req, res) => {
  const { todo } = req.body;
  todoList.push(todo);
  res.status(201).send('TODO item added');
});


// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
