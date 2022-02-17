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

// export const fetchCardList = async (deckID, setLoading) => (
//   async (dispatch) => {
//     try {
//       //We need to get the UUID 
//       // const res = await axios.post(`https://localhost:8080/api/decks/${deckID}`, { userID, deckID }); //Requires both UUID and DeckID
//       // setLoading(false);

//       dispatch({
//         type: CardListActionTypes.FETCH_CARD_LIST,
//         payload: res
//       })
//     } catch (error) {
//       console.log(`Error: ${error}`)
//     }
//   }
// )

export function createDeck(values) {
  return function (dispatch) {
    return axios.post('localhost:8080/api/decks/createdeck', values)
      .then((response) => {
        dispatch({ type: DeckListActionTypes.ADD_DECK })
        console.log(response);
      })
  }
}

// export const fetchCardList = async (deckID, setLoading) => {
//   try {
//     const res = await axios.get(`https://localhost:8080/api/decks/${deckID}`);
//     setLoading(false);

//     return {
//       type: CardListActionTypes.FETCH_CARD_LIST,
//       payload: res
//     }
//   } catch (error) {
//     console.log(`Error: ${error}`)
//   }
// }

