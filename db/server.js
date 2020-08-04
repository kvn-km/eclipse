const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const port = 8001
const db = require('./index')

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/users', db.getUsers);

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})