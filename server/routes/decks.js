const { getAllDecks, getAllDecksForUser } = require("../db/queries");

const router = require('express').Router();

const deckRoutes = () => {
  // routes
  router.get('/', (req, res) => {
    getAllDecks((decks) => {
      res.json(decks);
    });
  });

  //all decks with cards
  router.get('/:id', (req, res) => {
    const uuid = req.params.id;
    //const uuid = req.params.id;
    getAllDecksForUser(uuid, (decks) => {
      res.json(decks);
    });
  });
  return router;
};

module.exports = deckRoutes;
