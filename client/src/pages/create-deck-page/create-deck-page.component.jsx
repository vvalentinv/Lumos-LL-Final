
import { useDispatch, useSelector } from 'react-redux';
import { addCard } from "../../redux/card-list/card-list.actions";

import CustomButton from "../../components/custom-button/custom-button.component";
import Card from "../../components/card/card.component";

const CreateDeckPage = () => {

    const dispatch = useDispatch();
    const selCardList = useSelector(state => state.cardList);
    const { cardList } = selCardList;

    console.log(cardList);

    const addNewCard = () => {
        const newCard = {
            id: cardList.length + 1,
            term: '',
            definition: '',
            isUpdated: false
        }
        console.log('Add Card', addCard(newCard));
        dispatch(addCard(newCard));
    }

    return (
        <>
            <p>Create a new deck</p>
            <CustomButton onClick={() => addNewCard()}>
                Add Card
            </CustomButton>
        </>
    );
};


export default CreateDeckPage;

//Save button - post request for I'th Card

//1. POST Request

// POST api.card.deck/cards/{id}





//Done Button

//For Loop Axios
//Update store