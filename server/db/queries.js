const client = require('./connection');

//! USERS
const getAllUsers = (cb) => {
  client.query("SELECT * FROM users;")
    .then((results) => {
    // users array of objects
      // console.log(results.rows);
      cb(results.rows);
    })
    .catch((error) => console.log(error.message));
};
//! CARDS
const getAllCards = (cb) => {
  client.query("SELECT * FROM cards;")
    .then((results) => {
    // cards array of objects
      // console.log(results.rows);
      cb(results.rows);
    })
    .catch((error) => console.log(error.message));
};

//! DECKCARDS
const getAllDeckCards = (cb) => {
  client.query("SELECT * FROM cards;")
    .then((results) => {
    // deckcards array of objects
      // console.log(results.rows);
      cb(results.rows);
    })
    .catch((error) => console.log(error.message));
};

//TODO getAllDecksForUser (UUID and takes in cb)

module.exports = { getAllUsers,  getAllCards, getAllDeckCards };
