const { getAllCardsByDeck } = require("../db/queries");

const router = require('express').Router();

const cardRoutes = () => {
  // routes
  // router.get('/', (req, res) => {
  //   getAllCards((cards) => {
  //     res.json(cards);
  //   });
  // });

  router.post('/:id', (req, res) => {
    const { userUUID, deckID } = req.body;
    console.log("carlist params:", userUUID, deckID);
    return getAllCardsByDeck(userUUID, deckID)
      .then((data) => {
        const changeForFrontEnd = [];
        data.forEach((c) => {
          const card = {};
          card.term = c.question;
          card.definition = c.answer;
          card.showAnswer = false;
          changeForFrontEnd.push(card);
        });

        return res.send(changeForFrontEnd);
      })
      .catch((error) => console.log(error));
  });

  // see cards for a specifc deck
  // router.get('/:id', (req, res) => {
  //   const deck_id = req.params.id;
  //   //const uuid = req.params.id;
  //   getAllCardsForDeck(deck_id, (cards) => {
  //     res.json(cards);
  //   });
  // });
  return router;
};


module.exports = cardRoutes;
