import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCardList, addCard, refreshCardList } from "../../redux/card-list/card-list.actions";
import { getDeckListForUser, getDeckBydeckID } from '../../helpers/selectors';
import { useParams, useNavigate } from 'react-router-dom';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useAuth0 } from "@auth0/auth0-react";
import { v4 as uuidv4 } from 'uuid';

import axios from "axios";

import * as ReactBootStrap from 'react-bootstrap';

import CustomButton from "../../components/custom-button/custom-button.component";
import Card from "../../components/card/card.component";
import AddCardRow from '../../components/add-card-row/add-card-row.component';

import './view-deck-page.styles.scss';

const ViewDeckPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const freshList = [
        { id: uuidv4(), term: '', definition: '', isUpdated: false, isPublic: false },
        { id: uuidv4(), term: '', definition: '', isUpdated: false, isPublic: false }
    ]

    const selCardList = useSelector(state => state.cardList);
    const { cardList } = selCardList;
    const selUser = useSelector(state => state.user);
    const { userUUID } = selUser;

    const { user } = useAuth0();
    const { deckID } = useParams();

    const deckLength = cardList.length;

    const [isLoading, setLoading] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [deckTitle, setDeckTitle] = useState('');
    const [submitted, isSubmitted] = useState(false);

    const [thunkList, setThunkList] = useState([]);

    useEffect(() => {
        const isDeckID = deckID ? true : false;
        setEditMode(isDeckID);

        if (deckID && userUUID) {
            setLoading(true);
            dispatch(fetchCardList(userUUID, deckID, setLoading, setThunkList));
            getDeckBydeckID(userUUID, deckID)
                .then((result) => setDeckTitle(result.data.deck_name))
                .catch(error => console.log(error.message))
        }
        else dispatch(refreshCardList(freshList));
    }, [deckID, userUUID]);

    useEffect(() => {
        if (!userUUID) {
            return;
        }
        // getDeckListForUser(userUUID)
        //     .then(result => {
        //         setExistingDeckTitles(result.data.map(d => d.deck_name));
        //     })
        //     .catch(error => console.log(error));
    }, [userUUID]);

    useEffect(() => {
        setThunkList(cardList)
    }, [cardList])

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
        if (!isLoading) {
            if (!deckID) { //Create New Deck
                return axios.post(`https://lumos-backend.herokuapp.com/api/decks/`, { deckTitle, thunkList, user })
                    .then(resolved => {
                        dispatch(refreshCardList(freshList));
                        isSubmitted(true);
                        navigate(`/deckpreview/${resolved.data.deckID}`);
                    })
                    .catch(error => console.log(error));
            } else { //Update existing deck
                return axios.put(`https://lumos-backend.herokuapp.com/api/decks/`, { deckID, deckTitle, thunkList, userUUID })
                    .then(resolved => {
                        dispatch(refreshCardList(freshList));
                        navigate(`/deckpreview/${deckID}`)
                    })
                    .catch(error => console.log(error));
            }
        };
    }
    const handleOnDragEnd = (result) => {
        if (!result.destination) return;

        const draggedList = Array.from(thunkList);
        const [reorderedItem] = draggedList.splice(result.source.index, 1);
        draggedList.splice(result.destination.index, 0, reorderedItem);
        setThunkList(draggedList);
    }

    return (
        <div className='view-deck-page-container'>
            <div className='edit-card-container'>
                <div className='view-deck-header'>
                    {editMode
                        ? <div className='back-link'>
                            <span className='back-link-text' onClick={() => navigate(`/deckpreview/${deckID}`)}>Back to set</span>
                        </div>
                        : <h1 className='title-header'>Create a new deck</h1>
                    }
                    <div className='title-constant'>Title</div>
                    <span className='edit-deck-name'>
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
                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId='cards'>
                        {(provided) => (
                            <div className='card-container' {...provided.droppableProps} ref={provided.innerRef}>
                                {isLoading && <ReactBootStrap.Spinner animation="border" />}
                                {!isLoading && thunkList.map((card, index) => {
                                    const { id, term, definition, isPublic } = card;
                                    return (
                                        <Card
                                            id={id}
                                            index={index}
                                            key={id}
                                            length={deckLength}
                                            term={term}
                                            definition={definition}
                                            number={index + 1}
                                            isSubmitted={isSubmitted}
                                            submitted={submitted}
                                            isPublic={isPublic}
                                        />
                                    )
                                })}
                                {provided.placeholder}
                                <AddCardRow addCardHandler={() => addNewCard()} />
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
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