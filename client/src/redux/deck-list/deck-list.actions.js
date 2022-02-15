import DeckListActionTypes from "./deck-list.types.js";
import axios from 'axios';

export const addDeck = newDeck => ({
    type: DeckListActionTypes.ADD_DECK,
    payload: newDeck
});

export const deleteDeck = id => ({
    type: DeckListActionTypes.DELETE_DECK,
    payload: id
});

export const updateDeck = deck => ({
    type: DeckListActionTypes.UPDATE_DECK,
    payload: deck
});

export function createDeck (values) {
    return function(dispatch) {
      return axios.post('localhost:8080/api/decks/createdeck', values)
      .then((response) => {
        dispatch({ type: DeckListActionTypes.ADD_DECK})
        console.log(response);
      })
      }
    }


