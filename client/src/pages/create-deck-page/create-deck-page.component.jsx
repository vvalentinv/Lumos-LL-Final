import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { addCard } from "../../redux/card-list/card-list.actions";

import CustomButton from "../../components/custom-button/custom-button.component";
import Card from "../../components/card/card.component";

const CreateDeckPage = () => {

    const [editMode, setEditMode] = useState(false);

    const { deckid } = useParams();

    console.log(deckid)

    useEffect(() => {
        setEditMode(deckid ? true : false)
        // if (editMode) async fetch of existing I'th Deck Cards from DB
        // and update cardList state in Redux store 
        // FETCH_DECK_CARDS redux action thunk
    }, [deckid])

    const dispatch = useDispatch();
    const selCardList = useSelector(state => state.cardList);
    const { cardList } = selCardList;

    const addNewCard = () => {
        const newCard = {
            id: cardList.length + 1,
            term: '',
            definition: '',
            isUpdated: false
        }
        dispatch(addCard(newCard));
    }

    return (
        <div className='create-deck-page'>
            {editMode
                ? <h1 className='title-header'>Edit Deck</h1>
                : <h1 className='title-header'>Create a new deck</h1>
            }
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
            <div className='submit-deck-button-container'>
                <CustomButton className='submit-deck-button'>
                    Submit Deck
                </CustomButton>
            </div>

        </div>
    );
};

export default CreateDeckPage;

    // const submitHandler = () => {
    //     const addCards = cardList.filter(card => !card.isUpdated)
    //     const updatedCards = cardList.filter(card => card.isUpdated)
    //     dispatch(batchAddCards(addCards))
    //     dispatch(batchUpdateCards(updatedCards))
    // }