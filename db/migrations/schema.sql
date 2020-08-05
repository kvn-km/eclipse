DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS achievements CASCADE;
DROP TABLE IF EXISTS tasks CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255),
  password VARCHAR(255),
  email VARCHAR(255),
  phone INTEGER,
  username VARCHAR(255),
  date_created DATE DEFAULT CURRENT_DATE,
  experience_points INTEGER,
  level INTEGER
);

CREATE TABLE achievements (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255),
  image_URL TEXT,
  description TEXT
);

CREATE TABLE tasks (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255),
  completion_time_in_seconds INTEGER,
  type VARCHAR(255),
  xp_points INTEGER,
  times_to_complete INTEGER,
  description TEXT
);