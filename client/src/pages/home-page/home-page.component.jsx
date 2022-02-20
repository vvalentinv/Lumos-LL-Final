import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import HomePageCard from "../../components/home-page-card/home-page-card";
import { getDeckListForUser } from "../../helpers/selectors";

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

  console.log('HOOK', deckList);

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
            />
          )
        })}

      </div>
    </>
  );
}

export default HomePage;
