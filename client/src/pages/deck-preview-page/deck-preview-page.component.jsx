import { useEffect, useState } from "react";
import axios from "axios";

const DeckPreviewPage = () => {

    const [deck, setDeck] = useState([]);

    useEffect(() => {
        //useEffect => get all cards for current I'th Deck via Axios => Store in useState Hook
        // setDeck(res)
    }, [])


    return (
        <p>Deck Preview</p>
        //curDeckCard => onClick flip to answer
        //Carousell arrows
        //=> Iterate over useState Hook and display list of cards
    );
}

export default DeckPreviewPage;

