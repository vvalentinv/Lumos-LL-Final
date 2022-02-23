import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

import "./deck-preview.page-styles.scss";
import ArrowBack from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import Box from '@mui/material/Box';

import { getDeckBydeckID, getCardsByDeckForUser } from "../../helpers/selectors";
import { useSelector } from "react-redux";

import PreviewCard from "../../components/preview-card/preview-card.component";
import CustomButton from "../../components/custom-button/custom-button.component";

const DeckPreviewPage = () => {

  const [loading, setLoading] = useState(true);
  const [deckTitle, setDeckTitle] = useState();
  const [cardList, setCardList] = useState([]);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const navigate = useNavigate();
  const { deckID } = useParams();
  const selUser = useSelector(state => state.user);
  const { userUUID } = selUser;

  // useEffect(() => {
  //   if (deck && cardList.length > 0) {
  //     setLoading(false);
  //   }
  // }, [deck, cardList]);
  

  useEffect(() => {
    if (!userUUID) {
      return;
    }
    getDeckBydeckID(userUUID, deckID)
      .then(result => {
        let deckTitle = result.data.deck_name
        setDeckTitle(deckTitle);
      })
      .catch(error => console.log(error));

    getCardsByDeckForUser(userUUID, deckID)
      .then(result => {
        console.log("resolved promise:", result.data)
        setCardList(result.data);
      })
      .catch(error => console.log(error));
  }, [userUUID, deckID])

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

  let curCard = cardList[activeCardIndex] || {};
  const deckLength = cardList.length;

  const [side, setSide] = useState(true);
  const [flip, setFlip] = useState();

  function handleClick() {
    amendShowAnswerFlag(activeCardIndex);
    setSide(!side);
    setFlip(side);
  }

  console.log('deckT', deckTitle);

  let fontSize;
  const baseFontSize = 15;

  if (curCard.term && curCard.showAnswer && curCard.term.length >= 20) {
    fontSize = 6;
  } else if ((curCard.term && curCard.showAnswer && curCard.term.length >= 10)) {
    fontSize = 11;
  } else if (curCard.definition && !curCard.showAnswer && curCard.definition.length >= 20) {
    fontSize = 6;
  } else if (curCard.definition && !curCard.showAnswer && curCard.definition.length >= 10) {
    fontSize = 11;
  } else {
    fontSize = baseFontSize;
  }

  const stringFontSize = fontSize;

  return (
    <div className='dp-main-div'>
      <div className='deck-preview'>
        <h2>{deckTitle}</h2>
      </div>
      <div className='main-div'>
        <div className={`primary-card-container ${side ? 'side' : ''}`} onClick={() => handleClick()} >
          <span className={!flip ? 'card-flip' : 'test'} style={{ fontSize: `${stringFontSize}vmin` }}>
            <div className='flash-card-text' style={{ fontSize: `${stringFontSize}vmin` }}>
              {curCard.showAnswer
                ? curCard.definition
                : curCard.term
              }
            </div>
          </span>
        </div>
        <div className='primary-card-nav'>
          <span className="left-arrow">
            <ArrowBack className='left-arrow-icon' sx={{ fontSize: 45 }} onClick={() => leftArrowSubmit()}></ArrowBack>
          </span>
          <span className='deck-length'>
            {`${activeCardIndex + 1}/${deckLength}`}
          </span>
          <span className="right-arrow" onClick={() => rightArrowSubmit()}>
            <ArrowForwardIcon className='right-arrow-icon' sx={{ fontSize: 45 }} onClick={() => rightArrowSubmit()}></ArrowForwardIcon>
          </span>
        </div>
      </div>
      <div className='q-in-set-div'>
        <h2 className="q-in-set">{`Questions in this set (${cardList.length})`}</h2>
      </div>
      <div className="questions-answers">
        <div className='preview-card-container'>
          {cardList.length && cardList.map((card) => {
            const { term, definition } = card;
            return (
              <PreviewCard
                className="preview-card"
                key={uuidv4()}
                term={definition}
                definition={term}
              />
            )
          })}
        </div>
      </div>
      <div style={{ width: '100%' }}>
      </div>
      <div className="button">
        <Box textAlign='center'>
          <CustomButton onClick={() => navigate(`/editdeck/${deckID}`)}>
            Add or Remove Questions
          </CustomButton>
        </Box>
      </div>
    </div>





  );
}

export default DeckPreviewPage;
