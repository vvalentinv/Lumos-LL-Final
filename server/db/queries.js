const client = require('./connection');
const res = require('express/lib/response');

//! DECK CARDS
const getAllCardsByDeck = (deckID) => {
  console.log('DECKID', deckID);
  return client.query(`SELECT * FROM cards
                JOIN decks_with_cards ON cards.id =  decks_with_cards.card_id
                WHERE deck_id = $1;`, [deckID])
    .then((results) => {
      console.log(results.rows);
      return results.rows
    })
    .catch((error) => console.log(error.message));
};

//! CATEGORIES
const getAllCategories = (cb) => {
  client.query("SELECT * FROM categories;")
    .then((results) => cb(results.rows))
    .catch((error) => console.log(error.message));
};

//! GETALLDECKSFORUSER
const getAllDecksForUser = (userUUID) => {
  return client.query(`SELECT * FROM decks
                WHERE user_id = $1;`, [userUUID])
    .then((results) => results.rows)
    .catch((error) => console.log(error.message));
};

//! GETALLCARDSFORDECK
const getAllCardsForDeck = (deck_id, cb) => {
  client.query(`SELECT cards.id, cards.question, cards.answer FROM cards 
                JOIN decks_with_cards ON cards.id = decks_with_cards.card_id
                WHERE deck_id = $1 ;`, [deck_id])
    .then((results) => cb(results.rows))
    .catch((error) => console.log(error.message));
};

// !GET USER ID EMAIL
const getUserIdByEmail = async (email) => {
  const exists = await client.query(`SELECT id FROM users
                WHERE email = $1;`, [email]);
  return exists.rows;
};

//! STORE USER
const storeUser = (user) => {
  client.query(`INSERT INTO users(nickname, email, password, email_verified) VALUES
  ($1, $2, $3, $4) RETURNING *;`, [user.nickname, user.email, user.password, user.email_verified])
    .then((results) => results.rows[0].id)
    .catch((error) => console.log(error.message));
};

//! STOREDECK
const storeDeck = async (deck) => {
  const newDeck = await client.query(`INSERT INTO decks (user_id, deck_name, deck_description, category_id) 
                      VALUES ($1, $2, $3, $4) RETURNING *;`, [deck.userUUID, deck.deckTitle, deck.deckTitle, 1]);
  return newDeck.rows;
};

//! STORECARD
const storeCard = async (card, userUUID) => {
  const newCard = await client.query(`INSERT INTO cards (user_id, question, url, answer, all_answers, public) VALUES
($1, $2, $3, $4, $5, $6) RETURNING *;`, [userUUID, card.definition,
    'https://drive.google.com/file/d/1-zn90p7XF2bwQ_aJusE5NIUaajkRQLLo/view?usp=sharing',
    card.term, '{"F1", "F2", "F3"}', card.isPublic]);
  return newCard.rows;
};

//! UPDATE CARD
const updateCard = async (card) => {
  return client.query(`UPDATE cards SET question = $1, answer = $2, public = $3
                        WHERE id = $4;`, [card.definition, card.term, card.isPublic, card.cid])
    .then((results) => results.rows[0])
    .catch((error) => console.log(error.message));
};

//! REMOVE CARD
const removeCard = async (cardID) => {
  return client.query(`DELETE FROM cards WHERE card_id = $1;`, [cardID])
    .then(() => res.send(`deleted card`))
    .catch((error) => console.log(error.message));
};

//! LINKCARDTODECK
const linkCardToDeck = async (cardID, deckID) => {
  const newDeckAssociation = await client.query(`INSERT INTO decks_with_cards 
          (card_id, deck_id) VALUES ($1, $2) RETURNING *;`, [cardID, deckID]);
  return newDeckAssociation.rows[0];
};

//! REMOVE LINK
const removeLink = async (deckID, cardID) => {
  return client.query(`DELETE FROM decks_with_cards
                WHERE card_id = $1 AND deck_id = $2;`, [cardID, deckID])
    .then(() => res.send(`deleted link`))
    .catch((error) => console.log(error.message));
};

//! GET-userUUID-BY-EMAIL
const getUUIDByEmail = async (user) => {
  let userUUID = '';
  const checkUser = await getUserIdByEmail(user.email);

  if (checkUser.length < 1) {
    userUUID = await storeUser(user);
  } else {
    userUUID = checkUser[0].id;
  }
  return userUUID;
};

//! GET-SPECIFIC-DECK-USER
const getDeckByDeckID = (deckID) => {
  return client.query(`SELECT * FROM decks
                WHERE id = $1; `, [deckID])
    .then((results) => results.rows[0])
    .catch((error) => console.log(error.message));
};

//update deck title
const updateDeck = (deckTitle, deckID) => {
  return client.query(`UPDATE decks SET deck_name = $1 WHERE id = $2;`, [deckTitle, deckID])
    .then((results) => results.rows[0])
    .catch((error) => console.log(error.message));
};

//remove all records in the decks_with_cards for specific deckID
const deleteDeckAssociations = (deckID) => {
  return client.query(`DELETE FROM  decks_with_cards
              WHERE deck_id = $1;`, [deckID])
    .then(() => res.send({ status: `Deck has no cards associated with it` }))
    .catch((error) => console.log(error.message));
};

//delete a deck without deleting its cards
const deleteDeck = (deckID) => {
  const clearLinks = deleteDeckAssociations(deckID)
    .then(() => {
      return client.query(`DELETE FROM  decks
      WHERE id = $1;`, [deckID])
        .then(() => res.send({ status: `Deck has been deleted` }))
        .catch((error) => console.log(error.message));
    });
};

//get all decks
const getAllDecks = () => {
  return client.query(`SELECT * FROM decks WHERE decks.id IN(SELECT DISTINCT(decks.id) FROM decks
                      JOIN decks_with_cards ON decks_with_cards.deck_id = decks.id
                      JOIN cards ON decks_with_cards.card_id = cards.id
                      GROUP BY decks.id);`)
    .then((results) => results.rows)
    .catch((error) => console.log(error.message));
};

//switch the public status of a card in DB 
const changeCardsVisibility = (cid, isPublic, userUUID) => {
  let param = false;
  isPublic !== 'false' ? param = !param : param;

  return client.query(`UPDATE cards SET public = $2
              WHERE user_id = $3 AND id = $1;`, [cid, param, userUUID])
    .then(() => res.send({ status: `Visibility changed to ${param}` }))
    .catch((error) => console.log(error.message));
};

//returns true if the userID is the same as the deck owner
const checkDeckAuthor = (deckID, userUUID) => {
  return client.query(`SELECT user_id FROM decks WHERE id = $1;`, [deckID])
    .then((results) => results.rows[0].user_id === userUUID ? true : false)
    .catch((error) => console.log(error.message))
};

module.exports = {
  changeCardsVisibility,
  checkDeckAuthor,
  getAllDecks,
  deleteDeckAssociations,
  deleteDeck,
  getDeckByDeckID,
  removeCard,
  removeLink,
  updateCard,
  updateDeck,
  getUUIDByEmail,
  getAllCategories,
  getAllDecksForUser,
  getAllCardsForDeck,
  storeUser,
  getUUIDByEmail,
  storeDeck,
  storeCard,
  linkCardToDeck,
  getAllCardsByDeck
};
