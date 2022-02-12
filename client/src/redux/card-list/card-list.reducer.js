import CardListActionTypes from "./card-list.types";
import { addCardToCardList, removeCardFromCardList, editCardInCardList } from "./card-list.utils";

const INITIAL_STATE = {
    cardList:
        [
            {
                id: 1,
                term: '',
                definition: ''
            },

            {
                id: 2,
                term: '',
                definition: ''
            }
        ]
};

const cardListReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CardListActionTypes.ADD_CARD:
            return {
                ...state,
                cardList: addCardToCardList(state.cardList, action.payload)
            };
        case CardListActionTypes.DELETE_CARD:
            return {
                ...state,
                cardList: removeCardFromCardList(state.cardList, action.payload)
            };
        case CardListActionTypes.EDIT_CARD:
            return {
                ...state,
                cardList: editCardInCardList(state.cardList, action.payload)
            };
        default:
            return state;
    }
};

export default cardListReducer;
