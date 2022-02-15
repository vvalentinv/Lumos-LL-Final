import { useEffect, useState } from "react";
import axios from "axios";

const HomePage = () => {

    const [deckList, setDeckList] = useState([]);

    useEffect(() => {
        //useEffect => get All Decks for Current User via Axios => Store in useState Hook
        // setDeckList(res)
    }, [])

    return (
        <p>Home</p>
        //=> Iterate over useState Hook and display list of decks
    );
}

export default HomePage;



