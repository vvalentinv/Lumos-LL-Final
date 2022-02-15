import DeckListActionTypes from "./deck-list.types";

import { updateDeckInDeckList } from './deck-list.utils';

const INITIAL_STATE = {
    deckList: [
        { id: 1, deckName: 'First Deck', description: 'First', category_id: 1 },
        { id: 2, deckName: 'Second Deck', description: 'Second', category_id: 2 }
    ]
};

const deckListReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case DeckListActionTypes.ADD_DECK:
            return {
                ...state,
                deckList: [...state.deckList, action.payload]
            };
        case DeckListActionTypes.DELETE_DECK:
            return {
                ...state,
                deckList: state.deckList.filter((deck) => deck.id !== action.payload)
            };

        case DeckListActionTypes.UPDATE_DECK:
            return {
                ...state,
                deckList: updateDeckInDeckList(state.deckList, action.payload)
            };

        default:
            return state;
    }
};

export default deckListReducer;


// return {
//     ...state,
//     [action.id]: {
//         ...state[action.id],
//         [action.field]: action.value,
//     },









//redux state update:
// deckList = { ...state, action.payload.newDeck.id: {...action.payload.newDeck } }


// case ADD_DECK_UPDATE: 	const updatedDeck = action.payload 	deckList.map((deck) => { 		if (deck.id === updatedDeck.id) { 			return { 				...updatedDeck 			} 		} 	})