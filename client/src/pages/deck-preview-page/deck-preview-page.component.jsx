import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { getDeckBydeckID, getCardsByDeckForUser } from "../../helpers/selectors";
import { useSelector } from "react-redux";

import PreviewCard from "../../components/preview-card/preview-card.component";
import CustomButton from "../../components/custom-button/custom-button.component";

import { ReactComponent as LeftArrowLogo } from '../../assets/left-arrow.svg';
import { ReactComponent as RightArrowLogo } from '../../assets/right-arrow.svg';

const DeckPreviewPage = () => {

  const [loading, setLoading] = useState(true);
  const [deck, setDeck] = useState();
  const [cardList, setCardList] = useState([]);
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
    if(!userUUID){
      return;
    }
    getDeckBydeckID(userUUID,deckID) 
      .then(result => {
        // console.log("RESULT:", result.data);
        setDeck(result.data);
      })
      .catch(error => console.log(error));
    // cards list
    getCardsByDeckForUser(userUUID, deckID) 
    .then(result => {
        console.log("resolved promise:",result.data)
        setCardList(result.data);
      })
      .catch(error => console.log(error));
  }, [userUUID, deckID])

  console.log("cardList:" ,cardList);
  console.log("Deck:", deck);

  const amendShowAnswerFlag = (cardIndex, shouldBeHidden = false) => {
    if (!loading) {
      const curCard = cardList[cardIndex];

      if (shouldBeHidden) curCard.showAnswer = false; //User clicks right click
      else curCard.showAnswer = !curCard.showAnswer; //User clicks on current flash card

      setCardList((prev) => {
        prev[cardIndex] = curCard;
        return [...prev];
      })
    }


  }

  const leftArrowSubmit = () => {
    if (!loading) {
      if (activeCardIndex < 1) return;
      amendShowAnswerFlag(activeCardIndex, true);
      setActiveCardIndex(activeCardIndex - 1);
    }
  }

  const rightArrowSubmit = () => {
    if (!loading) {
      if (activeCardIndex > cardList.length - 2) return;
      amendShowAnswerFlag(activeCardIndex, true);
      setActiveCardIndex(activeCardIndex + 1);
    }
  }

  const [activeCardIndex, setActiveCardIndex] = useState(0);

  let curCard = cardList[activeCardIndex] || {};
  const deckLength = cardList.length;

  return (
    <>
      <h2>Deck Preview</h2>
      <div className='primary-card-container' onClick={() => amendShowAnswerFlag(activeCardIndex)}>
        {!loading && !curCard.showAnswer
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
        {cardList.length && cardList.map((card) => {
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
