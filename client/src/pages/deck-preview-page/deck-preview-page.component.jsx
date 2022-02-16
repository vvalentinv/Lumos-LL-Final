import { useEffect, useState } from "react";
import axios from "axios";

import { ReactComponent as LeftArrowLogo } from '../../assets/left-arrow.svg';
import { ReactComponent as RightArrowLogo } from '../../assets/right-arrow.svg';

const DeckPreviewPage = () => {

    const amendShowAnswerFlag = (cardIndex) => {

        const curCard = cardList[cardIndex]
        curCard.showAnswer = true;
        setCardList((prev) => {
            return [...prev, curCard]
            console.log(cardList);
        })
    }

    // let newCardList = cardList.map((card) => {
    //     let editCard = { ...card }
    //     if (card.id === payload.id) {
    //         editCard[payload.field] = payload.value
    //         editCard.isUpdated = true
    //     }
    //     return editCard;
    // })
    // return newCardList;

    const leftArrowSubmit = () => {
        if (activeCardIndex < 1) return;
        setActiveCardIndex(activeCardIndex - 1);

    }

    const rightArrowSubmit = () => {
        if (activeCardIndex > cardList.length - 2) return;
        setActiveCardIndex(activeCardIndex + 1);
        //FLIP Previous Card Boolean Flag to False

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
        </>

        //=> Iterate over useState Hook and display list of cards
    );
}

export default DeckPreviewPage;



    // useEffect(() => {
        //res = await axios.get(deckID ENDPOINT)
        // setDeck(res)
    // }, [])