const { changeCardsVisibility, getAllCardsByDeck, getAllDecks, checkDeckAuthor } = require("../db/queries");

const router = require('express').Router();

const cardRoutes = () => {

  // change a card's public column true or false
  router.post('/change', (req, res) => {
    const { cid, isPublicStatus, userUUID } = req.body;
    return changeCardsVisibility(cid, isPublicStatus, userUUID)
      .then((data) => res.send(data))
      .catch((error) => console.log(error));
  });

  // check if current user is the author of the deck (used in rendering the delete button)
  router.post('/user', (req, res) => {
    const { deckID, userUUID } = req.body;
    return checkDeckAuthor(deckID, userUUID)
      .then((data) => res.send(data))
      .catch((error) => console.log(error));
  });

  // get cards associated with a deck by deckID
  router.post('/:id', (req, res) => {
    const { userUUID, deckID } = req.body;
    return getAllCardsByDeck(userUUID, deckID)
      .then((data) => {
        const changeForFrontEnd = [];
        data.forEach((c, index) => {
          let id = index + 1;
          const card = {};
          card.cid = c.card_id;
          card.id = id;
          card.term = c.answer;
          card.definition = c.question;
          card.showAnswer = false;
          card.isPublic = c.public;
          card.isUpdated = false;
          changeForFrontEnd.push(card);
        });

        return res.send(changeForFrontEnd);
      })
      .catch((error) => console.log(error));
  });

  //get all the decks
  router.get('/publicDecks', (req, res) => {
    return getAllDecks()
      .then((data) => {
        const changeForFrontEnd = [];
        data.forEach((d, index) => {
          let id = index + 1;
          const deck = {};
          deck.cid = d.id;
          deck.id = id;
          deck.key = id;
          deck.title = d.deck_name;
          deck.user_id = d.user_id;
          changeForFrontEnd.push(deck);
        });

        return res.send(changeForFrontEnd);
      })
      .catch((error) => console.log(error));
  });

  return router;
};


module.exports = cardRoutes;
