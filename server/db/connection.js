// const pg = require('pg');

const { Client } = require('pg');
const { DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME } = process.env;

// console.log(process.env);

//elephantsql
const config = {
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
};

const client = new Client(config);

client.connect(() => {
  console.log("connected to the database");
});

module.exports = client;