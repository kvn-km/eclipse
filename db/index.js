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

<<<<<<< HEAD
const getTasks = (request, response) => {
  console.log(request.params);
  console.log(request.query);
  pool.query('SELECT * FROM tasks;', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};
const getAchievs = (request, response) => {
  console.log(request.params);
  console.log(request.query);
  pool.query('SELECT * FROM achievements;', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};
const getLevels = (request, response) => {
  console.log(request.params);
  console.log(request.query);
  pool.query('SELECT * FROM levels;', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

// const getUsers = (request, response) => {
//   console.log(request.params);
//   console.log(request.query);
//   pool.query('SELECT * FROM users WHERE name = $1;', [request.query.name], (error, results) => {
//     if (error) {
//       throw error;
//     }
//     response.status(200).json(results.rows[0]);
//   });
// };

const addUser = function (user) {
=======
const addUser =  function(user) {
>>>>>>> login2
  return pool.query(`
  INSERT INTO users (name, email, password) 
  VALUES ($1, $2, $3)
  RETURNING *`, [user.name, user.email, user.password])
    .then(res => res.rows[0] || null);
};

<<<<<<< HEAD
const getUserWithEmail = function (email) {
  return pool.query(`
  SELECT * FROM users
  WHERE email = $1`, [email])
    .then(res => res.rows || null);
};

module.exports = {
  getUsers,
  getTasks,
  getAchievs,
  getLevels,
  addUser,
  getUserWithEmail
=======
module.exports = {
  getUser,
  addUser
>>>>>>> login2
};