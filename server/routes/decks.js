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

  // //! UPDATE DECKS
  // router.put('/', async (req, res) => {
  //   console.log("------------------------------------------", req.body);
  //   const { userUUID, deckID, deckTitle, cardList } = req.body;

  //   //~ UPDATE DECK
  //   const newDeck = await updateDeck(deckTitle, deckID);

  //   //~ UPDATE FLASHCARDS
  //   // console.log("params to get cards:", userUUID, deckID);
  //   const oldCards = await getAllCardsByDeck(userUUID, deckID);
  //   console.log("old cards:", oldCards);
  //   console.log("cardList:", cardList);
  // const cardIDsToRemainLinked = [];
  // //update updated cards, store and link new cards, build a list of cards to be kept
  // for (const oldCard of oldCards) {
  //   for (const card of cardList) {
  //     if (typeof card.id === 'number' && oldCard.card_id === card.cid) {
  //       cardIDsToRemainLinked.push(card.cid);
  //       if (card.isUpdated) {
  //         console.log("card to be updated:", card);
  //         const updatedCard = await updateCard(card);
  //       }
  //     } else if (typeof card.id === 'string') {
  //       const newCard = await storeCard(card, oldCard.user_id);
  //       const newLink = await linkCardToDeck(newCard, deckID);
  //       cardIDsToRemainLinked.push(newCard.id);
  //     }
  //   }
  // }
  // console.log("cardIDsToRemainLinked:", cardIDsToRemainLinked);
  // //unlink and delete deleted cards
  // // /for(const id of cardIDsToRemainLinked){
  // for (const card of oldCards) {
  //   if (!cardIDsToRemainLinked.includes(card.card_id)) {
  //     const unlink = await removeLink(deckID, card.id);
  //     const removed = await removeCard(card.id);
  //   }
  // }
  // }


  // console.log("oldCards =>", oldCards);
  // const oldCardsIDs = [];
  // oldCards.forEach((c) => oldCardsIDs.push(c.card_id));
  // console.log("oldCardsIDs =>", oldCardsIDs);
  // length = oldCards.length >= cardList.length ? oldCards.length : cardList.length;
  // for (let i = 0; i < length; i++) {
  //     if(typeof cardList[i].id === 'number'){
  //       if (cardList[i].cid === oldCards[i].card_id && cardList[i].isUpdated){
  //         const update = await updateCard(cardList[i]);
  //       }else if(cardList[i].cid > oldCards[i].card_id)
  //     }

  //     }

  // if (oldCardsIDs.length <= cardList.length) {
  //   const newCards = cardList.slice(oldCardsIDs.length);
  //   console.log("newCards =>", newCards);
  //   for (const card of newCards) {
  //     card.isUpdated = false;
  //     const newCard = await storeCard(card, userUUID);
  //     const newLink = await linkCardToDeck(newCard[0].id, deckID);
  //   }
  //   console.log("cardlist:", cardList);
  //   // const newforUpdateCards = cardList.filter((c) => c.isUpdated === true);

  //   console.log("newForUPDATE CARDS:", cardList);

  //   for (let i = 0; i < cardList.length; i++) {
  //     if (cardList[i].isUpdated)
  //       cardList[i].id = oldCardsIDs[i];
  //     const update = await updateCard(cardList[i]);
  //   }
  // } else {
  //   const idsToBeKept = [];
  //   const newCardIDs = [];
  //   cardList.forEach((c) => newCardIDs.push(c.id));
  //   for (let i = 0; i < cardList.length; i++) {
  //     idsToBeKept.push(cardList[i].cid);
  //     if (cardList[i].isUpdated) {
  //       // console.log("card for update on less cards branch:", toBeUpdated[i]);
  //       const updateCurrentExistingCard = await updateCard(cardList[i])
  //     }
  //     if (cardList[i].cid === 'newCard') {
  //       const newCard = await storeCard(cardList[i], userUUID);
  //       const newLink = await linkCardToDeck(newCard[0].id, deckID);
  //       idsToBeKept.push(newCard[0].id);

  //     }
  //   }
  //   for (const oldCard of oldCards) {
  //     if (!idsToBeKept.includes(oldCard.card_id)) {
  //       const deleteLink = await removeLink(deckID, cardID);
  //       const deletecard = await removeCard(cardID);
  //     }
  //   }

  // }

  //   return res.send({ status: `for user ${userUUID} updated deck ${deckID} ` });
  // });
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
    // console.log("oldCardsIDs =>", oldCardsIDs);
    // console.log("cardsList", cardList);

    const unchangedCardIDs = [];
    const updatedCardIDs = [];
    const newCards = [];
    const deletedCards = [];

    for (const card of cardList) {
      if (typeof card.id === 'number' && card.isUpdated) {
        const update = await updateCard(card);
        updatedCardIDs.push(card.cid);
      } else if (typeof card.id === 'number' && !card.isUpdated) {
        unchangedCardIDs.push(card.cid);
      } else if (typeof card.id !== 'number' && card.isUpdated) {

        const newCard = await storeCard(card, userUUID);
        const newLink = await linkCardToDeck(newCard[0].id, deckID);
        newCards.push(newCard);
      }
    }
    //check if existing card was deleted
    const deleted = oldCards.length > unchangedCardIDs.length + updatedCardIDs.length;
    // console.log("will delete", deleted);
    if (deleted) {
      for (const id of oldCardsIDs) {
        if (!unchangedCardIDs.includes(id) && !updatedCardIDs.includes(id)) {
          const deleteLink = await removeLink(deckID, id);
          const deleteCard = await removeCard(id);
          deletedCards.push(deleteCard);
        }
      }
    }
    // check that all front-end cards were processed
    const allProcessed = cardList.length === unchangedCardIDs.length + updatedCardIDs.length + newCards.length;
    // console.log("processed all cards", allProcessed);

    return res.send({ status: `for user ${userUUID} updated deck ${deckID} ` });
  });

  return router;
};

module.exports = deckRoutes;
