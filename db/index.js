const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'eclipse',
  port: 5432
});

const getUsers = (request, response) => {
  pool.query('SELECT * FROM users;', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const addUser =  function(user) {
  return pool.query(`
  INSERT INTO users (name, email, password) 
  VALUES ($1, $2, $3)
  RETURNING *`, [user.name, user.email, user.password])
  .then(res => res.rows[0] || null);
}

const getUserWithEmail = function(email) {
  return pool.query(`
  SELECT * FROM users
  WHERE email = $1`, [email])
  .then(res => res.rows[0] || null);
}

module.exports = {
  getUsers,
  addUser,
  getUserWithEmail
};