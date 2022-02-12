import { combineReducers } from 'redux';

import cardListReducer from './card-list/card-list.reducer';

export default combineReducers({
    cardlist: cardListReducer
});