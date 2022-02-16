const res = require("express/lib/response");
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
  router.post('/', (req, res) => {
    console.log("++++++++++", req.body.user);
    const { email, nickname, email_verified } = req.body.user;
    const user = { email, nickname, email_verified };
    const uuid = getUuidByEmail(user);
    uuid.then((result) => {
      res.send(result);
    });
    // setTimeout(()=> {
    //   console.log("**********", uuid);
    //   res.send({uuid: uuid});
    // },100);
    // getUuidByEmail((user) => {
    // });
  });

  return router;
};

module.exports = userRoutes;
