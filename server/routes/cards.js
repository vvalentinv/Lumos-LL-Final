const { getAllCards } = require("../db/queries");

const router = require('express').Router();

const cardRoutes = () => {
  // routes
  router.get('/', (req, res) => {
    getAllCards((cards) => {
      res.json(cards);
    });
  });
  return router;
};

module.exports = cardRoutes;
