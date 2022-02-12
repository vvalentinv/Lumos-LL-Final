const { getAllCards } = require("../db/queries");

const router = require('express').Router();

const cardRoutes = () => {
  // routes
  router.get('/', (req, res) => {
    getAllCards((users) => {
      res.json(users);
    });
  });
  return router;
};

module.exports = cardRoutes;
