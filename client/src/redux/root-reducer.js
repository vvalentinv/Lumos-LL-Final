import { combineReducers } from 'redux';

import cardListReducer from './card-list/card-list.reducer';

export default combineReducers({
    cardList: cardListReducer
});


//Home Page - useEffect componentdidMount all decks

//Deck Preview - useEffect componentdidMount I'th Deck