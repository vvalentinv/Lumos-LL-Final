const { getAllDecks, getAllDecksForUser, storeUser, getUserIdByEmail, storeDeck, storeCard, linkCardToDeck } = require("../db/queries");

const router = require('express').Router();

const deckRoutes = () => {
  // routes
  router.get('/', (req, res) => {
    getAllDecks((decks) => {
      res.json(decks);
    });
  });

  //all decks with cards

  router.post('/', async (req, res) => {
    // console.log("+++++++++++++++++++++", req.body);
    // req.body contains all info front react (found in morgan terminal)
    const { email, nickname, email_verified } = req.body.user;
    const user = { email, nickname, email_verified, password: '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.' };
    const { deckTitle } = req.body;
    let uuid = '';
    const checkUser = await getUserIdByEmail(email);
    // console.log("check email", checkUser);
    // console.log(getUserIdByEmail(email));

    if (checkUser.length < 1) {
      uuid = await storeUser(user);
      //   // console.log(uuid);
    } //else {
    //   uuid = await getUserIdByEmail(email);
    // }
    uuid = checkUser;
    //~ PREPARE FOR CARDS_DECK ASSOCIATION

    // const deckCards = {};

    //~ STORE DECK
    const deck = { deckTitle, uuid: uuid[0].id };
    // console.log(deck);
    const newDeck = await storeDeck(deck);
    // console.log("newDeck:", newDeck);
    const cards = [];

    // console.log("DECK_CARD:", newDeck);

    //~ STORE FLASHCARDS
    for (const card of req.body.cardList) {
      // console.log("check the card object", req.body.cardList);
      const newCard = await storeCard(card, deck);
      cards.push(newCard[0].id);
    }

    // deckCards.card_ids = cards;
    // console.log(req.body);

    // console.log("NEWDECKID:", newDeck[0].id);
    // deckCards.deck_id = newDeck[0].id;
    // console.log("deckCards:", deckCards);
    // {...deckCards, deck_id: newDeck.id };

    //~ STORE CARD ASSOCIATION
    for (const cardId of cards) {
      const newLink = await linkCardToDeck(cardId, newDeck[0].id);
      // console.log("+++++++++++++++++", newLink);
    }

    // console.log(uuid);
    return res.send({ status: `for user ${uuid[0].id} stored deck ${newDeck[0].id} associated cards with ids ${cards} with it` });
  });
  return router;
};

module.exports = deckRoutes;
