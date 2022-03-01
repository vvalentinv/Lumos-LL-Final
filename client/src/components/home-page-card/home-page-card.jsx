import { useNavigate } from 'react-router-dom';

import DeleteIcon from '@mui/icons-material/Delete';

import './home-page-card.styles.scss';

const HomePageCard = ({ deckID, deckName, summonPopUp }) => {

    const navigate = useNavigate();

    return (
        <div className='deck-name-container'>
            <div className='deck-click-container' onClick={() => navigate(`/deckpreview/${deckID}`)} >
                <div className='deck-name'>
                    {deckName}
                </div>
            </div>
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
