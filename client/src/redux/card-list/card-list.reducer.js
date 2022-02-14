import CardListActionTypes from "./card-list.types";

const INITIAL_STATE = {
    cardList: [
        { id: 1, term: 'First Day', definition: 'Monday', isUpdated: false },
        { id: 2, term: 'Second Day', definition: 'Tuesday', isUpdated: false }
    ]
};

const cardListReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
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

        // case CardListActionTypes.UPDATE_CARD:
        //     return {
        //         ...state,
        //         cardList: state.cardList[action.payload.id] = action.payload.cardValue
        //     };

        //cardValue should be an obj with id, term and definition

        default:
            return state;
    }
};

export default cardListReducer;



//EDIT: state.cardList[action.payload.id] = action.payload.cardValue

//redux state update:
// cardList = { ...state, action.payload.newCard.id: {...action.payload.newCard } }


// case ADD_CARD_UPDATE: 	const updatedCard = action.payload 	cardList.map((card) => { 		if (card.id === updatedCard.id) { 			return { 				...updatedCard 			} 		} 	})