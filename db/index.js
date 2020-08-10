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
  pool.query('SELECT * FROM user_task WHERE user_id = $1 ORDER BY task_id;', [request.query.id], (error, results) => {
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
const getTaskById = (request, response) => {
  console.log("GET TASK BY ID", request.query.id);
  pool.query('SELECT * FROM tasks WHERE id = $1;', [request.query.id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getAchievs = (request, response) => {
  pool.query('SELECT * FROM achievements;', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};
const getUsersAchievs = (request, response) => {
  pool.query('SELECT * FROM user_achievs WHERE user_id = $1 ORDER BY id;', [request.query.id], (error, results) => {
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
  INSERT INTO users (name, password, email, username) 
  VALUES ($1, $2, $3, $4)
  RETURNING *;`, [request.body.params.name, request.body.params.password, request.body.params.email, request.body.params.username])
    .then(res => {
      response.status(200).json(res.rows[0]);
      pool.query(`
      INSERT INTO user_task (user_id, task_id) 
      VALUES  ($1, 1),
              ($1, 2),
              ($1, 3),
              ($1, 4),
              ($1, 5),
              ($1, 6),
              ($1, 7),
              ($1, 8),
              ($1, 9),
              ($1, 10),
              ($1, 11),
              ($1, 12),
              ($1, 13),
              ($1, 14),
              ($1, 15),
              ($1, 16);`,
        [res.rows[0].id]);
      pool.query(`
      INSERT INTO user_achievs (user_id, achiev_id) 
      VALUES  ($1, 1),
              ($1, 2),
              ($1, 3),
              ($1, 4),
              ($1, 5),
              ($1, 6),
              ($1, 7),
              ($1, 8),
              ($1, 9),
              ($1, 10),
              ($1, 11),
              ($1, 12),
              ($1, 13),
              ($1, 14),
              ($1, 15),
              ($1, 16);`,
        [res.rows[0].id]);
    })
    .catch(error => error);
};

const completeTask = (request, response) => {
  return pool.query(`
  UPDATE user_task
  SET progress = progress + $3, times_completed = times_completed + 1
  WHERE user_id = $1 AND task_id = $2
  RETURNING *;`, [request.body.params.id, request.body.params.taskId, request.body.params.taskXP])
    .then(res => {
      return pool.query(`
        UPDATE users
        SET xp = xp + $2
        WHERE id = $1
        RETURNING *;`, [request.body.params.id, request.body.params.taskXP])
        .then(() => {
          return pool.query(`
            UPDATE users
            SET level = level + 1, xp = 0
            WHERE id = $1 AND xp > $2
            RETURNING *;`, [request.body.params.id, request.body.params.levelXP])
            .then(() => {
              console.log("WE MADE IT");
              response.status(200).json(res.rows[0]);
            });
        });
    })
    .catch(e => console.log("EEEEEEEEEEEE", e));
};

const updateAchievs = (request, response) => {
  return pool.query(`
        UPDATE user_achievs
        SET times_completed = times_completed + 1
        WHERE achiev_id = $2 AND user_id = $1
        RETURNING *;`, [request.body.params.id, request.body.params.taskId])
    .then(res => {
      console.log("IT WORKS");
      response.status(200).json(res.rows[0]);
    })
    .catch(e => console.log("EEEEEEEEEEEE", e));
};

const resetTask = (request, response) => {
  return pool.query(`
  UPDATE user_task
  SET times_completed = 0
  WHERE task_id = $2 AND user_id = $1
  RETURNING *;`, [request.body.params.user_id, request.body.params.task_id])
    .then(res => {
      console.log("TASK RESET");
      response.status(200).json(res.rows[0]);
    })
    .catch(e => console.log("REST INDEX.js EEEEEEEEEEEE", e));
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
  getTaskById,
  getAchievs,
  getUsersAchievs,
  getLevels,
  addUser,
  completeTask,
  updateAchievs,
  resetTask
};