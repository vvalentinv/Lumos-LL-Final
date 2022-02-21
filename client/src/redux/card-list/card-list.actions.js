import CardListActionTypes from "./card-list.types.js";

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

export const fetchCardList = (UUID, deckID, setLoading) => (
  async (dispatch) => {
    try {
      const res = await getCardsByDeckForUser(UUID, deckID);
      const { data } = res;
      setLoading(false);

      dispatch({
        type: CardListActionTypes.FETCH_CARD_LIST,
        payload: data
      })
    } catch (error) {
      console.log(`Error: ${error}`)
    }
  }
)




