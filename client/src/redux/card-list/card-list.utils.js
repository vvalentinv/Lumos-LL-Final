
export const updateCardInCardList = (cardList, payload) => {
    let newCardList = cardList.map((card) => {
        let editCard = { ...card }
        if (card.id === payload.id) {
            editCard[payload.field] = payload.value
            editCard.isUpdated = true
        }
        return editCard;
    })
    return newCardList;
};

export const updateCardIsPublic = (cardList, payload) => {
    let newCardList = cardList.map((card) => {
        let editCard = { ...card }
        if (card.id === payload) {
            let prevState = editCard.isPublic
            editCard.isPublic = !prevState
        }
        return editCard;
    })
    return newCardList;
};


