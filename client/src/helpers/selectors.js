import axios from "axios";

export function getDeckBydeckID(userUUID, deckID) {
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
