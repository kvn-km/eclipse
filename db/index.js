const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'eclipse',
  port: 5432
});

// const getUsers = (request, response) => {
//   console.log(request.params);
//   console.log(request.query);
//   pool.query('SELECT * FROM users;', (error, results) => {
//     if (error) {
//       throw error;
//     }
//     response.status(200).json(results.rows);
//   });
// };

const getUser = (request, response) => {
  console.log(request.query);
  pool.query('SELECT * FROM users WHERE UPPER(name) = $1 OR password = $2;', [request.query.name, request.query.password], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows[0]);
  });
};

const addUser =  function(user) {
  return pool.query(`
  INSERT INTO users (name, email, password) 
  VALUES ($1, $2, $3)
  RETURNING *`, [user.name, user.email, user.password])
  .then(res => res.rows[0] || null);
}

module.exports = {
  getUser,
  addUser
};