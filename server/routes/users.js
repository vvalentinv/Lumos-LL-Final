const res = require("express/lib/response");
const { getUUIDByEmail } = require("../db/queries");

const router = require('express').Router();

const userRoutes = () => {

  router.post('/', (req, res) => {
    const { email, nickname, email_verified } = req.body.user;
    const user = { email, nickname, email_verified };
    getUUIDByEmail(user)
      .then((result) => {
        res.send(result);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return router;
};

module.exports = userRoutes;
