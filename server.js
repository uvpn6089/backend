const express = require('express');
const path = require('path');
const app = express();

// Use dynamic port provided by hosting service like Render, or 3000 locally
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let tasks = [
  { id: 1, title: 'Build Full Stack App' },
  { id: 2, title: 'Deploy on Render' }
];

app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/api/tasks', (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: 'Title required' });
  
  const newTask = { id: tasks.length + 1, title };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});