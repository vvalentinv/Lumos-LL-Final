import axios from "axios";

export function getDeckBydeckID(userUUID, deckID) {
  console.log(process.env);
  if (!deckID) {
    return;
  }
  return axios.post(`http://localhost:8080/api/decks/${deckID}`, { userUUID, deckID });
}

export function getCardsByDeckForUser(userUUID, deckID) {
  if (!deckID) {
    return;
  }
  return axios.post(`http://localhost:8080/api/cards/${deckID}`, { userUUID, deckID });
}

export function getDeckListForUser(userUUID) {
  return axios.get(`http://localhost:8080/api/decks/${userUUID}`);
}

export function deleteDeck(deckID) {
  return axios.delete(`http://localhost:8080/api/decks/`, { data: { deckID } });
}

export function getAllPublicCardsByDecksWithTitle() {
  return axios.get(`http://localhost:8080/api/cards/publicDecks`);
}

export function setCardVisibilityByUser(card, userUUID) {
  return axios.post(`http://localhost:8080/api/cards/change`, { card, userUUID });
}

export function isUserDeckAuthor(deckID, userUUID) {
  return axios.post(`http://localhost:8080/api/cards/user`, { deckID, userUUID });
}
