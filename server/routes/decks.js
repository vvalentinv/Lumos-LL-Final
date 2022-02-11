const router = require('express').Router();

const arrayOfDecksWithCards = [
  { '1': [1, 2, 3, 4, 5, 6, 7, 9, 10] },
  { '3': [2, 4, 6, 8, 10, 11, 12] },
  { '8': [2, 4, 6, 8, 10, 13, 14] }
];

const deckRoutes = () => {
  // routes
  router.get('/', (req, res) => {
    res.json(arrayOfDecksWithCards);
  });
  return router;
};

module.exports = deckRoutes;
