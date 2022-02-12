const { getAllDeckCards } = require("../db/queries");

const router = require('express').Router();

const deckCardsRoutes = () => {
  // routes
  router.get('/', (req, res) => {
    getAllDeckCards((users) => {
      res.json(users);
    });
  });
  return router;
};

module.exports = deckCardsRoutes;
