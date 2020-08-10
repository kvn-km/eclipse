# ECLIPSE (LIFERPG)
===================

## Welcome to Eclipse!
----------------------

When life as we knew it changed due to quarantine, we began to run out of things to do. Eclipse was inspired by the idea that we still need to do daily tasks everyday. Instead of just completing them because life depends on it, you can also log them in our app! 

## About
--------

Eclipse is a full-stack web application built with Node JS, React, Express, PostgresSQL and Google's Teachable Machine (with the PoseNet model). This project is an interactive web-based application designed to capture your everyday actions in the way of a role-playing game using the user's webcam. Users can create an account and begin their adventure right away.

Each task is completed based on the amount of times they are completed. Users will be granted one completion if their actions are similar to 75% or greater to our action models. Users also have individual achievements and milestones they can acquire through continued use of the application. 

## Main Dependencies
--------------------

- Node 10.x or above
- NPM 5.x or above
- PG 6.x
- React
- Tensorflow
- Express
- body-parser
- cookie-session
- nodemon (Dev dependency)


## Getting Started
------------------

- Install all dependencies (using the `npm install` command)
- In the file `node_modules/react-scripts/scripts/start.js` change LINE 60 to the following:
  - `const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 8000;`

- PostgresSQL must be installed on your machine
  - Please follow this guide [here](https://blog.timescale.com/tutorials/how-to-install-psql-on-mac-ubuntu-debian-windows/) to install Postgres

  - After installation, create a database named `eclipse` within Postgres
  - Next import the database files using the following commands within the terminal in Postgres in the  following order:
    - `\i db/migrations/schema.sql`
    - `\i db/seeds/seeds.sql`

- Create an `index.js` file within the `db` directory based on the `index.example.js` file
- Change `user` and `password` to the Postgres user you have assigned the database
- Postgres default port: `5432`; Change at your own discretion

- Finally, Run the app using the `npm start` command.


**Thank you for your time!**
----------------------------

More functional changes will be applied in the near future (hopefully)!

Hope you have fun playing with our app!