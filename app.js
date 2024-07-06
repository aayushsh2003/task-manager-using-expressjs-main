const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

let tasks = [
  { id: 1, title: 'Do your homework' },
  { id: 2, title: 'Go shopping' },
];

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/tasks', (req, res) => {
  const { title } = req.body;
  const newTask = { id: tasks.length + 1, title };
  tasks.push(newTask);
  res.redirect('/');
});

app.put('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title } = req.body;
  console.log(title);
  const taskId = tasks.findIndex((task) => task.id === id);
  console.log('I am called');
  if (taskId !== -1) {
    tasks[taskId].title = title;
    res.json(tasks[taskId]);
    console.log(tasks[taskId]);
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
});

app.delete('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  tasks = tasks.filter((task) => task.id !== id);
  res.sendStatus(204);
});

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
