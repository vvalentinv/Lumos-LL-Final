const { getAllUsers } = require("../db/queries");

const router = require('express').Router();

const userRoutes = () => {
  // routes
  router.get('/', (req, res) => {
    getAllUsers((users) => {
      res.json(users);
      // console.log(users);
    });
  });
  return router;
};

module.exports = userRoutes;
