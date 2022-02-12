const { getAllDeckCards } = require("../db/queries");

const router = require('express').Router();

const deckCardsRoutes = () => {
  // routes
  router.get('/', (req, res) => {
    getAllDeckCards((deckCards) => {
      res.json(deckCards);
    });
  });
  return router;
};

module.exports = deckCardsRoutes;
