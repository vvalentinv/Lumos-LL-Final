const {
  deleteDeck,
  getDeckByDeckID,
  removeCard,
  getUUIDByEmail,
  getAllCardsByDeck,
  updateDeck,
  getAllDecksForUser,
  storeDeck,
  storeCard,
  linkCardToDeck,
  updateCard,
  removeLink
} = require('../db/queries');

const router = require('express').Router();

const deckRoutes = () => {
  //! GET ALL DECKS FOR USER
  router.get('/:id', (req, res) => {
    const userUUID = req.params.id;
    getAllDecksForUser(userUUID)
      .then((data) => res.send(data))
      .catch((error) => console.log(error));
  });

  //! delete DECK
  router.delete('/', (req, res) => {
    const deckID = req.body.deckID;
    deleteDeck(deckID);

    return res.send({
      status: ` deck ${deckID} is no longer associated with any cards, 
      therefore was deleted form the decks table` })
  });


  //! GET SPECIFIC DECK
  router.post('/:id', (req, res) => {
    const { deckID } = req.body;
    return getDeckByDeckID(deckID)
      .then((data) => res.send(data))
      .catch((error) => console.log(error));
  });

  //! STORE new DECKS
  router.post('/', async (req, res) => {
    const { email, nickname, email_verified } = req.body.user;
    const user = { email, nickname, email_verified, password: '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.' };
    const { deckTitle, thunkList } = req.body;
    const userUUID = await getUUIDByEmail(user);

    //~ STORE DECK
    const deck = { deckTitle, userUUID };
    const newDeck = await storeDeck(deck);

    //~ STORE FLASHCARDS
    const cardIDs = [];

    for (let i = 0; i < thunkList.length; i++) {
      let card = thunkList[i];
      card["order_id"] = i;
      card.user_id = userUUID;
      const newCard = await storeCard(card, userUUID);
      cardIDs.push(newCard[0].id);
    }

    //~ STORE CARD ASSOCIATION
    for (const cardId of cardIDs) {
      const newLink = await linkCardToDeck(cardId, newDeck[0].id);
    }

    return res.send({
      status: `New deck stored in DB`,
      deckID: newDeck[0].id
    });
  });

  //! UPDATE DECKS
  router.put('/', async (req, res) => {
    console.log('BODY', req.body);
    const { userUUID, deckID, deckTitle, thunkList } = req.body;

    //~ UPDATE DECK
    const newDeck = await updateDeck(deckTitle, deckID);

    //~ UPDATE FLASHCARDS
    const oldCards = await getAllCardsByDeck(deckID);
    const oldCardsIDs = [];
    oldCards.forEach((card) => oldCardsIDs.push(card.card_id));

    const updatedCardIDs = [];
    const newCards = [];
    const deletedCards = [];

    for (let i = 0; i < thunkList.length; i++) {
      let card = thunkList[i];
      card["order_id"] = i;

      if (typeof card.id === 'number') {
        const update = await updateCard(card);
        updatedCardIDs.push(card.cid);
      } else {
        const newCard = await storeCard(card, userUUID);
        const newLink = await linkCardToDeck(newCard[0].id, deckID);
        newCards.push(newCard);
      }
    }

    //check if an existing card was marked for deletion
    const deleted = oldCards.length > updatedCardIDs.length;
    if (deleted) {
      for (const id of oldCardsIDs) {
        if (!updatedCardIDs.includes(id)) {
          const deleteLink = await removeLink(deckID, id);
          const deleteCard = await removeCard(id);
          deletedCards.push(deleteCard);
        }
      }
    }

    // check that all front-end cards were processed
    const allProcessed = thunkList.length === updatedCardIDs.length + newCards.length;

    return res.send({ status: `Deck updated` });
  });

  return router;
};

module.exports = deckRoutes;
