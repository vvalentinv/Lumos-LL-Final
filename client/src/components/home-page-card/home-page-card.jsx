import { useNavigate } from 'react-router-dom';

const HomePageCard = ({ deckName, deckID }) => {
    const navigate = useNavigate();

    return (
        <div className='deck-name-container'>
            <span onClick={() => navigate(`/deckpreview/${deckID}`)}>
                {deckName}
            </span>
        </div>
    )
};

export default HomePageCard;