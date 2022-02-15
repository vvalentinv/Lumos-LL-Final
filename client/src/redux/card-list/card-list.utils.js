
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


