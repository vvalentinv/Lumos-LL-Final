const client = require('./connection');
const res = require('express/lib/response');

//! DECK CARDS
const getAllCardsByDeck = (userUUID, deckID) => {
  console.log("params for DB:", userUUID, deckID);
  return client.query(`SELECT * FROM cards
                JOIN decks_with_cards ON cards.id =  decks_with_cards.card_id
                WHERE deck_id = $1;`, [deckID])
    .then((results) => {
      // console.log("cards FROM THE DATABASE:", results.rows);
      return (results.rows);
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
const getAllDecksForUser = (userUUID) => {
  return client.query(`SELECT * FROM decks
                WHERE user_id = $1;`, [userUUID])
    .then((results) => {
      // categories array of objects
      // console.log("all decks from DB", results.rows);
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

// !GET USER ID EMAIL
// ~ASYNC
const getUserIdByEmail = async(email) => {
  const exists = await client.query(`SELECT id FROM users
                WHERE email = $1;`, [email]);
  // console.log("result from await", exists.rows);
  return exists.rows;
};

// const getUUIDByEmail = (email) => {
//   return client.query(`SELECT id FROM users
//                 WHERE email = $1;`, [email])
//     .then((result) => result.rows)
//     .catch((error) => console.log(error));
//   // return exists.rows;
// };

//! STORE USER
const storeUser = (user) => {
  client.query(`INSERT INTO users(nickname, email, password, email_verified) VALUES
  ($1, $2, $3, $4) RETURNING *;`, [user.nickname, user.email, user.password, user.email_verified])
    .then((results) => {
      // categories array of objects
      // console.log("userUUID:", results.rows[0].id);
      results.rows[0].id;
    })
    .catch((error) => console.log(error.message));
};

//! STOREDECK
const storeDeck = async(deck) => {
  // console.log("params for store deck insert:", deck)
  const newDeck = await client.query(`INSERT INTO decks (user_id, deck_name, deck_description, category_id) VALUES
  ($1, $2, $3, $4) RETURNING *;`, [deck.userUUID, deck.deckTitle, deck.deckTitle, 1]);
  // console.log("result from await store deck", newDeck.rows);
  return newDeck.rows;
};

//! STORECARD
const storeCard = async(card, userUUID) => {
  console.log("store card params", card, userUUID);
  const newCard = await client.query(`INSERT INTO cards (user_id, question, url, answer, all_answers, public) VALUES
($1, $2, $3, $4, $5, $6) RETURNING *;`, [userUUID, card.definition,
    'https://drive.google.com/file/d/1-zn90p7XF2bwQ_aJusE5NIUaajkRQLLo/view?usp=sharing',
    card.term, '{"F1", "F2", "F3"}', card.isPublic]);
  return newCard.rows;
};

//! UPDATE CARD
const updateCard = async(card) => {
  return client.query(`UPDATE cards
                  SET question = $1,
                      answer = $2,
                      public = $3
              WHERE id = $4;`, [card.definition, card.term, card.isPublic, card.cid])
    .then((results) => {
      // console.log("update card resolved:", results);
      return (results.rows[0]);
    })
    .catch((error) => console.log(error.message));
};

//! REMOVE CARD
const removeCard = async(cardID) => {
  return client.query(`DELETE FROM cards
                WHERE card_id = $1;`, [cardID])
    .then(() => {
      // console.log("FROM THE DATABASE:", results);
      res.send(`deleted card with id ${cardID}`);
    })
    .catch((error) => console.log(error.message));
};

//! LINKCARDTODECK
const linkCardToDeck = async(cardID, deckID) => {
  // console.log("new link params:", cardID, deckID);
  const newDeckAssociation = await client.query(`INSERT INTO decks_with_cards (card_id, deck_id) VALUES
($1, $2) RETURNING *;`, [cardID, deckID]);
  return newDeckAssociation.rows[0];
};

//! REMOVE LINK
const removeLink = async(deckID, cardID) => {
  return client.query(`DELETE FROM decks_with_cards
                WHERE card_id = $1 AND deck_id = $2;`, [cardID, deckID])
    .then(() => {
      // console.log("FROM THE DATABASE:", results);
      res.send(`deleted link for flashcard id ${cardID}`);
    })
    .catch((error) => console.log(error.message));
};

//! GET-userUUID-BY-EMAIL
const getUUIDByEmail = async(user) => {
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
const getDeckByDeckID = (userUUID, deckID) => {
  // console.log("params:", userUUID, deckID);
  return client.query(`SELECT * FROM decks
                WHERE id = $1; `,[deckID]) //AND user_id = $1;`, [userUUID, deckID])
    .then((results) => {
      // console.log("DECK ------------------------FROM THE DATABASE:", results);
      return (results.rows[0]);
    })
    .catch((error) => console.log(error.message));
};

const updateDeck = (deckTitle, deckID) => {
  // console.log("params:", userUUID, deckID);
  return client.query(`UPDATE decks
                  SET deck_name = $1
              WHERE id = $2;`, [deckTitle, deckID])
    .then((results) => {
      // console.log("FROM THE DATABASE:", results);
      return (results.rows[0]);
    })
    .catch((error) => console.log(error.message));
};

const deleteDeckAssociations = (deckID) => {
  // console.log("params delete links:", deckID);
  return client.query(`DELETE FROM  decks_with_cards
              WHERE deck_id = $1;`, [deckID])
    .then((results) => {
      // console.log("FROM THE DATABASE delete links:", results);
      return res.send({ status: `Deck ID:${deckID} has no cards associated with it` });
    })
    .catch((error) => console.log(error.message));
};


const deleteDeck = (deckID) => {
  // console.log("params delete deck and links:", deckID);
  const clearLinks = deleteDeckAssociations(deckID)
    .then(() => {
      return client.query(`DELETE FROM  decks
      WHERE id = $1;`, [deckID])
        .then((results) => {
          // console.log("FROM THE DATABASE delete deck:", results);
          return res.send({ status: `Deck ID:${deckID} has been deleted` });
        })
        .catch((error) => console.log(error.message));
    });


};




const getAllPublicCardsByDeckTitle = () => {

  return client.query(`SELECT * FROM decks WHERE decks.id IN(SELECT DISTINCT(decks.id) FROM decks
                      JOIN decks_with_cards ON decks_with_cards.deck_id = decks.id
                      JOIN cards ON decks_with_cards.card_id = cards.id
                      GROUP BY decks.id);`)
  //WHERE cards.public IS TRUE
    .then((results) => {
      // console.log("DECKS with public cards FROM THE DATABASE:", results.rows);
      return (results.rows);
    })
    .catch((error) => console.log(error.message));
};

const changeCardsVisibility = (cid, isPublic, userUUID) => {
  let param = false;
  isPublic !== 'false' ? param = !param : param;
  console.log("params card visibility change:", param, cid, userUUID);

  return client.query(`UPDATE cards
                  SET public = $2
              WHERE user_id = $3 AND id = $1;`, [cid, param, userUUID])
    .then((results) => {
      console.log("change card visibility FROM THE DATABASE to:", results);
      return res.send({ status: `Visibility changed to ${param}` });
    })
    .catch((error) => console.log(error.message));
};

const checkCardAuthor = (card, userUUID) => {
  // console.log("params check card author:", card, userUUID);
  return client.query(`SELECT user_id FROM cards WHERE id = $1;`, [card.cid, userUUID])
    .then((results) =>
      // console.log("change card visibility FROM THE DATABASE:", results);
      results.rows[0] === userUUID ? true : false)
    .catch((error) => console.log(error.message));
};


module.exports = { changeCardsVisibility, checkCardAuthor, getAllPublicCardsByDeckTitle, deleteDeckAssociations, deleteDeck, getDeckByDeckID, removeCard, removeLink, updateCard, updateDeck, getUUIDByEmail, getAllCategories, getAllDecksForUser, getAllCardsForDeck, storeUser, getUUIDByEmail, storeDeck, storeCard, linkCardToDeck, getAllCardsByDeck };
