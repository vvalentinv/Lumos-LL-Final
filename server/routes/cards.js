const { getAllCardsByDeck } = require("../db/queries");

const router = require('express').Router();

const cardRoutes = () => {
  // routes
  // router.get('/', (req, res) => {
  //   getAllCards((cards) => {
  //     res.json(cards);
  //   });
  // });

  router.post('/:id', (req, res) => {
    const { userId, deckId} = req.body;
    return getAllCardsByDeck(userId, deckId)
      .then((data) => {
        return res.send(data);
      })
      .catch((error)=>console.log(error));
  });

  // see cards for a specifc deck
  // router.get('/:id', (req, res) => {
  //   const deck_id = req.params.id;
  //   //const uuid = req.params.id;
  //   getAllCardsForDeck(deck_id, (cards) => {
  //     res.json(cards);
  //   });
  // });
  return router;
};
 

module.exports = cardRoutes;
