import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from 'react-router';
import { useAuth0 } from "@auth0/auth0-react";

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

    return (
        <p>Deck Preview</p>
        //curDeckCard => onClick flip to answer
        //Carousell arrows
        //=> Iterate over useState Hook and display list of cards
    );
}

export default DeckPreviewPage;

