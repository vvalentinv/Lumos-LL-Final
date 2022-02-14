import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCard } from "../../redux/card-list/card-list.actions";

import CustomButton from "../../components/custom-button/custom-button.component";
import Card from "../../components/card/card.component";

const CreateDeckPage = () => {

    const dispatch = useDispatch();
    const selCardList = useSelector(state => state.cardList);
    const { cardList } = selCardList;

    // useEffect(() => {
    //FETCH ALL CARDS FROM BACKEND AND STORE IN CARDLIST STATE
    // }, [])

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
        <div className='create-deck-page'>
            <h1 className='title-header'>Create a new deck</h1>
            <div className='card-container'>
                {cardList.map((card) => {

                    const { id, term, definition } = card;

                    return (
                        <Card
                            key={id}
                            id={id}
                            term={term}
                            definition={definition}
                        />
                    )
                })}
            </div>
            <CustomButton className='add-card-button' onClick={() => addNewCard()}>
                Add Card
            </CustomButton>
        </div>
    );
};


export default CreateDeckPage;

//Save button - post request for I'th Card

//1. POST Request

// POST api.card.deck/cards/{id}





//Done Button

//For Loop Axios
//Update store