import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from 'react-router';
import { useAuth0 } from "@auth0/auth0-react";

const DeckPreviewPage = () => {

    const [deck, setDeck] = useState([]);
    const [userId, setUserId] = useState();
    const [deckId, setDeckId] = useState();
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


    useEffect(() => {
        //useEffect => get all cards for current I'th Deck via Axios => Store in useState Hook
        // setDeck(res)
    }, [])

    console.log("user_id:", userId);
    console.log("deck_id:", deckId);

    return (
        <p>Deck Preview</p>
        //curDeckCard => onClick flip to answer
        //Carousell arrows
        //=> Iterate over useState Hook and display list of cards
    );
}

export default DeckPreviewPage;

