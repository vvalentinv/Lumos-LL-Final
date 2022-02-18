import CardListActionTypes from "./card-list.types.js";
// import axios from 'axios';
import { getCardsByDeckForUser } from "../../helpers/selectors.js";

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

export const fetchCardList = async (UUID, deckID, setLoading) => (
  async (dispatch) => {
    try {
      const res = await getCardsByDeckForUser(UUID, deckID)
      res.then(data => {
        setLoading(false);
        console.log("actions ", data)
      });



      dispatch({
        type: CardListActionTypes.FETCH_CARD_LIST,
        payload: res
      })
    } catch (error) {
      console.log(`Error: ${error}`)
    }
  }
)

// export function createDeck(values) {
//   return function (dispatch) {
//     return axios.post('localhost:8080/api/decks/createdeck', values)
//       .then((response) => {
//         dispatch({ type: DeckListActionTypes.ADD_DECK })
//         console.log(response);
//       })
//   }
// }

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
