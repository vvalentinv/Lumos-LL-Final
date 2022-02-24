import './search-bar-item.styles.scss';

import { useNavigate } from 'react-router-dom';

const SearchBarItem = ({ deckID, deckTitle, setPublicDecks }) => {

    const navigate = useNavigate();

    return (
        <div className='search-bar-item' onClick={() => {
            setPublicDecks('')
            navigate(`/deckpreview/${deckID}`)
        }}>
            {deckTitle}
        </div>
    );
}

export default SearchBarItem;