const { changeCardsVisibility, checkCardAuthor, getAllCardsByDeck, getAllPublicCardsByDeckTitle } = require("../db/queries");

const router = require('express').Router();

const cardRoutes = () => {

  // change a card's public column true or false
  router.post('/change', (req, res) => {
    // console.log("body.req", req.body);
    const { cid, isPublicStatus, userUUID } = req.body;
    // console.log("params", cid, isPublicStatus, userUUID);
    return changeCardsVisibility(cid, isPublicStatus, userUUID)
      .then((data) => res.send(data))
      .catch((error) => console.log(error));
  });

  // check if current user is the author of the card (used in rendering the delete button)
  router.post('/change', (req, res) => {
    const { card, userUUID } = req.body;
    return checkCardAuthor(card, userUUID)
      .then((data) => res.send(data))
      .catch((error) => console.log(error));
  });

  router.post('/:id', (req, res) => {
    const { userUUID, deckID } = req.body;
    // console.log("cardList params--------------:", userUUID, deckID);
    return getAllCardsByDeck(userUUID, deckID)
      .then((data) => {
        // console.log("raw cards:", data);
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
        // console.log("changeForFrontEnd:", changeForFrontEnd);
        console.log(changeForFrontEnd);
        return res.send(changeForFrontEnd);
      })
      .catch((error) => console.log(error));
  });

  router.get('/publicDecks', (req, res) => {
    return getAllPublicCardsByDeckTitle()
      .then((data) => {
        console.log("raw cards:", data);
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
        // console.log("changeForFrontEnd:", changeForFrontEnd);
        // console.log("Deck List with public cards", changeForFrontEnd);
        return res.send(changeForFrontEnd);
      })
      .catch((error) => console.log(error));
  });
  return router;
};


module.exports = cardRoutes;
