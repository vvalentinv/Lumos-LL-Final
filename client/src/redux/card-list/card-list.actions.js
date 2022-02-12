import CardListActionTypes from "./card-list.types";

export const addCard = card => ({
    type: CardListActionTypes.ADD_ITEM,
    payload: card
});

export const deleteCard = card => ({
    type: CardListActionTypes.DELETE_ITEM,
    payload: card
});

export const editCard = card => ({
    type: CardListActionTypes.EDIT_ITEM,
    payload: card
});



