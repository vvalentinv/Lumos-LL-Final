import { useEffect, useState } from "react";
import axios from "axios";

const DeckPreviewPage = () => {

    const [deck, setDeck] = useState([]);

    useEffect(() => {
        //useEffect => get all cards for current Deck ID via Axios => Store in useState Hook
        // setDeck(res)
    }, [])


    return (
        <p>Deck Preview</p>
        //=> Iterate over useState Hook and display list of decks
    );
}

export default DeckPreviewPage;

