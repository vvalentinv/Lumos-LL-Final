import { useNavigate } from 'react-router-dom';

import './home-page-card.styles.scss';

const HomePageCard = ({ deckName, deckID }) => {
    const navigate = useNavigate();

    return (
        <div className='deck-name-container' onClick={() => navigate(`/deckpreview/${deckID}`)}>
            <span >
                {deckName}
            </span>
        </div>
    )
};

export default HomePageCard;