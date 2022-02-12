const { getAllDecks } = require("../db/queries");

const router = require('express').Router();

const deckRoutes = () => {
  // routes
  router.get('/', (req, res) => {
    getAllDecks((decks) => {
      res.json(decks);
    });
  });
  return router;
};

module.exports = deckRoutes;







