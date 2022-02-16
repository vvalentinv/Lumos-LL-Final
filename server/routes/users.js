const { getAllUsers, getUuidByEmail } = require("../db/queries");

const router = require('express').Router();

const userRoutes = () => {
  // routes
  router.get('/', (req, res) => {
    getAllUsers((users) => {
      res.json(users);
    });
  });

  //
  router.get('/userId', (req, res) => {
    getUuidByEmail((user) => {
      res.json(user);
    });
  });

  return router;
};

module.exports = userRoutes;
