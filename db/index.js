const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'eclipse',
  port: 5432
});

//ISSUE: IF USERS PASSWORD OF ANOTHER USER, THEY CAN STILL GET IN
const getUser = (request, response) => {
  console.log(request.query);
  pool.query('SELECT * FROM users WHERE UPPER(name) = $1 OR password = $2;', [request.query.name, request.query.password], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows[0]);
  });
};

// for logged in info
const getCurrentUser = (request, response) => {
  console.log(request.query);
  pool.query('SELECT * FROM users WHERE id = $1', [request.query.id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows[0]);
  });
};

const getUsers = (request, response) => {
  // console.log(request.query);
  pool.query('SELECT * FROM users;', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getTasks = (request, response) => {
  // console.log(request.params);
  // console.log(request.query);
  pool.query('SELECT * FROM tasks;', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};
const getAchievs = (request, response) => {
  // console.log(request.params);
  // console.log(request.query);
  pool.query('SELECT * FROM achievements;', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getLevels = (request, response) => {
  // console.log(request.params);
  // console.log(request.query);
  pool.query('SELECT * FROM levels;', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const addUser = (request, response) => {
  return pool.query(`
  INSERT INTO users (name, password, email, phone, username) 
  VALUES ($1, $2, $3, $4, $5)
  RETURNING *`, [request.body.params.name, request.body.params.password, request.body.params.email, request.body.params.phone, request.body.params.username])
    .then(res => res.rows[0] || null);
};

module.exports = {
  getUser,
  getCurrentUser,
  getUsers,
  getTasks,
  getAchievs,
  getLevels,
  addUser
};