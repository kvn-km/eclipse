const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 8001;
const db = require('./index');
const cookieSession = require('cookie-session');
const cors = require('cors');

app.use(cors({ exposedHeaders: ["set-cookie"], credentials: true, origin: 'http://localhost:8000' }));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}));

app.get('/', (request, response) => {
  response.json({ Message: "Hello World" });
});

// GET USER FOR LOGIN
app.get('/api/user', db.getUser);
// GET USER FOR USER LANDING PAGES, ONCE LOGGED IN
app.get('/api/user/current', db.getCurrentUser);
// GET ALL USERS
app.get('/api/users', db.getUsers);
app.get('/api/tasks', db.getTasks);
app.get('/api/achievs', db.getAchievs);
app.get('/api/levels', db.getLevels);

app.post('/api/users', db.addUser);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});;

//withCredentials = true;