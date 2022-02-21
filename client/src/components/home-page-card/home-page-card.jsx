import { useNavigate } from 'react-router-dom';

import './home-page-card.styles.scss';
import DeleteIcon from '@mui/icons-material/Delete';

import { deleteDeck } from "../../helpers/selectors";

const HomePageCard = ({ deckID, deckName, summonPopUp }) => {

    const navigate = useNavigate();

    // const deleteDeckFromDeckList = (deckID) => {
    //     let updatedDeckList = deckList.filter((deck) => deck.id !== deckID);
    //     setDeckList(updatedDeckList);
    //     deleteDeck(deckID)
    //         .then((result) => console.log("Deck Deleted:", result))
    //         .catch((error) => console.log(error))
    // }

    return (
        <div className='deck-name-container' >
            <span onClick={() => navigate(`/deckpreview/${deckID}`)}>
                {deckName}
            </span>
            <div className='delete-logo-container'>
                <DeleteIcon
                    className='delete-logo'
                    onClick={() => summonPopUp(deckID)}
                />
            </div>
        </div>
    )
};

export default HomePageCard;
