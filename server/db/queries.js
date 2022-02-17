const client = require('./connection');
const res = require('express/lib/response');

//! USERS
// const getAllUsers = (cb) => {
//   client.query("SELECT * FROM users;")
//     .then((results) => {
// users array of objects
// console.log(results.rows);
//       cb(results.rows);
//     })
//     .catch((error) => console.log(error.message));
// };

//! DECKS
// const getAllDecks = (cb) => {
//   client.query("SELECT * FROM decks;")
//     .then((results) => {
// decks array of objects
// console.log(results.rows);
//       cb(results.rows);
//     })
//     .catch((error) => console.log(error.message));
// };

//! CARDS
// const getAllCards = (cb) => {
//   client.query("SELECT * FROM cards;")
//     .then((results) => {
// cards array of objects
// console.log(results.rows);
//       cb(results.rows);
//     })
//     .catch((error) => console.log(error.message));
// };

//! DECK CARDS
// const getAllDeckCards = (cb) => {
//   client.query("SELECT * FROM decks_with_cards;")
//     .then((results) => {
// deckcards array of objects
// console.log(results.rows);
//       cb(results.rows);
//     })
//     .catch((error) => console.log(error.message));
// };

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
const getAllDecksForUser = (uuid) => {
  return client.query(`SELECT * FROM decks
                WHERE user_id = $1;`, [uuid])
    .then((results) => {
      // categories array of objects
      // console.log(results.rows);
      return (results.rows);
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

//! GET USER ID EMAIL
//~ASYNC
// const getUserIdByEmail = async(email) => {
//   const exists = await client.query(`SELECT id FROM users
//                 WHERE email = $1;`, [email]);
// console.log("result from await", exists.rows);
// return exists.rows;
// };

const getUserIdByEmail = (email) => {
  return client.query(`SELECT id FROM users 
                WHERE email = $1;`, [email])
    .then((result) => result.rows)
    .catch((error) => console.log(error));
  // return exists.rows;
};

//! STORE USER
const storeUser = (user) => {
  client.query(`INSERT INTO users(nickname, email, password, email_verified) VALUES
  ($1, $2, $3, $4) RETURNING *;`, [user.nickname, user.email, user.password, user.email_verified])
    .then((results) => {
      // categories array of objects
      console.log("uuid:", results.rows[0].id);
      results.rows[0].id;
    })
    .catch((error) => console.log(error.message));
};

//! STOREDECK
const storeDeck = async(deck) => {
  const newDeck = await client.query(`INSERT INTO decks (user_id, name, description, category_id) VALUES
  ($1, $2, $3, $4) RETURNING *;`, [deck.uuid, deck.deckTitle, deck.deckTitle, 1]);
  // console.log("result from await", newDeck.rows);
  return newDeck.rows;
};

//! STORECARD
const storeCard = async(card, deck) => {
  const newCard = await client.query(`INSERT INTO cards (user_id, question, url, answer, all_answers, public) VALUES
($1, $2, $3, $4, $5, $6) RETURNING *;`, [deck.uuid, card.definition,
    'https://drive.google.com/file/d/1-zn90p7XF2bwQ_aJusE5NIUaajkRQLLo/view?usp=sharing',
    card.term, '{"F1", "F2", "F3"}', card.isPublic]);
  return newCard.rows;
};

//! LINKCARDTODECK
const linkCardToDeck = async(cardId, deckId) => {
  const newDeckAssociation = await client.query(`INSERT INTO decks_with_cards (card_id, deck_id) VALUES
($1, $2) RETURNING *;`, [cardId, deckId]);
  return newDeckAssociation.rows[0];
};

// //! GET-UUID-BY-EMAIL
const getUuidByEmail = async(user) => {
  let uuid = '';
  const checkUser = await getUserIdByEmail(user.email);

  if (checkUser.length < 1) {
    uuid = await storeUser(user);
  }
  uuid = checkUser[0].id;
  return uuid;
};


module.exports = { getUuidByEmail, getAllCategories, getAllDecksForUser, getAllCardsForDeck, storeUser, getUserIdByEmail, storeDeck, storeCard, linkCardToDeck };
