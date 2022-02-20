import { createContext } from 'react';

const PUBLIC_CARDS = [
    { id: 1, term: 'Thursday', definition: 4 },
    { id: 2, term: 'Friday', definition: 5 }
]

const PublicCardsContext = createContext(PUBLIC_CARDS);

export default PublicCardsContext;