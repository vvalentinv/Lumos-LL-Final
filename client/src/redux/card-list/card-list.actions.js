import CardListActionTypes from "./card-list.types.js";

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



