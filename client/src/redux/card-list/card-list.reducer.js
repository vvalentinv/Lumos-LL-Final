import { v4 as uuidv4 } from 'uuid';

import CardListActionTypes from "./card-list.types";

import { updateCardInCardList } from './card-list.utils';

const INITIAL_STATE = {
    cardList: [
        { id: uuidv4(), term: '', definition: '', isUpdated: false, isPublic: false },
        { id: uuidv4(), term: '', definition: '', isUpdated: false, isPublic: false }
    ]
};

const cardListReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CardListActionTypes.FETCH_CARD_LIST:
            console.log('ACTION', action)
            return {
                ...state,
                cardList: [...action.payload]
            };
        case CardListActionTypes.ADD_CARD:
            return {
                ...state,
                cardList: [...state.cardList, action.payload]
            };
        case CardListActionTypes.DELETE_CARD:
            return {
                ...state,
                cardList: state.cardList.filter((card) => card.id !== action.payload)
            };

        case CardListActionTypes.UPDATE_CARD:
            return {
                ...state,
                cardList: updateCardInCardList(state.cardList, action.payload)
            };

        default:
            return state;
    }
};

export default cardListReducer;
