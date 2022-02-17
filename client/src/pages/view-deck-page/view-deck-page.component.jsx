import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCardList, addCard } from "../../redux/card-list/card-list.actions";

import { useParams, useNavigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

import CustomButton from "../../components/custom-button/custom-button.component";
import Card from "../../components/card/card.component";

const ViewDeckPage = () => {

    const [deckTitle, setDeckTitle] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [editMode, setEditMode] = useState(false);

    const dispatch = useDispatch();
    const selCardList = useSelector(state => state.cardList);
    const { cardList } = selCardList;

    const { user } = useAuth0();
    const { deckID } = useParams();

    useEffect(() => {
        const isDeckID = deckID ? true : false;
        setEditMode(isDeckID);

        if (editMode) {
            setLoading(true);
            // dispatch(fetchCardList(deckID, setLoading)) 
        }
    }, [deckID, editMode])

    //setDeckTitle()

    const addNewCard = () => {
        const newCard = {
            id: cardList.length + 1,
            term: '',
            definition: '',
            isUpdated: false,
            isPublic: false
        }
        dispatch(addCard(newCard));
    }

    const handleOnSubmit = (event) => {
        event.preventDefault();
        return axios.post(`http://localhost:8080/api/decks/`, { deckTitle, cardList, user })
            .then(result => console.log(result))
            .catch(error => console.log(error));
    }

    return (
        <div className='view-deck-page'>
            {editMode
                ? <h1 className='title-header'>Edit Deck</h1>
                : <h1 className='title-header'>Create a new deck</h1>
            }
            <span>Title</span>
            <div className='deck-title'>
                <input
                    type='text'
                    className='title-input-text'
                    placeholder='Enter a title'
                    value={deckTitle}
                    onChange={event => setDeckTitle(event.target.value)}
                >
                </input>
            </div>
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
                <CustomButton className='submit-deck-button' onClick={handleOnSubmit}>
                    {editMode ? 'Save Deck' : 'Submit Deck'}
                </CustomButton>
            </div>
        </div>
    );
};

export default ViewDeckPage;

    //Make sure we can fetch list of decks
    //Make sure we can delete individual deck - AXIOS DELETE

