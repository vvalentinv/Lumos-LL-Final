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

//! GETALLDECKSFORUSER
const getAllDecksForUser = (uuid, cb) => {
  client.query(`SELECT * FROM decks
                WHERE user_id = $1;`, [uuid])
    .then((results) => {
      // categories array of objects
      // console.log(results.rows);
      cb(results.rows);
    })
    .catch((error) => console.log(error.message));
};

//! GETALLCARDSFORDECK
const getAllCardsForDeck = (deck_id, cb) => {
  client.query(`SELECT cards.id, cards.question, cards.answer FROM cards JOIN decks_with_cards ON cards.id = decks_with_cards.card_id
                WHERE deck_id = $1 ;`, [deck_id])
    .then((results) => {
      // categories array of objects
      // console.log(results.rows);
      cb(results.rows);
    })
    .catch((error) => console.log(error.message));
};

//! GETUSERBYEMAIL
const getUserByEmail = (email, cb) => {
  client.query(`SELECT email FROM users 
                WHERE email = $1 ;`, [email])
    .then((results) => {
      // categories array of objects
      // console.log(results.rows);
      cb(results ? true : false);
    })
    .catch((error) => console.log(error.message));
};

//! STOREUSER
const storeUser = (user, cb) => {
  client.query(`INSERT INTO users(nickname, email, password, email_verified) VALUES
  ($1, $2, $3, $4) RETURNING *;`, [user.nickname, user.email, user.password, user.email_verified])
    .then((results) => {
      // categories array of objects
      console.log(results.rows);
      cb(results ? true : false);
    })
    .catch((error) => console.log(error.message));
};

module.exports = { getAllUsers, getAllDecks, getAllCards, getAllDeckCards, getAllCategories, getAllDecksForUser, getAllCardsForDeck, getUserByEmail, storeUser };
