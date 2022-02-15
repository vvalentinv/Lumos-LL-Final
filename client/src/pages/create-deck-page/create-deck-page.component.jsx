import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCardList, addCard } from "../../redux/card-list/card-list.actions";

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
    const { deckID } = useParams(); //Derived from DB

    useEffect(() => {
        const isDeckID = deckID ? true : false;
        setEditMode(isDeckID);

        if (editMode) {
            setLoading(true);
            // dispatch(fetchCardList(deckid, setLoading))
        }
    }, [deckID, editMode])


    const addNewCard = () => {
        const newCard = {
            id: cardList.length + 1,
            term: '',
            definition: '',
            isUpdated: false
        }
        dispatch(addCard(newCard));
    }

    const fakeDeck = {
        userid: 'aa',
        name: 'fake',
        description: 'deck',
        categoryid: 1
    }

    //Make sure submit deck button works
    //Make sure we can fetch list of decks
    //Make sure we can delete individual deck - AXIOS DELETE

    const handleOnSubmit = (event) => {
        event.preventDefault();
        return axios.post(`http://localhost:8080/api/decks/`, { cardList, user })
            .then(result => console.log(result));
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
            <div className='submit-deck-button-container'>
                <CustomButton className='submit-deck-button' onClick={handleOnSubmit}>
                    Submit Deck
                </CustomButton>
            </div>

        </div>
    );
};

export default ViewDeckPage;


