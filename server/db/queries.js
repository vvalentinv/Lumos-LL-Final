const client = require('./connection');

const getAllUsers = (cb,err) => {
  client.query("SELECT * FROM users;")
    .then((results) => {
    // users array of objects
      console.log(results.rows);
      cb(results.rows);
    })
    .catch(err);
  console.log(err);
};

module.exports = {
  getAllUsers
};