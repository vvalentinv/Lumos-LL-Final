const { getAllDecks, getAllDecksForUser, getUserByEmail, storeUser } = require("../db/queries");

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

  //all decks with cards
  router.post('/', async (req, res) => {
    // console.log("+++++++++++++++++++++", req.body);
    // req.body contains all info front react (found in morgan terminal)
    const { email, nickname, email_verified } = req.body.user;
    const user = { email, nickname, email_verified, password: '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.' };
    let uuid = '';
    const abc = await getUserByEmail(email);
    console.log("check email", abc);
    //



    if (abc.length < 1) {
      uuid = storeUser(user);
      //   // console.log(uuid);
    }
    // //const uuid = req.params.id;
    return res.send({ status: `from database query email was found = ${uuid}` });
  });
  return router;
};

module.exports = deckRoutes;
