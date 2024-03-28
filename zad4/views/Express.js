const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

app.use((req, res, next) => {
  console.log(`Request ${req.method} on path ${req.url} ${new Date()}`);
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));

const viewsPath = path.join(__dirname, 'views');

app.get('/home', (req, res) => {
  res.sendFile(path.join(viewsPath, 'home.html'));
});

app.get('/student', (req, res) => {
  res.sendFile(path.join(viewsPath, 'student.html'));
});

app.get('/add-student', (req, res) => {
  res.sendFile(path.join(viewsPath, 'add-student.html'));
});

app.get('/users', (req, res) => {
  res.sendFile(path.join(viewsPath, 'users.html'));
});

app.listen(PORT, () => {
  console.log(`Serwer uruchomiony na porcie ${PORT}`);
});