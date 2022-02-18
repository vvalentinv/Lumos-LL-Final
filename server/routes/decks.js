const { getUuidByEmail, getAllDecks, getAllDecksForUser, storeUser, getUserIdByEmail, storeDeck, storeCard, linkCardToDeck, getDeckByUserIdDeckId } = require("../db/queries");

const router = require('express').Router();

const deckRoutes = () => {
  // routes
  // router.get('/', (req, res) => {
  //   getAllDecks((decks) => {
  //     res.json(decks);
  //   });
  // });

  //! GET ALL DECKS FOR USER
  router.get('/:id', (req, res) => {
    const uuid = req.params.id;
    getAllDecksForUser(uuid)
      .then((data) => {
        return res.send(data);
      })
      .catch((error) => console.log(error));
  });

  //! GET SPECIFIC DECK
  router.post('/:id', (req, res) => {
    console.log(req.body);
    const { userUUID, deckID } = req.body;
    console.log("UUID:", userUUID);
    console.log("DECKID:", deckID);
    return getDeckByUserIdDeckId(userUUID, deckID)
      .then((data) => {
        // console.log(data);
        return res.send(data);
      })
      .catch((error) => console.log(error));
  });

  //! STORE DECKS
  router.post('/', async(req, res) => {
    const { email, nickname, email_verified } = req.body.user;
    const user = { email, nickname, email_verified, password: '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.' };
    const { deckTitle } = req.body;
    const uuid = await getUuidByEmail(user);

    //~ STORE DECK
    const deck = { deckTitle, uuid };
    const newDeck = await storeDeck(deck);

    //~ STORE FLASHCARDS
    const cards = [];
    for (const card of req.body.cardList) {
      const newCard = await storeCard(card, deck);
      cards.push(newCard[0].id);
    }

    //~ STORE CARD ASSOCIATION
    for (const cardId of cards) {
      const newLink = await linkCardToDeck(cardId, newDeck[0].id);
    }

    return res.send({ status: `for user ${uuid} stored deck ${newDeck[0].id} associated cards with ids ${cards} with it` });
  });
  return router;
};

module.exports = deckRoutes;
