const res = require("express/lib/response");
const { getAllUsers, getUuidByEmail } = require("../db/queries");

const router = require('express').Router();

const userRoutes = () => {
  // routes
  // router.get('/', (req, res) => {
  //   getAllUsers((users) => {
  //     res.json(users);
  //   });
  // });

  router.post('/', (req, res) => {
    const { email, nickname, email_verified } = req.body.user;
    const user = { email, nickname, email_verified };
    getUuidByEmail(user)
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
