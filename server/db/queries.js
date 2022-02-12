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

//! DECKS
const getAllDecks = (cb) => {
  client.query("SELECT * FROM decks;")
    .then((results) => {
      // decks array of objects
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
  client.query("SELECT * FROM decks_with_cards;")
    .then((results) => {
      // deckcards array of objects
      // console.log(results.rows);
      cb(results.rows);
    })
    .catch((error) => console.log(error.message));
};

//! CATEGORIES
const getAllCategories = (cb) => {
  client.query("SELECT * FROM categories;")
    .then((results) => {
      // categories array of objects
      // console.log(results.rows);
      cb(results.rows);
    })
    .catch((error) => console.log(error.message));
};

//TODO getAllDecksForUser (UUID and takes in cb)
const getAllDecksForUser = (uuid, cb) => {
  client.query(`SELECT * FROM decks
                WHERE user_id = $1 ;`, [uuid])
    .then((results) => {
      // categories array of objects
      // console.log(results.rows);
      cb(results.rows);
    })
    .catch((error) => console.log(error.message));
};


module.exports = { getAllUsers, getAllDecks, getAllCards, getAllDeckCards, getAllCategories, getAllDecksForUser };
