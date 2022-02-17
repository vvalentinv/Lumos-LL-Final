const { getAllCards, getAllCardsForDeck } = require("../db/queries");

const router = require('express').Router();

const cardRoutes = () => {
  // routes
  router.get('/', (req, res) => {
    getAllCards((cards) => {
      res.json(cards);
    });
  });

  // see cards for a specifc deck
  router.get('/:id', (req, res) => {
    const deck_id = req.params.id;
    //const uuid = req.params.id;
    getAllCardsForDeck(deck_id, (cards) => {
      res.json(cards);
    });
  });
  return router;
};
 

module.exports = cardRoutes;
