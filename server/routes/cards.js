const { getAllCardsByDeck, getAllPublicCardsByDeckTitle } = require("../db/queries");

const router = require('express').Router();

const cardRoutes = () => {

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
          card.isPublic = false;
          card.isUpdated = false;
          changeForFrontEnd.push(card);
        });
        // console.log("changeForFrontEnd:", changeForFrontEnd);
        console.log(changeForFrontEnd);
        return res.send(changeForFrontEnd);
      })
      .catch((error) => console.log(error));
  });

  router.get('/:title', (req, res) => {
    const { title } = req.params.title;
    // console.log("cardList params--------------:", userUUID, deckID);
    return getAllPublicCardsByDeckTitle(title)
      .then((data) => {
        // console.log("raw cards:", data);
        const changeForFrontEnd = [];
        data.forEach((d, index) => {
          let id = index + 1;
          const deck = {};
          deck.cid = d.deck_id;
          deck.id = id;
          deck.title = d.deck_name;
          deck.user_id = d.user_id;
          changeForFrontEnd.push(deck);
        });
        // console.log("changeForFrontEnd:", changeForFrontEnd);
        console.log("Deck List with public cards", changeForFrontEnd);
        return res.send(changeForFrontEnd);
      })
      .catch((error) => console.log(error));
  });
  return router;
};


module.exports = cardRoutes;
