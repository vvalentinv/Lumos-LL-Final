import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import Stack from '@mui/material/Stack';
import SnackbarContent from '@mui/material/SnackbarContent';


import "./deck-preview.page-styles.scss";
// import Icon from '@mui/material/Icon';
import ArrowBack from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import { getDeckBydeckID, getCardsByDeckForUser } from "../../helpers/selectors";
import { useSelector } from "react-redux";

import PreviewCard from "../../components/preview-card/preview-card.component";
import CustomButton from "../../components/custom-button/custom-button.component";

// import { ReactComponent as LeftArrowLogo } from '../../assets/left-arrow.svg';
// import { ReactComponent as RightArrowLogo } from '../../assets/right-arrow.svg';

const DeckPreviewPage = () => {

  const [loading, setLoading] = useState(true);
  const [deck, setDeck] = useState();
  const [cardList, setCardList] = useState([]);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const { deckID } = useParams();
  const selUser = useSelector(state => state.user);
  const { userUUID } = selUser;

  useEffect(() => {
    if (deck && cardList.length > 0) {
      setLoading(false);
    }
  }, [deck, cardList]);


  useEffect(() => {
    //get deck obj
    if (!userUUID) {
      return;
    }
    getDeckBydeckID(userUUID, deckID)
      .then(result => {
        // console.log("RESULT:", result.data);
        setDeck(result.data);
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

  const [side, setSide] = useState();

  function handleClick() {
    amendShowAnswerFlag(activeCardIndex)
    setSide(!side);
  }

  return (
    <>
      <div className='main-div'>
        <h2 className='deck-preview'>Deck Preview</h2>
        <div className='primary-card-container' onClick={() => handleClick()}>
          {curCard.showAnswer
            ? curCard.term
            : curCard.definition
          }
        </div>
        <div className='primary-card-nav'>
          <span className='left-arrow'>
            <ArrowBack className='left-arrow-icon' sx={{ fontSize: 35 }} onClick={() => leftArrowSubmit()}></ArrowBack>
          </span>
          <span className='deck-length'>
            {`${activeCardIndex + 1}/${deckLength}`}
          </span>
          <span className='right-arrow' onClick={() => rightArrowSubmit()}>
            <ArrowForwardIcon className='right-arrow-icon' sx={{ fontSize: 35 }} onClick={() => rightArrowSubmit()}></ArrowForwardIcon>
          </span>
      </div>
      <h2 className='sub-head'>{`Questions in this set (${cardList.length})`}</h2>
      <div className='questions-answers'>
        <div className='preview-card-container'>
          {cardList.length && cardList.map((card) => {
            const { term, definition } = card;
            return (
              <div>
                <PreviewCard
                  className="preview-card"
                  key={uuidv4()}
                  term={term}
                  definition={definition}
                  />
              </div>
            )
          })}
         <div>
        </div> 
        <Link to={`/editdeck/${deckID}`}>
          <CustomButton>
            Add or Remove Questions
          </CustomButton>
        </Link>
      </div>
    </div>
  </div>
  </>
  );
}

export default DeckPreviewPage;
