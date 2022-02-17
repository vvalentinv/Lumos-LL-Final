import { combineReducers } from 'redux';

import cardListReducer from './card-list/card-list.reducer';
import userReducer from './user/user.reducer';

export default combineReducers({
    cardList: cardListReducer,
    user: userReducer
});


