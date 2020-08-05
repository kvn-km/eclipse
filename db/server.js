const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const port = 8001
const db = require('./index')
const cookieSession = require('cookie-session')

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.use(cookieSession({
  name: 'session',
  keys: ['key1']
}));

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});

app.get('/', (request, response) => {
  response.json({Message: "Hello World"})
})

app.get('/api/users', db.getUsers);

app.post('/api/users', db.addUser);

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})