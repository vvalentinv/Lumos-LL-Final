import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCardList, addCard } from "../../redux/card-list/card-list.actions";
import { getDeckListForUser } from '../../helpers/selectors';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

import CustomButton from "../../components/custom-button/custom-button.component";
import Card from "../../components/card/card.component";
import AddCardRow from '../../components/add-card-row/add-card-row.component';

import './view-deck-page.styles.scss';

const ViewDeckPage = () => {

    const [deckTitle, setDeckTitle] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [existingDeckTitles, setExistingDeckTitles] = useState([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const selCardList = useSelector(state => state.cardList);
    const { cardList } = selCardList;
    // const length = cardList.length;

    const selUser = useSelector(state => state.user);
    const { userUUID } = selUser;

    const { user } = useAuth0();
    const { deckID } = useParams();

    useEffect(() => {
        const isDeckID = deckID ? true : false;
        setEditMode(isDeckID);

        if (editMode) {
            setLoading(true);
            // dispatch(fetchCardList(userUUID, deckID, setLoading)) 
            // setDeckTitle()
        }
    }, [deckID, editMode])

    useEffect(() => {
      // getDeckListForUser(userUUID)
      //   .then(result => setExistingDeckTitles(
      //     result.map(d => d.deck_name)))
      //    .catch(error => console.log(error));
    },[existingDeckTitles,userUUID])

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
        if(!deckID){// && existingDeckTitles.includes(deckTitle)){
          return axios.post(`http://localhost:8080/api/decks/`, { deckTitle, cardList, user })
          .then(result => console.log(result))
          .catch(error => console.log(error));
        }else if(deckID) {
          return axios.put(`http://localhost:8080/api/decks/`, { deckID, deckTitle, cardList, userUUID })
            .then(result => console.log(result))
            .catch(error => console.log(error));
        }

        // if (!deckTitle) return
        
    }
console.log("deckid",deckID);
    const length = cardList.length || 0;

    return (
        <div className='view-deck-page'>
            <div className='back-link'>
                <span className='back-link-text' onClick={() => navigate(-1)}>Back to set</span>
            </div>
            {editMode
                ? ''
                : <h1 className='title-header'>Create a new deck</h1>
            }
            <span>Title</span>
            <div className='deck-title'>
                <input
                    type='text'
                    className='title-input-text'
                    placeholder='Enter a title, like "Notable Battles of World War II"'
                    value={deckTitle}
                    onChange={event => setDeckTitle(event.target.value)}
                    required
                >
                </input>
            </div>
            <div className='card-container'>
                {cardList.map((card) => {
                    const { id, term, definition } = card;
                    return (
                        <Card
                            length={length}
                            key={id}
                            id={id}
                            term={term}
                            definition={definition}
                        />
                    )
                })}
                <AddCardRow onClick={() => addNewCard()} />
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
