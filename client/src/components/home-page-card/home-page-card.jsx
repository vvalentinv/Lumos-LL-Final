import { useNavigate } from 'react-router-dom';

import './home-page-card.styles.scss';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

import { deleteDeck } from "../../helpers/selectors";


const HomePageCard = ({ deckName, deckID, deckList, setDeckList }) => {

    const navigate = useNavigate();

    const deleteDeckFromDeckList = (deckID) => {
        let updatedDeckList = deckList.filter((deck) => deck.id !== deckID);
        setDeckList(updatedDeckList);
        //AXIOS DELETE DECK HELPER FUNCTION
    }

    return (
        <div className='deck-name-container'>
            <span onClick={() => navigate(`/deckpreview/${deckID}`)}>
                {deckName}
            </span>
            <div className='delete-logo-container'>
                <DeleteIcon
                    className='delete-logo'
                    onClick={() => deleteDeckFromDeckList(deckID)}
                />
            </div>
        </div>
    )
};

export default HomePageCard;