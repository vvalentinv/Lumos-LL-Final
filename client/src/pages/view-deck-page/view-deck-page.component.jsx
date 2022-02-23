import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCardList, addCard, refreshCardList } from "../../redux/card-list/card-list.actions";
import { getDeckListForUser, getDeckBydeckID } from '../../helpers/selectors';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import { v4 as uuidv4 } from 'uuid';

import axios from "axios";

import * as ReactBootStrap from 'react-bootstrap';

import CustomButton from "../../components/custom-button/custom-button.component";
import Card from "../../components/card/card.component";
import AddCardRow from '../../components/add-card-row/add-card-row.component';

import './view-deck-page.styles.scss';

const ViewDeckPage = () => {

    const freshList = [
        { id: uuidv4(), term: '', definition: '', isUpdated: false, isPublic: false },
        { id: uuidv4(), term: '', definition: '', isUpdated: false, isPublic: false }
    ]

    const [isLoading, setLoading] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [deckTitle, setDeckTitle] = useState('');
    const [existingDeckTitles, setExistingDeckTitles] = useState([]);
    const [deckTitleError, setDeckTitleError] = useState(false);

    const [submitted, isSubmitted] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const selCardList = useSelector(state => state.cardList);
    const { cardList } = selCardList;
    const deckLength = cardList.length;

    console.log('CREATE DECK', cardList);

    const selUser = useSelector(state => state.user);
    const { userUUID } = selUser;

    const { user } = useAuth0();
    const { deckID } = useParams();

    useEffect(() => {
        const isDeckID = deckID ? true : false;
        setEditMode(isDeckID);

        if (deckID && userUUID) {
            setLoading(true);
            dispatch(fetchCardList(userUUID, deckID, setLoading));
            getDeckBydeckID(userUUID, deckID)
                .then((result) => setDeckTitle(result.data.deck_name))
                .catch(error => console.log(error.message))
        }
    }, [deckID, userUUID]);

    useEffect(() => {
        if (!userUUID) {
            return;
        }
        getDeckListForUser(userUUID)
            .then(result => {
                setExistingDeckTitles(result.data.map(d => d.deck_name));
            })
            .catch(error => console.log(error));
    }, [userUUID]);

    const validate = (str) => { //Refactor, cannot update current deck right now
        // console.log('VALIDATE', str, existingDeckTitles);
        if (existingDeckTitles.every(title => title !== str)) {
            return false;
        }
        return true;
    }

    const addNewCard = () => {
        const newCard = {
            id: uuidv4(),
            term: '',
            definition: '',
            isUpdated: false,
            isPublic: false
        }
        dispatch(addCard(newCard));
    }

    const handleOnSubmit = (event) => {
        event.preventDefault();
        const validationResult = validate(deckTitle);

        // if (validationResult) { FIX LATER
        //     setDeckTitleError(true);
        //     return;
        // }

        if (!isLoading) {
            if (!deckID) { //Create New Deck
                return axios.post(`http://localhost:8080/api/decks/`, { deckTitle, cardList, user })
                    .then(resolved => {
                        dispatch(refreshCardList(freshList));
                        isSubmitted(true);
                        navigate(`/deckpreview/${resolved.data.deckID}`);
                    })
                    .catch(error => console.log(error));
            } else { //Update existing deck
                return axios.put(`http://localhost:8080/api/decks/`, { deckID, deckTitle, cardList, userUUID })
                    .then(resolved => {
                        dispatch(refreshCardList(freshList));
                        navigate(`/deckpreview/${deckID}`)
                    })
                    .catch(error => console.log(error));
            }
        };
    }

    return (
        <div className='view-deck-page-container'>
            <div className='view-deck-page'>
                <div className='deck-title-div'>
                    {editMode
                        ? <div className='back-link'>
                            <span className='back-link-text' onClick={() => navigate(`/deckpreview/${deckID}`)}>Back to set</span>
                        </div>
                        : <h1 className='title-header'>Create a new deck</h1>
                    }
                    <div className='title-a'>Title</div>
                    {deckTitleError && <p className='deck-title-error-message'>
                        Whoops! This title is already in use. Try picking a different title.
                    </p>}

                    <span className='deck-title-span'>
                        <input
                            type='text'
                            className='title-input-text'
                            placeholder='Enter a title, like "Notable Battles of World War II"'
                            value={deckTitle}
                            onChange={(event) => setDeckTitle(event.target.value)}
                            required
                        >
                        </input>
                    </span>
                </div>
                <div className='card-container'>
                    {isLoading && <ReactBootStrap.Spinner animation="border" />}
                    {!isLoading && cardList.map((card, index) => {
                        const { cid, id, term, definition, isPublic } = card;
                        return (
                            <Card
                                userUUID={userUUID}
                                length={deckLength}
                                key={id}
                                id={id}
                                cid={cid}
                                term={term}
                                definition={definition}
                                number={index + 1}
                                isSubmitted={isSubmitted}
                                submitted={submitted}
                                isPublic={isPublic}
                            />
                        )
                    })}
                    <AddCardRow addCardHandler={() => addNewCard()} />
                </div>

                <div className='submit-deck-button-container'>
                    <CustomButton className='submit-deck-button' onClick={handleOnSubmit}>
                        {editMode ? 'Save Deck' : 'Submit New Deck'}
                    </CustomButton>
                </div>
            </div>
        </div>
    );
};

export default ViewDeckPage;
