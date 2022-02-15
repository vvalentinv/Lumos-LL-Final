import CardListActionTypes from "./card-list.types.js";
import DeckListActionTypes from "../deck-list/deck-list.types.js";
import axios from 'axios';

export const addCard = newCard => ({
    type: CardListActionTypes.ADD_CARD,
    payload: newCard
});

export const deleteCard = id => ({
    type: CardListActionTypes.DELETE_CARD,
    payload: id
});

export const updateCard = card => ({
    type: CardListActionTypes.UPDATE_CARD,
    payload: card
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


