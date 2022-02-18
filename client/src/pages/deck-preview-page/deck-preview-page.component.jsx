import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

import { useSelector } from "react-redux";

import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

import PreviewCard from "../../components/preview-card/preview-card.component";
import CustomButton from "../../components/custom-button/custom-button.component";

import { ReactComponent as LeftArrowLogo } from '../../assets/left-arrow.svg';
import { ReactComponent as RightArrowLogo } from '../../assets/right-arrow.svg';

const DeckPreviewPage = () => {

  const selUser = useSelector(state => state.user);
  const { userUUID } = selUser;

  console.log('UUID', userUUID);

  const [loading, setLoading] = useState(true);
  const [deck, setDeck] = useState();
  const [cardList, setCardList] = useState([]);
  const { user } = useAuth0();
  const { deckID } = useParams();

  useEffect(() => {
    if (deck && cardList.length > 0) {
      setLoading(false);
    }
  }, [deck, cardList]);

  //get deck obj
  useEffect(() => {
    if (!userUUID && !deckID) {
      return;
    }
    console.log("DeckID:",deckID);
    axios.post(`http://localhost:8080/api/decks/${deckID}`, { userUUID, deckID })
      .then(result => {
        console.log("RESULT:", result.data);
        setDeck(result.data);
      })
      .catch(error => console.log(error));
  }, [userUUID, deckID])

  //cardlist
  useEffect(() => {
    if (!userUUID && !deckID) {
      return;
    }
    axios.post(`http://localhost:8080/api/cards/${deckID}`, { userUUID, deckID })
      .then(result => {

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

  // const [cardList, setCardList] = useState([
  //     { term: 'First Question', definition: 'Monday', showAnswer: false },
  //     { term: 'Second Question', definition: 'Tuesday', showAnswer: false },
  //     { term: 'Third Question', definition: 'Wednesday', showAnswer: false },
  //     { term: 'Fourth Question', definition: 'Thursday', showAnswer: false },
  //     { term: 'Fifth Question', definition: 'Friday', showAnswer: false }
  // ]);

  // const [cardList, setCardList] = useState([
  //   { term: 'Monday', definition: 'Placeholder 1', showAnwser: false },
  //   { term: 'Tuesday', definition: 'Placeholder 2', showAnwser: false },
  //   { term: 'kjkj', definition: 'kjkj', showAnwser: false }
  // ]);

  const [activeCardIndex, setActiveCardIndex] = useState(0);

  let curCard = cardList[activeCardIndex] || {};
  const deckLength = cardList.length;

  return (
    <>
      <div className='main-div'>
        <h2 className='deck'>Deck Preview</h2>
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



    // useEffect(() => {
    //     res = await axios.get(deckID ENDPOINT)
    //     res.map(Add showAnswer: false)
    //     setDeck(res)
    // }, [])
