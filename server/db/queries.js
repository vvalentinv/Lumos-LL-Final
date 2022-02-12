const client = require('./connection');

const getAllUsers = (cb) => {
  client.query("SELECT * FROM users;")
    .then((results) => {
    // users array of objects
      // console.log(results.rows);
      cb(results.rows);
    });
};

module.exports = {
  getAllUsers
};