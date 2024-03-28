const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

const students = [];

app.use((req, res, next) => {
  console.log(`Request ${req.method} on path ${req.url} ${new Date()}`);
  next();
}); 

app.get('/home', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>HOME</title>
      </head>
      <body>
        <p>Nazwa tej podstrony duzymi literami: HOME</p>
      </body>
    </html>
  `);
});

app.get('/student', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>STUDENT</title>
      </head>
      <body>
        <p>Nazwa tej podstrony duzymi literami: STUDENT</p>
      </body>
    </html>
  `);
});

app.get('/add-student', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>ADD-STUDENT</title>
      </head>
      <body>
        <form action="/student" method="POST">
          <label for="firstName">Imię:</label><br>
          <input type="text" id="firstName" name="firstName"><br>
          <label for="lastName">Nazwisko:</label><br>
          <input type="text" id="lastName" name="lastName"><br>
          <label for="major">Kierunek:</label><br>
          <input type="text" id="major" name="major"><br>
          <button type="submit">Dodaj studenta</button>
        </form>
      </body>
    </html>
  `);
});

app.post('/student', (req, res) => {
  const { firstName, lastName, major } = req.body;
  const fullName = `${firstName} ${lastName}`;
  students.push({ fullName, major });
  res.send(`
    <html>
      <head>
        <title>STUDENT</title>
      </head>
      <body>
        <p>Hello, ${fullName} on ${major} studies!</p>
      </body>
    </html>
  `);
});

app.get('/users', (req, res) => {
  let userList = '';
  for (const student of students) {
    userList += `<p>${student.fullName} - ${student.major}</p>`;
  }
  res.send(`
    <html>
      <head>
        <title>USERS</title>
      </head>
      <body>
        ${userList}
      </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`Serwer uruchomiony na porcie ${PORT}`);
});