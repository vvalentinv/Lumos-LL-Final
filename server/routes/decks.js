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
  router.post('/', (req, res) => {
    console.log("+++++++++++++++++++++", req.body);
    // req.body contains all info front react (found in morgan terminal)
    const { email, nickname, email_verified } = req.body[1];
    const user = { email, nickname, email_verified, password:'$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.' };
    let uuid = '';
    // getUserByEmail(email, (email) => email);
    // const emailFound = getUserByEmail(email, email => email);
 
    if (getUserByEmail(email)) {
      uuid = storeUser(user);
    //   // console.log(uuid);
    }
    // //const uuid = req.params.id;
    return res.send({ status: `from database query email was found = ${ uuid }`});
  });
  return router;
};

module.exports = deckRoutes;
