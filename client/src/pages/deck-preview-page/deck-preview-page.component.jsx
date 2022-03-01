import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

import { getDeckBydeckID, getCardsByDeckForUser, isUserDeckAuthor } from "../../helpers/selectors";
import { useSelector } from "react-redux";

import PreviewCard from "../../components/preview-card/preview-card.component";
import CustomButton from "../../components/custom-button/custom-button.component";
import ArrowBack from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import "./deck-preview.page-styles.scss";

import * as ReactBootStrap from 'react-bootstrap';

const DeckPreviewPage = () => {

  const [isLoading, setLoading] = useState(false);
  const [isAuthor, setIsAuthor] = useState(false);
  const [deckTitle, setDeckTitle] = useState();
  const [cardList, setCardList] = useState([]);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const navigate = useNavigate();
  const { deckID } = useParams();
  const selUser = useSelector(state => state.user);
  const { userUUID } = selUser;


  useEffect(() => {
    if (!userUUID) {
      return;
    }
    setLoading(true);
    const isUserDeckAuthorPromise = isUserDeckAuthor(deckID, userUUID);
    const getDeckBydeckIDPromise = getDeckBydeckID(userUUID, deckID);
    const getCardsByDeckForUserPromise = getCardsByDeckForUser(userUUID, deckID);

    Promise.all([isUserDeckAuthorPromise, getDeckBydeckIDPromise, getCardsByDeckForUserPromise]).then((values) => {
      const promiseAll = values;
      setIsAuthor(promiseAll[0].data);
      setDeckTitle(promiseAll[1].data.deck_name);
      if (!promiseAll[0].data) {
        let filteredCards = promiseAll[2].data.filter(card => card.isPublic === true);
        setCardList(filteredCards);
        setLoading(false);
      }
      else {
        setCardList(promiseAll[2].data);
        setLoading(false);
      }
    });
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

  let fontSize = 8;
  const stringFontSize = fontSize;

  return (
    <div className='dp-main-div' >
      <div className='deck-preview' >
        <h1 className='d-preview'>Deck Preview</h1>
        <h1 className='d-title'>{deckTitle}</h1>
      </div>
      {isLoading && <ReactBootStrap.Spinner animation="border" />}
      <div className='main-div'>
        <div className={`primary-card-container  ${side ? 'side' : 'default'}`} onClick={() => handleClick()}>
          <div className={!flip ? 'card-flip' : ''} style={{ fontSize: `${stringFontSize}vmin` }}>
            <span className='flash-card-text' style={{ fontSize: `${stringFontSize}vmin` }}>
              {curCard.showAnswer
                ? curCard.definition
                : curCard.term
              }
            </span>
          </div>
        </div >
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
      <div className="button-a">
        {isAuthor ?
          <CustomButton onClick={() => navigate(`/editdeck/${deckID}`)}>
            Add or Remove Questions
          </CustomButton>
          : ''}
      </div>
    </div>
  );
}

export default DeckPreviewPage;