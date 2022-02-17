import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

import axios from "axios";
import { useParams } from 'react-router';
import { useAuth0 } from "@auth0/auth0-react";

import PreviewCard from "../../components/preview-card/preview-card.component";
import CustomButton from "../../components/custom-button/custom-button.component";

import { ReactComponent as LeftArrowLogo } from '../../assets/left-arrow.svg';
import { ReactComponent as RightArrowLogo } from '../../assets/right-arrow.svg';

const DeckPreviewPage = () => {


    const [deck, setDeck] = useState([]);
    const [userId, setUserId] = useState();
    const [deckId, setDeckId] = useState();
    const [cardList, setCardList] = useState([]);
    const { user } = useAuth0();
    const params = useParams();

    // user_id
    useEffect(() => {
        if(!user){
          return;
        }
        axios.post(`http://localhost:8080/api/users/`, { user })
        .then(result => {
            setUserId(result.data);
        })
        .catch(error => console.log(error));
    }, [user]);

    // deck_id
    useEffect(() => {
      setDeckId(params.deckID);
    }, [])

    // 
    useEffect(() => {
        if(!userId && !deckId){
            return;
          }
          axios.post(`http://localhost:8080/api/decks/${deckId}`, { userId, deckId })
          .then(result => {
              setDeck(result.data);
          })
          .catch(error => console.log(error));
    }, [userId, deckId])

    useEffect(() => {
        if(!userId && !deckId){
            return;
          }
          axios.post(`http://localhost:8080/api/cards/${deckId}`, { userId, deckId })
          .then(result => {
              setCardList(result.data);
          })
          .catch(error => console.log(error));
    }, [userId, deckId])

    console.log("user_id:", userId);
    console.log("deck_id:", deckId);
    console.log("deck:", deck);
    console.log("cardList:", cardList);

    // const navigate = useNavigate();
    const { deckID } = useParams();

    const amendShowAnswerFlag = (cardIndex, shouldBeHidden = false) => {
        const curCard = cardList[cardIndex];

        if (shouldBeHidden) curCard.showAnswer = false; //User clicks right click
        else curCard.showAnswer = !curCard.showAnswer; //User clicks on current flash card

        setCardList((prev) => {
            prev[cardIndex] = curCard;
            return [...prev];
        })
    }

    const leftArrowSubmit = () => {
        if (activeCardIndex < 1) return;
        amendShowAnswerFlag(activeCardIndex, true);
        setActiveCardIndex(activeCardIndex - 1);
    }

    const rightArrowSubmit = () => {
        if (activeCardIndex > cardList.length - 2) return;
        amendShowAnswerFlag(activeCardIndex, true);
        setActiveCardIndex(activeCardIndex + 1);
    }

    const [cardList, setCardList] = useState([
        { term: 'First Question', definition: 'Monday', showAnswer: false },
        { term: 'Second Question', definition: 'Tuesday', showAnswer: false },
        { term: 'Third Question', definition: 'Wednesday', showAnswer: false },
        { term: 'Fourth Question', definition: 'Thursday', showAnswer: false },
        { term: 'Fifth Question', definition: 'Friday', showAnswer: false }
    ]);

    const [activeCardIndex, setActiveCardIndex] = useState(0);

    let curCard = cardList[activeCardIndex];
    const deckLength = cardList.length;


    return (
        <>
            <h2>Deck Preview</h2>
            <div className='primary-card-container' onClick={() => amendShowAnswerFlag(activeCardIndex)}>
                {!curCard.showAnswer
                    ? curCard.term
                    : curCard.definition
                }
            </div>
            <div className='primary-card-nav'>
                <span className='left-arrow-icon' onClick={() => leftArrowSubmit()} >
                    <LeftArrowLogo />
                </span>
                <span >
                    {`${activeCardIndex + 1}/${deckLength}`}
                </span>
                <span className='right-arrow-icon' onClick={() => rightArrowSubmit()}>
                    <RightArrowLogo />
                </span>
            </div>
            <h2>{`Questions in this set (${cardList.length})`}</h2>
            <div className='preview-card-container'>
                {cardList.map((card) => {
                    const { term, definition } = card;
                    return (
                        <PreviewCard
                            key={uuidv4()}
                            term={term}
                            definition={definition}
                        />
                    )
                })}
            </div>
            <Link to={`/editdeck/${deckID}`}>
                <CustomButton>
                    Add or Remove Questions
                </CustomButton>
            </Link>
        </>
    );
}

export default DeckPreviewPage;



    // useEffect(() => {
    //     res = await axios.get(deckID ENDPOINT)
    //     res.map(Add showAnswer: false)
    //     setDeck(res)
    // }, [])