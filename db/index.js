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
  pool.query('SELECT * FROM users WHERE UPPER(username) = $1 OR password = $2;', [request.query.username, request.query.password], (error, results) => {
    if (error) {
      throw error;
    }
    request.session = { username: results.rows[0] };
    response.status(200).json(results.rows[0]);
  });
};

const getCookies = (req, res) => {
  return req.session;
};

// for logged in info
const getCurrentUser = (request, response) => {
  if (request.query.id) {
    pool.query('SELECT * FROM users WHERE id = $1', [request.query.id], (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows[0]);
    });
  }
};

const getUsers = (request, response) => {
  pool.query('SELECT * FROM users;', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getTasks = (request, response) => {
  pool.query('SELECT * FROM tasks;', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};
const getUsersTasks = (request, response) => {
  pool.query('SELECT * FROM user_task WHERE user_id = $1;', [request.query.id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};
const getMainTasks = (request, response) => {
  pool.query('SELECT * FROM tasks WHERE type = $1;', ['main'], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};
const getSideTasks = (request, response) => {
  pool.query('SELECT * FROM tasks WHERE type = $1;', ['side'], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getAchievs = (request, response) => {
  console.log("REQUESTSTST", request.query);
  pool.query('SELECT * FROM achievements;', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};
const getUsersAchievs = (request, response) => {
  console.log("REQUESTSTST", request.query);
  pool.query('SELECT * FROM user_achievs WHERE user_id = $1;', [request.query.id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getLevels = (request, response) => {
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
  RETURNING *;`, [request.body.params.name, request.body.params.password, request.body.params.email, request.body.params.phone, request.body.params.username])
    .then(res => {
      response.status(200).json(res.rows[0]);
    })
    .catch(error => error);
};

module.exports = {
  getCookies,
  getUser,
  getCurrentUser,
  getUsers,
  getTasks,
  getMainTasks,
  getSideTasks,
  getUsersTasks,
  getAchievs,
  getUsersAchievs,
  getLevels,
  addUser
};