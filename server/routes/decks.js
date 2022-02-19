const { getDeckByDeckID, removeCard, getUUIDByEmail, getAllCardsByDeck, updateDeck, getAllDecksForUser, storeDeck, storeCard, linkCardToDeck, updateCard, removeLink } = require('../db/queries');

const router = require('express').Router();

const deckRoutes = () => {
  //! GET ALL DECKS FOR USER
  router.get('/:id', (req, res) => {
    const userUUID = req.params.id;
    console.log('userUUID:', userUUID);
    getAllDecksForUser(userUUID)
      .then((data) => res.send(data))
      .catch((error) => console.log(error));
  });

  //! GET SPECIFIC DECK
  router.post('/:id', (req, res) => {
    console.log(req.body);
    const { userUUID, deckID } = req.body;
    console.log("UUID:", userUUID);
    console.log("DECKID:", deckID);
    return getDeckByDeckID(userUUID, deckID)
      .then((data) => {
        // console.log(data);
        return res.send(data);
      })
      .catch((error) => console.log(error));
  });

  //! STORE new DECKS
  router.post('/', async (req, res) => {
    console.log("------------------------------------------", req.body);

    const { email, nickname, email_verified } = req.body.user;
    const user = { email, nickname, email_verified, password: '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.' };
    const { deckTitle } = req.body;
    const userUUID = await getUUIDByEmail(user);
    // console.log("returned UUID:", userUUID);
    //~ STORE DECK
    const deck = { deckTitle, userUUID };
    const newDeck = await storeDeck(deck);

    //~ STORE FLASHCARDS
    const cards = [];
    for (const card of req.body.cardList) {
      console.log("cardToStore:", card);
      const newCard = await storeCard(card, deck);
      console.log("storedCard:", newCard);
      cards.push(newCard[0].id);
    }

    //~ STORE CARD ASSOCIATION
    for (const cardId of cards) {
      const newLink = await linkCardToDeck(cardId, newDeck[0].id);
    }

    return res.send({ status: `for user ${userUUID} stored deck ${newDeck[0].id} associated cards with ids ${cards} with it` });
  });

  //! UPDATE DECKS
  router.put('/', async (req, res) => {
    console.log("------------------------------------------", req.body);
    const { userUUID, deckID, deckTitle, cardList } = req.body;

    //~ UPDATE DECK
    const newDeck = await updateDeck(deckTitle, deckID);

    //~ UPDATE FLASHCARDS
    // console.log("params to get cards:", userUUID, deckID);
    const oldCards = await getAllCardsByDeck(userUUID, deckID);
    // console.log("oldCards =>", oldCards);
    const oldCardsIDs = [];
    oldCards.forEach((c) => oldCardsIDs.push(c.card_id));
    console.log("oldCardsIDs =>", oldCardsIDs);
    if (oldCardsIDs.length <= req.body.cardList.length) {
      const newCards = cardList.slice(oldCardsIDs.length);
      // console.log("newCards =>", newCards);
      for (const card of newCards) {
        const newCard = await storeCard(card, userUUID);
        const newLink = await linkCardToDeck(newCard[0].id, deckID);
      }
      console.log("cardlist:", cardList);
      const newforUpdateCards = cardList.filter((c) => c.isUpdated === true);

      console.log("newForUPDATE CARDS:", newforUpdateCards);

      for (let i = 0; i < newforUpdateCards.length; i++) {
        newforUpdateCards[i].id = oldCardsIDs[i];
        const update = await updateCard(newforUpdateCards[i]);
      }
    } else {
      const toBeUpdated = req.body.cardList;
      const tobeRemoved = oldCardsIDs.slice(toBeUpdated.length);

      for (let i = 0; i < toBeUpdated.length; i++) {
        toBeUpdated[i].card_id = oldCardsIDs[i];
        // console.log("card for update on less cards branch:", toBeUpdated[i]);
        const updateCurrentExistingCard = await updateCard(toBeUpdated[i])
      }
      for (const cardID of tobeRemoved) {
        const deleteLink = await removeLink(deckID, cardID);
        const deletecard = await removeCard(cardID);
      }
    }


    return res.send({ status: `for user ${userUUID} updated deck ${deckID} ` });
  });

  return router;
};

module.exports = deckRoutes;
