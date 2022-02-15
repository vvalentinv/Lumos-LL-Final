import { combineReducers } from 'redux';

import cardListReducer from './card-list/card-list.reducer';
import deckListReducer from './deck-list/deck-list.reducer';

export default combineReducers({
    cardList: cardListReducer,
    deckList: deckListReducer
});


//Home Page - useEffect componentdidMount all decks

//Deck Preview - useEffect componentdidMount I'th Deck