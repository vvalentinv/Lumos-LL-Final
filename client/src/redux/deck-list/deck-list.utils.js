
export const updateDeckInDeckList = (deckList, payload) => {
    let newDeckList = deckList.map((deck) => {
        let editDeck = { ...deck }
        if (deck.id === payload.id) {
            editDeck[payload.field] = payload.value
            editDeck.isUpdated = true
        }
        return editDeck;
    })
    return newDeckList;
};


