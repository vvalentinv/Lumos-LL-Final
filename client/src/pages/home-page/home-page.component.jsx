import { useEffect, useState, useContext } from "react";
import { useSelector } from "react-redux";
import HomePageCard from "../../components/home-page-card/home-page-card";
import { getDeckListForUser } from "../../helpers/selectors";
import PublicCardsContext from "../../context/public-cards/public-cards.context";


const HomePage = () => {

  const [deckList, setDeckList] = useState([]);
  const selUser = useSelector(state => state.user);
  const { userUUID } = selUser;


  useEffect(() => {
    if (!userUUID) {
      return;
    }
    getDeckListForUser(userUUID)
      .then(result => {
        setDeckList(result.data);
      })
      .catch(error => console.log(error));
  }, [userUUID]);

  return (
    <>
      <p>YOUR DECKS</p>
      <div className='deck-container'>
        {deckList.length && deckList.map((deck) => {
          const { id, deck_name } = deck
          return (
            <HomePageCard
              key={id}
              deckID={id}
              deckName={deck_name}
              deckList={deckList}
              setDeckList={setDeckList}
            />
          )
        })}

      </div>
    </>
  );
}

export default HomePage;
